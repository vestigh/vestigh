import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Store, TrendingUp, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Store as StoreType } from "@/lib/supabase";

type Stats = {
  total: number;
  active: number;
  pro: number;
  pending: number;
};

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: "Active", color: "#6dbe8d", bg: "rgba(109,190,141,0.12)" },
    inactive: { label: "Inactive", color: "rgba(250,249,246,0.4)", bg: "rgba(250,249,246,0.06)" },
    pending: { label: "Pending", color: "#c8a96e", bg: "rgba(200,169,110,0.12)" },
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

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, pro: 0, pending: 0 });
  const [recent, setRecent] = useState<StoreType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("stores")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setStats({
          total: data.length,
          active: data.filter((s) => s.status === "active").length,
          pro: data.filter((s) => s.plan === "pro").length,
          pending: data.filter((s) => s.status === "pending").length,
        });
        setRecent(data.slice(0, 5));
      }
      setLoading(false);
    }
    load();
  }, []);

  const cards = [
    { label: "Total Stores", value: stats.total, icon: Store },
    { label: "Active", value: stats.active, icon: CheckCircle },
    { label: "Pro Plan", value: stats.pro, icon: TrendingUp },
    { label: "Pending", value: stats.pending, icon: Clock },
  ];

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs tracking-[0.2em] uppercase font-medium mb-2"
          style={{ color: "var(--admin-gold)" }}
        >
          Overview
        </p>
        <h1
          className="admin-serif-heading text-4xl"
          style={{ color: "var(--admin-black)" }}
        >
          Dashboard
        </h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <span
            className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "var(--admin-gold)", borderTopColor: "transparent" }}
          />
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {cards.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
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
                    className="text-3xl font-semibold"
                    style={{ color: "var(--admin-black)", fontVariantNumeric: "tabular-nums" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#7a7264" }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent stores table */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid var(--admin-border)",
              boxShadow: "0 2px 12px rgba(10,10,8,0.04)",
            }}
          >
            {/* Table header */}
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(200,169,110,0.12)" }}
            >
              <h2 className="text-sm font-semibold" style={{ color: "var(--admin-black)" }}>
                Recent Stores
              </h2>
              <Link
                to="/admin/stores"
                className="flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: "var(--admin-gold)" }}
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>

            {recent.length === 0 ? (
              <div className="px-6 py-16 text-center text-sm" style={{ color: "#a09880" }}>
                No stores yet
              </div>
            ) : (
              <div>
                {recent.map((store, i) => (
                  <div
                    key={store.id}
                    className="px-6 py-4 flex items-center justify-between transition"
                    style={{
                      borderBottom: i < recent.length - 1 ? "1px solid rgba(10,10,8,0.05)" : "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(200,169,110,0.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--admin-black)" }}>
                        {store.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "#a09880" }}>
                        {store.owner_email}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs uppercase tracking-wide font-medium"
                        style={{ color: store.plan === "pro" ? "var(--admin-gold)" : "#a09880" }}
                      >
                        {store.plan}
                      </span>
                      <StatusPill status={store.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
