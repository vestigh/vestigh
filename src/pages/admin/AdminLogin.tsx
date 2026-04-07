import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import "./admin.css";

export default function AdminLogin() {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (session) {
    navigate("/admin", { replace: true });
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate("/admin", { replace: true });
    }
  }

  return (
    <div
      className="admin-root min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--admin-black)" }}
    >
      {/* Background grain texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="admin-logo-text text-3xl"
            style={{ color: "var(--admin-cream)" }}
          >
            Vestig<span style={{ color: "var(--admin-gold)" }}>h</span>
          </div>
          <p className="mt-1 text-xs tracking-[0.2em] uppercase" style={{ color: "var(--admin-muted)" }}>
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(250, 249, 246, 0.04)",
            border: "1px solid var(--admin-border-strong)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h1
            className="admin-serif-heading text-xl mb-6"
            style={{ color: "var(--admin-cream)" }}
          >
            Sign in
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-xs font-medium tracking-wide mb-1.5"
                style={{ color: "var(--admin-muted)" }}
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition"
                style={{
                  background: "rgba(250,249,246,0.06)",
                  border: "1px solid var(--admin-border-strong)",
                  color: "var(--admin-cream)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--admin-gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--admin-border-strong)")}
                placeholder="admin@vestigh.com"
              />
            </div>

            <div>
              <label
                className="block text-xs font-medium tracking-wide mb-1.5"
                style={{ color: "var(--admin-muted)" }}
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition"
                style={{
                  background: "rgba(250,249,246,0.06)",
                  border: "1px solid var(--admin-border-strong)",
                  color: "var(--admin-cream)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--admin-gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--admin-border-strong)")}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div
                className="rounded-lg px-3 py-2.5 text-sm"
                style={{
                  background: "rgba(200, 80, 60, 0.12)",
                  border: "1px solid rgba(200, 80, 60, 0.35)",
                  color: "#f0a090",
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="admin-btn-gold w-full rounded-lg py-2.5 text-sm font-medium tracking-wide mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && (
                <span
                  className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: "var(--admin-gold)", borderTopColor: "transparent" }}
                />
              )}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: "var(--admin-muted)" }}>
          Vestigh &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
