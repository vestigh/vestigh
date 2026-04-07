import { useEffect, useState, useMemo } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Clock,
  Banknote,
  Search,
  ChevronDown,
  X,
  Copy,
  Check,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Payment } from "@/lib/supabase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type PaymentRow = Payment & {
  stores: { name: string; subdomain: string } | null;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatAmount(amount: number, currency: string) {
  // Paystack amounts are in lowest denomination (pesewas / kobo)
  const major = amount / 100;
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(major);
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function shortRef(ref: string) {
  return ref.length > 20 ? `${ref.slice(0, 10)}…${ref.slice(-6)}` : ref;
}

// ---------------------------------------------------------------------------
// Pill components
// ---------------------------------------------------------------------------
function PaymentStatusPill({ status }: { status: string }) {
  const ok = status === "success";
  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
      style={{
        color: ok ? "#4caf7d" : "#e07060",
        background: ok ? "rgba(76,175,125,0.1)" : "rgba(224,112,96,0.1)",
        border: `1px solid ${ok ? "rgba(76,175,125,0.25)" : "rgba(224,112,96,0.25)"}`,
      }}
    >
      {ok ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
      {status}
    </span>
  );
}

function ProxyStatusPill({
  status,
  proxiedAt,
}: {
  status: number | null;
  proxiedAt: string | null;
}) {
  if (!proxiedAt) {
    return (
      <span
        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
        style={{
          color: "rgba(250,249,246,0.35)",
          background: "rgba(250,249,246,0.05)",
          border: "1px solid rgba(250,249,246,0.1)",
        }}
      >
        <Clock size={11} />
        Not proxied
      </span>
    );
  }

  const ok = status !== null && status >= 200 && status < 300;
  const timedOut = status === 0;

  const color = ok ? "#4caf7d" : timedOut ? "#c8a96e" : "#e07060";
  const bg = ok
    ? "rgba(76,175,125,0.1)"
    : timedOut
    ? "rgba(200,169,110,0.1)"
    : "rgba(224,112,96,0.1)";
  const label = timedOut ? "Timeout" : ok ? `HTTP ${status}` : `HTTP ${status}`;

  return (
    <span
      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
      style={{ color, background: bg, border: `1px solid ${color}30` }}
    >
      {ok ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
      {label}
    </span>
  );
}

function ChannelBadge({ channel }: { channel: string | null }) {
  if (!channel) return <span style={{ color: "rgba(250,249,246,0.25)" }}>—</span>;
  const labels: Record<string, string> = {
    card: "Card",
    mobile_money: "Mobile Money",
    bank: "Bank",
    ussd: "USSD",
    qr: "QR",
    bank_transfer: "Transfer",
  };
  return (
    <span className="text-xs font-medium" style={{ color: "#a09880" }}>
      {labels[channel] ?? channel}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
}) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{
        background: "#ffffff",
        border: "1px solid var(--admin-border)",
        boxShadow: "0 2px 12px rgba(10,10,8,0.04)",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{ background: "rgba(200,169,110,0.1)", color: "var(--admin-gold)" }}
      >
        <Icon size={16} strokeWidth={1.5} />
      </div>
      <div>
        <p
          className="text-2xl font-semibold"
          style={{ color: "var(--admin-black)", fontVariantNumeric: "tabular-nums" }}
        >
          {value}
        </p>
        {sub && (
          <p className="text-xs mt-0.5" style={{ color: "#a09880" }}>
            {sub}
          </p>
        )}
        <p className="text-xs mt-0.5" style={{ color: "#7a7264" }}>
          {label}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Detail modal
// ---------------------------------------------------------------------------
function DetailModal({
  payment,
  onClose,
}: {
  payment: PaymentRow;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"details" | "raw">("details");
  const [copied, setCopied] = useState(false);

  const rawJson = JSON.stringify(payment.raw_payload, null, 2);

  function copyRef() {
    navigator.clipboard.writeText(payment.paystack_reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const rows: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Reference", value: (
        <span className="flex items-center gap-2">
          <code className="text-xs font-mono" style={{ color: "#c8a96e" }}>
            {payment.paystack_reference}
          </code>
          <button onClick={copyRef} style={{ color: "#a09880" }}>
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </span>
      ),
    },
    { label: "Event", value: payment.event_type },
    { label: "Store", value: payment.stores?.name ?? <span style={{ color: "#a09880" }}>Unknown</span> },
    { label: "Customer", value: payment.customer_name || payment.customer_email || "—" },
    { label: "Email", value: payment.customer_email ?? "—" },
    { label: "Amount", value: formatAmount(payment.amount, payment.currency) },
    { label: "Channel", value: payment.channel ?? "—" },
    { label: "Status", value: <PaymentStatusPill status={payment.status} /> },
    { label: "Received", value: formatDate(payment.created_at) },
    { label: "Proxy URL", value: payment.proxy_url
        ? <a href={payment.proxy_url} target="_blank" rel="noopener noreferrer"
            className="text-xs break-all" style={{ color: "#c8a96e" }}>
            {payment.proxy_url}
          </a>
        : <span style={{ color: "#a09880" }}>—</span>,
    },
    { label: "Proxy Status", value: <ProxyStatusPill status={payment.proxy_status} proxiedAt={payment.proxied_at} /> },
    { label: "Proxied At", value: payment.proxied_at ? formatDate(payment.proxied_at) : "—" },
    ...(payment.proxy_response
      ? [{ label: "Proxy Response", value: (
          <code className="text-xs font-mono break-all" style={{ color: "#a09880" }}>
            {payment.proxy_response}
          </code>
        ) }]
      : []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,8,0.72)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "#faf9f6",
          border: "1px solid var(--admin-border-strong)",
          boxShadow: "0 32px 80px rgba(10,10,8,0.4)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(200,169,110,0.15)" }}
        >
          <div>
            <p className="text-xs tracking-[0.18em] uppercase font-medium mb-0.5" style={{ color: "#c8a96e" }}>
              Transaction
            </p>
            <h2 className="admin-serif-heading text-xl" style={{ color: "#0a0a08" }}>
              {payment.event_type}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition"
            style={{ color: "#a09880" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(10,10,8,0.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-shrink-0 px-6 pt-4 gap-4" style={{ borderBottom: "1px solid rgba(10,10,8,0.07)" }}>
          {(["details", "raw"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="pb-3 text-sm font-medium capitalize transition border-b-2"
              style={{
                color: tab === t ? "#0a0a08" : "#a09880",
                borderBottomColor: tab === t ? "#c8a96e" : "transparent",
              }}
            >
              {t === "raw" ? "Raw Payload" : "Details"}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {tab === "details" ? (
            <div className="px-6 py-5">
              <dl className="space-y-0">
                {rows.map(({ label, value }, i) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 py-3"
                    style={{
                      borderBottom: i < rows.length - 1 ? "1px solid rgba(10,10,8,0.06)" : "none",
                    }}
                  >
                    <dt
                      className="w-36 flex-shrink-0 text-xs font-medium pt-0.5"
                      style={{ color: "#7a7264" }}
                    >
                      {label}
                    </dt>
                    <dd className="flex-1 text-sm" style={{ color: "#0a0a08" }}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            <div className="p-6">
              <pre
                className="text-xs font-mono overflow-x-auto rounded-xl p-4"
                style={{
                  background: "#0a0a08",
                  color: "#c8a96e",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                }}
              >
                {rawJson}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Filter bar
// ---------------------------------------------------------------------------
type Filters = {
  search: string;
  paymentStatus: string;
  proxyStatus: string;
  eventType: string;
};

function FilterBar({
  filters,
  onChange,
  eventTypes,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  eventTypes: string[];
}) {
  const sel = (style?: React.CSSProperties): React.CSSProperties => ({
    borderRadius: "8px",
    border: "1px solid rgba(10,10,8,0.13)",
    padding: "7px 10px",
    fontSize: "0.8rem",
    color: "#0a0a08",
    background: "#ffffff",
    outline: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    ...style,
  });

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {/* Search */}
      <div className="relative">
        <Search
          size={13}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "#a09880" }}
        />
        <input
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Reference, email or customer…"
          className="pl-8 pr-3 py-1.5 text-sm rounded-lg outline-none"
          style={{
            border: "1px solid rgba(10,10,8,0.13)",
            background: "#ffffff",
            color: "#0a0a08",
            width: "260px",
            fontFamily: "inherit",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#c8a96e";
            e.target.style.boxShadow = "0 0 0 3px rgba(200,169,110,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(10,10,8,0.13)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Payment status */}
      <div className="relative flex items-center">
        <select
          value={filters.paymentStatus}
          onChange={(e) => onChange({ ...filters, paymentStatus: e.target.value })}
          style={sel({ paddingRight: "28px" })}
        >
          <option value="">All statuses</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
        <ChevronDown size={12} className="absolute right-2 pointer-events-none" style={{ color: "#a09880" }} />
      </div>

      {/* Proxy status */}
      <div className="relative flex items-center">
        <select
          value={filters.proxyStatus}
          onChange={(e) => onChange({ ...filters, proxyStatus: e.target.value })}
          style={sel({ paddingRight: "28px" })}
        >
          <option value="">All proxy states</option>
          <option value="ok">Proxy OK (2xx)</option>
          <option value="failed">Proxy failed</option>
          <option value="none">Not proxied</option>
        </select>
        <ChevronDown size={12} className="absolute right-2 pointer-events-none" style={{ color: "#a09880" }} />
      </div>

      {/* Event type */}
      {eventTypes.length > 0 && (
        <div className="relative flex items-center">
          <select
            value={filters.eventType}
            onChange={(e) => onChange({ ...filters, eventType: e.target.value })}
            style={sel({ paddingRight: "28px" })}
          >
            <option value="">All events</option>
            {eventTypes.map((et) => (
              <option key={et} value={et}>{et}</option>
            ))}
          </select>
          <ChevronDown size={12} className="absolute right-2 pointer-events-none" style={{ color: "#a09880" }} />
        </div>
      )}

      {/* Clear filters */}
      {(filters.search || filters.paymentStatus || filters.proxyStatus || filters.eventType) && (
        <button
          onClick={() => onChange({ search: "", paymentStatus: "", proxyStatus: "", eventType: "" })}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition"
          style={{
            color: "#c8a96e",
            border: "1px solid rgba(200,169,110,0.3)",
            background: "rgba(200,169,110,0.06)",
          }}
        >
          <X size={11} /> Clear filters
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function AdminPayments() {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<PaymentRow | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    paymentStatus: "",
    proxyStatus: "",
    eventType: "",
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    setLoading(true);
    const { data, error } = await supabase
      .from("payments")
      .select("*, stores(name, subdomain)")
      .order("created_at", { ascending: false });
    if (error) console.error(error.message);
    setPayments((data as PaymentRow[]) ?? []);
    setLoading(false);
  }

  // ── Derived stats ───────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalVolume = payments
      .filter((p) => p.status === "success")
      .reduce((sum, p) => sum + p.amount, 0);
    const successful = payments.filter((p) => p.status === "success").length;
    const failedProxy = payments.filter(
      (p) => p.proxied_at !== null && (p.proxy_status === null || p.proxy_status < 200 || p.proxy_status >= 300),
    ).length;
    return { totalVolume, successful, failedProxy };
  }, [payments]);

  // ── Unique event types for filter dropdown ──────────────────────────────
  const eventTypes = useMemo(
    () => [...new Set(payments.map((p) => p.event_type))].sort(),
    [payments],
  );

  // ── Client-side filtering ───────────────────────────────────────────────
  const filtered = useMemo(() => {
    return payments.filter((p) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const hit =
          p.paystack_reference.toLowerCase().includes(q) ||
          (p.customer_email ?? "").toLowerCase().includes(q) ||
          (p.customer_name ?? "").toLowerCase().includes(q) ||
          (p.stores?.name ?? "").toLowerCase().includes(q);
        if (!hit) return false;
      }
      if (filters.paymentStatus && p.status !== filters.paymentStatus) return false;
      if (filters.eventType && p.event_type !== filters.eventType) return false;
      if (filters.proxyStatus) {
        if (filters.proxyStatus === "none" && p.proxied_at !== null) return false;
        if (filters.proxyStatus === "ok" && (p.proxy_status === null || p.proxy_status < 200 || p.proxy_status >= 300)) return false;
        if (filters.proxyStatus === "failed" && (p.proxied_at === null || (p.proxy_status !== null && p.proxy_status >= 200 && p.proxy_status < 300))) return false;
      }
      return true;
    });
  }, [payments, filters]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs tracking-[0.2em] uppercase font-medium mb-2"
          style={{ color: "var(--admin-gold)" }}
        >
          Paystack
        </p>
        <h1 className="admin-serif-heading text-4xl" style={{ color: "var(--admin-black)" }}>
          Transactions
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32">
          <span
            className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--admin-gold)", borderTopColor: "transparent" }}
          />
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total transactions"
              value={String(payments.length)}
              icon={ArrowUpRight}
            />
            <StatCard
              label="Total volume (successful)"
              value={formatAmount(stats.totalVolume, "GHS")}
              icon={Banknote}
            />
            <StatCard
              label="Successful payments"
              value={String(stats.successful)}
              sub={`${payments.length > 0 ? Math.round((stats.successful / payments.length) * 100) : 0}% success rate`}
              icon={CheckCircle2}
            />
            <StatCard
              label="Proxy failures"
              value={String(stats.failedProxy)}
              sub={stats.failedProxy > 0 ? "Check proxy URLs" : "All proxied cleanly"}
              icon={XCircle}
            />
          </div>

          {/* Filters */}
          <FilterBar filters={filters} onChange={setFilters} eventTypes={eventTypes} />

          {/* Table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid var(--admin-border)",
              boxShadow: "0 2px 12px rgba(10,10,8,0.04)",
            }}
          >
            {/* Table count bar */}
            <div
              className="flex items-center justify-between px-6 py-3 text-xs"
              style={{
                borderBottom: "1px solid rgba(200,169,110,0.12)",
                background: "rgba(200,169,110,0.03)",
                color: "#a09880",
              }}
            >
              <span>
                {filtered.length === payments.length
                  ? `${payments.length} transaction${payments.length !== 1 ? "s" : ""}`
                  : `${filtered.length} of ${payments.length} transactions`}
              </span>
              <button
                onClick={fetchPayments}
                className="text-xs transition-opacity hover:opacity-60"
                style={{ color: "#c8a96e" }}
              >
                Refresh
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-sm" style={{ color: "#a09880" }}>
                {payments.length === 0
                  ? "No transactions recorded yet — Paystack webhooks will appear here."
                  : "No transactions match your filters."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(200,169,110,0.12)" }}>
                      {[
                        "Date",
                        "Store",
                        "Customer",
                        "Reference",
                        "Amount",
                        "Channel",
                        "Payment",
                        "Proxy",
                        "",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left px-5 py-3 text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                          style={{
                            color: "#a09880",
                            background: "rgba(200,169,110,0.04)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p, i) => (
                      <tr
                        key={p.id}
                        className="transition cursor-pointer"
                        style={{
                          borderBottom:
                            i < filtered.length - 1
                              ? "1px solid rgba(10,10,8,0.05)"
                              : "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(200,169,110,0.03)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                        onClick={() => setSelected(p)}
                      >
                        {/* Date */}
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className="text-xs" style={{ color: "#7a7264" }}>
                            {formatDate(p.created_at)}
                          </span>
                        </td>

                        {/* Store */}
                        <td className="px-5 py-3.5">
                          {p.stores ? (
                            <span className="text-sm font-medium" style={{ color: "#0a0a08" }}>
                              {p.stores.name}
                            </span>
                          ) : (
                            <span className="text-xs italic" style={{ color: "#a09880" }}>
                              Unknown
                            </span>
                          )}
                        </td>

                        {/* Customer */}
                        <td className="px-5 py-3.5">
                          <p className="text-sm" style={{ color: "#2a2820" }}>
                            {p.customer_name || "—"}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "#a09880" }}>
                            {p.customer_email ?? ""}
                          </p>
                        </td>

                        {/* Reference */}
                        <td className="px-5 py-3.5">
                          <code
                            className="text-xs font-mono"
                            style={{ color: "#c8a96e" }}
                            title={p.paystack_reference}
                          >
                            {shortRef(p.paystack_reference)}
                          </code>
                        </td>

                        {/* Amount */}
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className="text-sm font-semibold" style={{ color: "#0a0a08" }}>
                            {formatAmount(p.amount, p.currency)}
                          </span>
                        </td>

                        {/* Channel */}
                        <td className="px-5 py-3.5">
                          <ChannelBadge channel={p.channel} />
                        </td>

                        {/* Payment status */}
                        <td className="px-5 py-3.5">
                          <PaymentStatusPill status={p.status} />
                        </td>

                        {/* Proxy status */}
                        <td className="px-5 py-3.5">
                          <ProxyStatusPill status={p.proxy_status} proxiedAt={p.proxied_at} />
                        </td>

                        {/* Action */}
                        <td className="px-5 py-3.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelected(p);
                            }}
                            className="text-xs font-medium transition-opacity hover:opacity-60"
                            style={{ color: "#c8a96e" }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Detail modal */}
      {selected && <DetailModal payment={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
