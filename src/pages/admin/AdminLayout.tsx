import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Store, ArrowUpRight, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import "./admin.css";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/stores", label: "Stores", icon: Store, end: false },
  { to: "/admin/transactions", label: "Transactions", icon: ArrowUpRight, end: false },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div
      className="admin-root min-h-screen flex"
      style={{ background: "var(--admin-cream-dim)" }}
    >
      {/* ── Sidebar ── */}
      <aside
        className="w-60 flex-shrink-0 flex flex-col sticky top-0 h-screen"
        style={{
          background: "var(--admin-black)",
          borderRight: "1px solid var(--admin-border)",
        }}
      >
        {/* Logo */}
        <div
          className="px-6 py-7 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--admin-border)" }}
        >
          <div className="admin-logo-text text-2xl" style={{ color: "var(--admin-cream)" }}>
            Vestig<span style={{ color: "var(--admin-gold)" }}>h</span>
          </div>
          <p
            className="text-xs tracking-[0.18em] uppercase mt-0.5"
            style={{ color: "var(--admin-muted)" }}
          >
            Admin
          </p>
        </div>

        {/* Nav — use div to avoid Landing.css global nav{position:fixed} bleed */}
        <div role="navigation" className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "admin-nav-active" : "admin-nav-idle"
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "var(--admin-gold)" : "var(--admin-muted)",
                background: isActive ? "rgba(200, 169, 110, 0.1)" : "transparent",
                border: isActive
                  ? "1px solid rgba(200, 169, 110, 0.22)"
                  : "1px solid transparent",
              })}
            >
              <Icon size={15} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
        </div>

        {/* User / sign out */}
        <div
          className="px-3 py-4 flex-shrink-0"
          style={{ borderTop: "1px solid var(--admin-border)" }}
        >
          <div className="px-3 py-1 mb-1">
            <p className="text-xs truncate" style={{ color: "var(--admin-muted)" }}>
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{ color: "var(--admin-muted)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--admin-gold)";
              e.currentTarget.style.background = "rgba(200,169,110,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--admin-muted)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <LogOut size={15} strokeWidth={1.5} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
