import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Store = {
  id: string;
  name: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string | null;
  plan: "free" | "pro";
  status: "active" | "inactive" | "pending";
  subdomain: string;
  custom_domain: string | null;
  commitment: "3" | "6" | "12" | null;
  notes: string | null;
  /** URL of the store's own edge function — Vestigh proxies verified Paystack events here */
  webhook_url: string | null;
  created_at: string;
  updated_at: string;
};

export type StoreInsert = Omit<Store, "id" | "created_at" | "updated_at">;
export type StoreUpdate = Partial<StoreInsert>;

export type Payment = {
  id: string;
  store_id: string | null;
  paystack_reference: string;
  event_type: string;
  amount: number;
  currency: string;
  customer_email: string | null;
  customer_name: string | null;
  channel: string | null;
  status: string;
  metadata: Record<string, unknown> | null;
  raw_payload: Record<string, unknown>;
  proxy_url: string | null;
  proxy_status: number | null;
  proxy_response: string | null;
  proxied_at: string | null;
  created_at: string;
};
