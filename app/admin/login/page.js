'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('adminToken', data.token)
        router.push('/admin/dashboard')
      } else {
        setError(data.error || 'Invalid credentials. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    }
    setLoading(false)
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--gray-900)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.25rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "380px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "var(--radius-xl)",
              background: "var(--brand-500)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginInline: "auto",
              marginBottom: "1.25rem",
              boxShadow: "0 8px 24px rgba(197,100,98,0.35)",
            }}
          >
            <Lock size={22} color="white" strokeWidth={2} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1.625rem",
              color: "white",
              letterSpacing: "-0.025em",
              marginBottom: "0.375rem",
            }}
          >
            Admin login
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", margin: 0 }}>
            Sign in to access the dashboard
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "var(--radius-xl)",
            padding: "2rem",
            backdropFilter: "blur(8px)",
          }}
        >
          {error && (
            <div
              className="alert alert-danger"
              style={{ marginBottom: "1.25rem", background: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.25)", color: "#fca5a5" }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: "0.375rem" }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={16}
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,0.35)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  placeholder="admin@example.com"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.625rem 0.875rem 0.625rem 2.5rem",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "var(--radius-md)",
                    color: "white",
                    fontSize: "0.9375rem",
                    fontFamily: "var(--font-sans)",
                    outline: "none",
                    transition: "border-color 150ms ease, box-shadow 150ms ease",
                  }}
                  onFocus={e => { e.target.style.borderColor = "var(--brand-400)"; e.target.style.boxShadow = "0 0 0 3px rgba(197,100,98,0.2)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: "0.375rem" }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  size={16}
                  style={{
                    position: "absolute",
                    left: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,0.35)",
                    pointerEvents: "none",
                  }}
                />
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={e => setFormData(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.625rem 2.5rem 0.625rem 2.5rem",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "var(--radius-md)",
                    color: "white",
                    fontSize: "0.9375rem",
                    fontFamily: "var(--font-sans)",
                    outline: "none",
                    transition: "border-color 150ms ease, box-shadow 150ms ease",
                  }}
                  onFocus={e => { e.target.style.borderColor = "var(--brand-400)"; e.target.style.boxShadow = "0 0 0 3px rgba(197,100,98,0.2)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(p => !p)}
                  style={{
                    position: "absolute",
                    right: "0.875rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.35)",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                  }}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.6875rem",
                background: loading ? "var(--brand-400)" : "var(--brand-500)",
                color: "white",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontSize: "0.9375rem",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 150ms ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                  Signing in…
                </>
              ) : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}