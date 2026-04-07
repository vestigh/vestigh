import { useEffect, useState, FormEvent } from "react";
import { Plus, Pencil, Trash2, ExternalLink, X, Copy, Check } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Store, StoreInsert } from "@/lib/supabase";

const EMPTY_FORM: StoreInsert = {
  name: "",
  owner_name: "",
  owner_email: "",
  owner_phone: "",
  plan: "free",
  status: "pending",
  subdomain: "",
  custom_domain: "",
  commitment: null,
  webhook_url: "",
  notes: "",
};

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: "Active", color: "#4caf7d", bg: "rgba(76,175,125,0.1)" },
    inactive: { label: "Inactive", color: "#7a7a7a", bg: "rgba(122,122,122,0.1)" },
    pending: { label: "Pending", color: "#c8a96e", bg: "rgba(200,169,110,0.1)" },
  };
  const s = map[status] ?? map.pending;
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-full capitalize font-medium"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}30` }}
    >
      {s.label}
    </span>
  );
}

type DialogState =
  | { type: "closed" }
  | { type: "add" }
  | { type: "edit"; store: Store }
  | { type: "delete"; store: Store };

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: "8px",
  border: "1px solid rgba(10,10,8,0.14)",
  padding: "8px 12px",
  fontSize: "0.875rem",
  outline: "none",
  background: "#faf9f6",
  color: "#0a0a08",
  transition: "border-color 0.15s",
  fontFamily: "inherit",
};

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={inputStyle}
      onFocus={(e) => {
        e.target.style.borderColor = "#c8a96e";
        e.target.style.boxShadow = "0 0 0 3px rgba(200,169,110,0.12)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "rgba(10,10,8,0.14)";
        e.target.style.boxShadow = "none";
        props.onBlur?.(e);
      }}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{ ...inputStyle, cursor: "pointer" }}
      onFocus={(e) => {
        e.target.style.borderColor = "#c8a96e";
        e.target.style.boxShadow = "0 0 0 3px rgba(200,169,110,0.12)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "rgba(10,10,8,0.14)";
        e.target.style.boxShadow = "none";
        props.onBlur?.(e);
      }}
    />
  );
}

