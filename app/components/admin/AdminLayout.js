'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { BarChart3, FileText, MessageSquare, Settings, LogOut, Menu, X, Mail, ExternalLink, LayoutDashboard } from "lucide-react"

const navItems = [
  { name: 'Dashboard',        href: '/admin/dashboard',  icon: LayoutDashboard },
  { name: 'Posts',            href: '/admin/posts',      icon: FileText },
  { name: 'Comments',         href: '/admin/comments',   icon: MessageSquare },
  { name: 'Analytics',        href: '/admin/analytics',  icon: BarChart3 },
  { name: 'Messages',         href: '/admin/contacts',   icon: Mail },
]

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('adminToken')
      if (!token) { router.push('/admin/login'); return }

      try {
        const res = await fetch('/api/admin/verify', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
        })
        if (!res.ok) { localStorage.removeItem('adminToken'); router.push('/admin/login'); return }
        setAuthenticated(true)
      } catch {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }
    verify()
  }, [router])

  useEffect(() => { setSidebarOpen(false) }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg-page)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 36, height: 36, border: "3px solid var(--brand-200)", borderTopColor: "var(--brand-500)", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginInline: "auto", marginBottom: "1rem" }} />
          <p style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>Authenticating…</p>
        </div>
      </div>
    )
  }

  if (!authenticated) return null

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--gray-50)" }}>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 40,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0, left: 0, bottom: 0,
          width: "240px",
          zIndex: 50,
          background: "var(--gray-900)",
          display: "flex",
          flexDirection: "column",
          transform: sidebarOpen ? "translateX(0)" : undefined,
          transition: "transform 280ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="admin-sidebar"
      >
        {/* Logo */}
        <div
          style={{
            padding: "1.375rem 1.25rem",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1rem",
              color: "white",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Admin Panel
          </p>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              padding: "0.25rem",
              borderRadius: "var(--radius-sm)",
              display: "flex",
            }}
            className="sidebar-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "0.875rem 0.75rem", overflowY: "auto" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.125rem" }}>
            {navItems.map(({ name, href, icon: Icon }) => {
              const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
              return (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.5625rem 0.875rem",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.9rem",
                      fontWeight: active ? 600 : 400,
                      color: active ? "white" : "rgba(255,255,255,0.55)",
                      background: active ? "rgba(197,100,98,0.25)" : "transparent",
                      textDecoration: "none",
                      transition: "all 150ms ease",
                    }}
                    onMouseEnter={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.background = "rgba(255,255,255,0.07)"; } }}
                    onMouseLeave={e => { if (!active) { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent"; } }}
                  >
                    <Icon size={17} strokeWidth={active ? 2.25 : 1.75} />
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom */}
        <div style={{ padding: "0.875rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.5rem 0.875rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              transition: "color 150ms ease",
              marginBottom: "0.25rem",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
          >
            <ExternalLink size={15} strokeWidth={1.75} />
            View site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.5rem 0.875rem",
              borderRadius: "var(--radius-md)",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.45)",
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              transition: "color 150ms ease",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fca5a5"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
          >
            <LogOut size={15} strokeWidth={1.75} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Topbar */}
        <div
          style={{
            height: "58px",
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            padding: "0 1.5rem",
            gap: "1rem",
            position: "sticky",
            top: 0,
            zIndex: 30,
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="sidebar-toggle"
            style={{
              background: "none",
              border: "none",
              color: "var(--gray-600)",
              cursor: "pointer",
              padding: "0.375rem",
              borderRadius: "var(--radius-sm)",
              display: "flex",
            }}
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <p style={{ fontSize: "0.875rem", color: "var(--gray-400)", margin: 0 }}>
              Admin
              {pathname !== '/admin' && (
                <>
                  {' / '}
                  <span style={{ color: "var(--gray-700)", fontWeight: 500 }}>
                    {navItems.find(n => pathname.startsWith(n.href))?.name ?? 'Page'}
                  </span>
                </>
              )}
            </p>
          </nav>
        </div>

        {/* Content */}
        <main style={{ flex: 1, padding: "1.75rem 1.5rem", maxWidth: "1200px", width: "100%" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar { transform: translateX(0) !important; }
          .admin-main { margin-left: 240px; }
          .sidebar-toggle { display: none !important; }
          .sidebar-close { display: none !important; }
        }
        @media (max-width: 1023px) {
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar.open { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}