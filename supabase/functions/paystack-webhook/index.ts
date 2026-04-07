import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ---------------------------------------------------------------------------
// Environment
// PAYSTACK_SECRET_KEY  → set via: supabase secrets set PAYSTACK_SECRET_KEY=sk_live_xxx
// SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are auto-injected by Supabase
// ---------------------------------------------------------------------------
const PAYSTACK_SECRET       = Deno.env.get("PAYSTACK_SECRET_KEY") ?? "";
const SUPABASE_URL          = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_KEY  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

// ---------------------------------------------------------------------------
// HMAC-SHA512 signature verification — Web Crypto, no external deps
// ---------------------------------------------------------------------------
async function verifySignature(body: string, signature: string): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(PAYSTACK_SECRET),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"],
  );
  const buf = await crypto.subtle.sign("HMAC", key, enc.encode(body));
  const hex = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex === signature;
}

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  // ── 1. Read raw body ──────────────────────────────────────────────────────
  const rawBody = await req.text();

  // ── 2. Verify Paystack signature (Vestigh's single account secret) ────────
  if (!PAYSTACK_SECRET) {
    console.error("PAYSTACK_SECRET_KEY is not configured");
    return json({ received: true, error: "Secret not configured" });
  }

  const incomingSig = req.headers.get("x-paystack-signature") ?? "";
  const valid = await verifySignature(rawBody, incomingSig);
  if (!valid) {
    console.warn("Invalid Paystack signature — request rejected");
    return new Response("Unauthorized", { status: 401 });
  }

  // ── 3. Parse event ────────────────────────────────────────────────────────
  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ received: true, error: "Invalid JSON body" });
  }

  const eventType = (event.event as string) ?? "unknown";
  const data      = (event.data as Record<string, unknown>) ?? {};
  const metadata  = (data.metadata as Record<string, unknown>) ?? {};
  const customer  = (data.customer as Record<string, unknown>) ?? {};

  // ── 4. Identify store by the ID the store passed in metadata ─────────────
  //
  // When a store initiates a Paystack transaction it must include:
  //   metadata: { store_id: "<uuid from Vestigh admin>" }
  //
  // That UUID is the store's id column in our stores table.
  // Store owners find it in the Vestigh admin panel on their store's detail card.

  const storeId = (metadata.store_id as string) ?? null;

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  let store: Record<string, unknown> | null = null;

  if (storeId) {
    const { data: s, error } = await supabase
      .from("stores")
      .select("id, name, subdomain, webhook_url")
      .eq("id", storeId)
      .maybeSingle();

    if (error) console.error("Store lookup failed:", error.message);
    store = s;
  }

  if (!store) {
    console.warn(`Could not identify store — metadata.store_id was: ${storeId}`);
    // We still record the payment; store_id will be null
  } else {
    console.log(`Event '${eventType}' for store: ${store.name} (${store.subdomain})`);
  }

  // ── 5. Record the payment ─────────────────────────────────────────────────
  const paymentRow = {
    store_id:           store?.id ?? null,
    paystack_reference: (data.reference as string) ?? `unknown-${Date.now()}`,
    event_type:         eventType,
    amount:             (data.amount as number) ?? 0,
    currency:           (data.currency as string) ?? "GHS",
    customer_email:     (customer.email as string) ?? null,
    customer_name: (
      (customer.name as string) ||
      `${(customer.first_name as string) ?? ""} ${(customer.last_name as string) ?? ""}`.trim() ||
      null
    ),
    channel:     (data.channel as string) ?? null,
    status:      (data.status as string) ?? "unknown",
    metadata:    Object.keys(metadata).length ? metadata : null,
    raw_payload: event,
  };

  const { data: payment, error: insertErr } = await supabase
    .from("payments")
    .upsert(paymentRow, { onConflict: "paystack_reference,event_type", ignoreDuplicates: false })
    .select("id")
    .single();

  if (insertErr) {
    console.error("Failed to record payment:", insertErr.message);
    return json({ received: true, error: "DB write failed" });
  }

  console.log(`Payment recorded: ${payment.id}`);

  // ── 6. Proxy to store's own edge function ─────────────────────────────────
  const webhookUrl = store?.webhook_url as string | null;

  if (!webhookUrl) {
    return json({ received: true, proxied: false });
  }

  let proxyStatus = 0;
  let proxyResponse = "";
  const proxiedAt = new Date().toISOString();

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type":              "application/json",
        // Forward the original Paystack signature so the store's function
        // can verify it independently if it wants to
        "x-paystack-signature":      incomingSig,
        // Vestigh context headers
        "X-Vestigh-Store-Id":        (store?.id as string) ?? "",
        "X-Vestigh-Store-Subdomain": (store?.subdomain as string) ?? "",
        "X-Vestigh-Event":           eventType,
      },
      body: rawBody,
      signal: AbortSignal.timeout(12_000),
    });
    proxyStatus   = res.status;
    proxyResponse = (await res.text()).slice(0, 1000);
    console.log(`Proxied to ${webhookUrl} → HTTP ${proxyStatus}`);
  } catch (err) {
    proxyResponse = String(err).slice(0, 1000);
    console.error("Proxy request failed:", err);
  }

  await supabase
    .from("payments")
    .update({ proxy_url: webhookUrl, proxy_status: proxyStatus, proxy_response: proxyResponse, proxied_at: proxiedAt })
    .eq("id", payment.id);

  return json({ received: true, proxied: true, proxy_status: proxyStatus });
});