function CopyField({ label, value, hint }: { label: string; value: string; hint?: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <div>
      <p className="text-xs font-medium mb-1.5 tracking-wide" style={{ color: "#4a4232" }}>{label}</p>
      <div
        className="flex items-center gap-2 rounded-lg px-3 py-2"
        style={{ background: "#0a0a08", border: "1px solid rgba(200,169,110,0.2)" }}
      >
        <code className="flex-1 text-xs font-mono truncate" style={{ color: "#c8a96e" }}>{value}</code>
        <button
          type="button"
          onClick={copy}
          className="flex-shrink-0 transition-opacity hover:opacity-70"
          style={{ color: copied ? "#4caf7d" : "#c8a96e" }}
          title="Copy"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
      {hint && <p className="mt-1 text-xs" style={{ color: "#a09880" }}>{hint}</p>}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="block text-xs font-medium mb-1.5 tracking-wide"
        style={{ color: "#4a4232" }}
      >
        {label}
        {required && <span style={{ color: "#c8a96e" }} className="ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function AdminStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState<DialogState>({ type: "closed" });
  const [form, setForm] = useState<StoreInsert>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchStores();
  }, []);

  async function fetchStores() {
    setLoading(true);
    const { data } = await supabase
      .from("stores")
      .select("*")
      .order("created_at", { ascending: false });
    setStores(data ?? []);
    setLoading(false);
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setFormError(null);
    setDialog({ type: "add" });
  }

  function openEdit(store: Store) {
    setForm({
      name: store.name,
      owner_name: store.owner_name,
      owner_email: store.owner_email,
      owner_phone: store.owner_phone ?? "",
      plan: store.plan,
      status: store.status,
      subdomain: store.subdomain,
      custom_domain: store.custom_domain ?? "",
      commitment: store.commitment,
      webhook_url: store.webhook_url ?? "",
      notes: store.notes ?? "",
    });
    setFormError(null);
    setDialog({ type: "edit", store });
  }

  function closeDialog() {
    setDialog({ type: "closed" });
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);

    const payload: StoreInsert = {
      ...form,
      owner_phone: form.owner_phone || null,
      custom_domain: form.custom_domain || null,
      commitment: form.commitment || null,
      webhook_url: form.webhook_url || null,
      notes: form.notes || null,
    };

    if (dialog.type === "add") {
      const { error } = await supabase.from("stores").insert(payload);
      if (error) { setFormError(error.message); setSaving(false); return; }
    } else if (dialog.type === "edit") {
      const { error } = await supabase.from("stores").update(payload).eq("id", dialog.store.id);
      if (error) { setFormError(error.message); setSaving(false); return; }
    }

    setSaving(false);
    closeDialog();
    fetchStores();
  }

  async function handleDelete() {
    if (dialog.type !== "delete") return;
    setSaving(true);
    await supabase.from("stores").delete().eq("id", dialog.store.id);
    setSaving(false);
    closeDialog();
    fetchStores();
  }

  const modalOpen = dialog.type !== "closed";

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p
            className="text-xs tracking-[0.2em] uppercase font-medium mb-2"
            style={{ color: "var(--admin-gold)" }}
          >
            Management
          </p>
          <h1
            className="admin-serif-heading text-4xl"
            style={{ color: "var(--admin-black)" }}
          >
            Stores
          </h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: "var(--admin-black)",
            color: "var(--admin-gold)",
            border: "1px solid rgba(200,169,110,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1a1a16";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--admin-black)";
          }}
        >
          <Plus size={15} strokeWidth={1.5} />
          Add Store
        </button>
      </div>

      {/* Table card */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: "1px solid var(--admin-border)",
          boxShadow: "0 2px 12px rgba(10,10,8,0.04)",
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <span
              className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: "var(--admin-gold)", borderTopColor: "transparent" }}
            />
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center py-20 text-sm" style={{ color: "#a09880" }}>
            No stores yet.{" "}
            <button
              onClick={openAdd}
              className="underline font-medium"
              style={{ color: "var(--admin-gold)" }}
            >
              Add the first one.
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(200,169,110,0.12)" }}>
                  {["Store", "Owner", "Plan", "Status", "Subdomain", "Created", ""].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#a09880", background: "rgba(200,169,110,0.04)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stores.map((store, i) => (
                  <tr
                    key={store.id}
                    className="transition"
                    style={{
                      borderBottom:
                        i < stores.length - 1 ? "1px solid rgba(10,10,8,0.05)" : "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(200,169,110,0.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium" style={{ color: "#0a0a08" }}>
                        {store.name}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p style={{ color: "#2a2820" }}>{store.owner_name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#a09880" }}>
                        {store.owner_email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{
                          color: store.plan === "pro" ? "var(--admin-gold)" : "#a09880",
                        }}
                      >
                        {store.plan}
                      </span>
                      {store.commitment && (
                        <span className="ml-1 text-xs" style={{ color: "#c0b090" }}>
                          {store.commitment}mo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill status={store.status} />
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://${store.subdomain}.vestigh.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
                        style={{ color: "var(--admin-gold)" }}
                      >
                        {store.subdomain}
                        <ExternalLink size={10} />
                      </a>
                    </td>
                    <td className="px-6 py-4 text-xs" style={{ color: "#a09880" }}>
                      {new Date(store.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => openEdit(store)}
                          className="p-1.5 rounded-md transition"
                          title="Edit"
                          style={{ color: "#a09880" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#0a0a08";
                            e.currentTarget.style.background = "rgba(10,10,8,0.06)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#a09880";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <Pencil size={13} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => setDialog({ type: "delete", store })}
                          className="p-1.5 rounded-md transition"
                          title="Delete"
                          style={{ color: "#a09880" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#c0453a";
                            e.currentTarget.style.background = "rgba(192,69,58,0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#a09880";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Add / Edit dialog ── */}
      {modalOpen && dialog.type !== "delete" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,8,0.65)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{
              background: "#faf9f6",
              border: "1px solid var(--admin-border-strong)",
              boxShadow: "0 24px 60px rgba(10,10,8,0.35)",
            }}
          >
            {/* Dialog header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(200,169,110,0.15)" }}
            >
              <div>
                <p
                  className="text-xs tracking-[0.18em] uppercase font-medium mb-0.5"
                  style={{ color: "var(--admin-gold)" }}
                >
                  {dialog.type === "add" ? "New store" : "Edit store"}
                </p>
                <h2 className="admin-serif-heading text-xl" style={{ color: "#0a0a08" }}>
                  {dialog.type === "add" ? "Add Store" : dialog.store.name}
                </h2>
              </div>
              <button
                onClick={closeDialog}
                className="w-8 h-8 rounded-full flex items-center justify-center transition"
                style={{ color: "#a09880", background: "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(10,10,8,0.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
              <Field label="Store Name" required>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Akosua Prints"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Owner Name" required>
                  <Input
                    required
                    value={form.owner_name}
                    onChange={(e) => setForm((f) => ({ ...f, owner_name: e.target.value }))}
                    placeholder="Akosua Mensah"
                  />
                </Field>
                <Field label="Owner Phone">
                  <Input
                    value={form.owner_phone ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, owner_phone: e.target.value }))}
                    placeholder="+233 XX XXX XXXX"
                  />
                </Field>
              </div>

              <Field label="Owner Email" required>
                <Input
                  required
                  type="email"
                  value={form.owner_email}
                  onChange={(e) => setForm((f) => ({ ...f, owner_email: e.target.value }))}
                  placeholder="akosua@example.com"
                />
              </Field>

              <div className="grid grid-cols-2 gap-3">
                <Field label="Plan" required>
                  <Select
                    value={form.plan}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, plan: e.target.value as "free" | "pro" }))
                    }
                  >
                    <option value="free">Free</option>
                    <option value="pro">Pro</option>
                  </Select>
                </Field>
                <Field label="Status" required>
                  <Select
                    value={form.status}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, status: e.target.value as Store["status"] }))
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Select>
                </Field>
              </div>

              {form.plan === "pro" && (
                <Field label="Commitment">
                  <Select
                    value={form.commitment ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        commitment: (e.target.value || null) as Store["commitment"],
                      }))
                    }
                  >
                    <option value="">Monthly (no discount)</option>
                    <option value="3">3 months — save 12%</option>
                    <option value="6">6 months — save 20%</option>
                    <option value="12">12 months — save 32%</option>
                  </Select>
                </Field>
              )}

              <Field label="Subdomain" required>
                <div
                  className="flex rounded-lg overflow-hidden transition-all"
                  style={{ border: "1px solid rgba(10,10,8,0.14)", background: "#faf9f6" }}
                  onFocusWithin={() => {}}
                >
                  <input
                    required
                    value={form.subdomain}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      }))
                    }
                    className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                    style={{ color: "#0a0a08", fontFamily: "inherit" }}
                    placeholder="akosuaprints"
                    onFocus={(e) => {
                      const parent = e.target.parentElement!;
                      parent.style.borderColor = "#c8a96e";
                      parent.style.boxShadow = "0 0 0 3px rgba(200,169,110,0.12)";
                    }}
                    onBlur={(e) => {
                      const parent = e.target.parentElement!;
                      parent.style.borderColor = "rgba(10,10,8,0.14)";
                      parent.style.boxShadow = "none";
                    }}
                  />
                  <span
                    className="px-3 py-2 text-xs flex items-center"
                    style={{
                      color: "#a09880",
                      borderLeft: "1px solid rgba(10,10,8,0.1)",
                      background: "rgba(10,10,8,0.03)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    .vestigh.com
                  </span>
                </div>
              </Field>

              <Field label="Custom Domain">
                <Input
                  value={form.custom_domain ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, custom_domain: e.target.value }))}
                  placeholder="akosuaprints.com"
                />
              </Field>

              {/* ── Paystack integration ── */}
              <div
                className="rounded-xl px-4 py-4 space-y-4"
                style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.15)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#c8a96e" }}>
                  Paystack Integration
                </p>

                {/* Store ID — only available after the store is created */}
                {dialog.type === "edit" ? (
                  <CopyField
                    label="Store ID"
                    value={dialog.store.id}
                    hint="The store passes this as metadata.store_id when initiating a Paystack transaction."
                  />
                ) : (
                  <p className="text-xs" style={{ color: "#a09880" }}>
                    The Store ID will be generated and shown here once you save this store.
                    The store uses it as <code className="font-mono">metadata.store_id</code> in every Paystack transaction.
                  </p>
                )}

                <Field label="Proxy Webhook URL">
                  <Input
                    type="url"
                    value={form.webhook_url ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, webhook_url: e.target.value }))}
                    placeholder="https://xyz.supabase.co/functions/v1/my-handler"
                  />
                  <p className="mt-1 text-xs" style={{ color: "#a09880" }}>
                    Optional. After recording the payment, Vestigh will forward the event here.
                  </p>
                </Field>
              </div>

              <Field label="Notes">
                <textarea
                  rows={3}
                  value={form.notes ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  style={{ ...inputStyle, resize: "none" }}
                  placeholder="Internal notes…"
                  onFocus={(e) => {
                    e.target.style.borderColor = "#c8a96e";
                    e.target.style.boxShadow = "0 0 0 3px rgba(200,169,110,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(10,10,8,0.14)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </Field>

              {formError && (
                <div
                  className="rounded-lg px-3 py-2.5 text-sm"
                  style={{
                    background: "rgba(192,69,58,0.08)",
                    border: "1px solid rgba(192,69,58,0.25)",
                    color: "#c0453a",
                  }}
                >
                  {formError}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="px-4 py-2 text-sm rounded-lg transition"
                  style={{ color: "#7a7264" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(10,10,8,0.05)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                  style={{
                    background: "var(--admin-black)",
                    color: "var(--admin-gold)",
                    border: "1px solid rgba(200,169,110,0.3)",
                  }}
                >
                  {saving && (
                    <span
                      className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: "var(--admin-gold)", borderTopColor: "transparent" }}
                    />
                  )}
                  {dialog.type === "add" ? "Add Store" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete confirmation ── */}
      {dialog.type === "delete" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,8,0.65)", backdropFilter: "blur(6px)" }}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-7"
            style={{
              background: "#faf9f6",
              border: "1px solid var(--admin-border-strong)",
              boxShadow: "0 24px 60px rgba(10,10,8,0.35)",
            }}
          >
            <p
              className="text-xs tracking-[0.18em] uppercase font-medium mb-2"
              style={{ color: "#c0453a" }}
            >
              Destructive action
            </p>
            <h2 className="admin-serif-heading text-xl mb-2" style={{ color: "#0a0a08" }}>
              Delete store?
            </h2>
            <p className="text-sm mb-7" style={{ color: "#7a7264" }}>
              <span className="font-medium" style={{ color: "#0a0a08" }}>
                {dialog.store.name}
              </span>{" "}
              will be permanently deleted. This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDialog}
                className="px-4 py-2 text-sm rounded-lg transition"
                style={{ color: "#7a7264" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(10,10,8,0.05)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
                style={{
                  background: "#c0453a",
                  color: "#fff",
                  border: "1px solid rgba(192,69,58,0.3)",
                }}
              >
                {saving && (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
