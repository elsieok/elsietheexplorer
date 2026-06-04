'use client'
import { useState, useEffect } from "react"
import AdminLayout from "@/app/components/admin/AdminLayout"
import { FileText, Eye, Heart, MessageSquare, TrendingUp } from 'lucide-react'
import Link from "next/link"

const statDefs = [
  { key: 'totalPosts',    label: 'Total posts',    icon: FileText,     accent: 'var(--brand-500)',    bg: 'var(--brand-50)' },
  { key: 'totalViews',    label: 'Total views',    icon: Eye,          accent: '#0ea5e9',              bg: '#f0f9ff' },
  { key: 'totalLikes',    label: 'Total likes',    icon: Heart,        accent: '#ec4899',              bg: '#fdf2f8' },
  { key: 'totalComments', label: 'Total comments', icon: MessageSquare,accent: '#8b5cf6',              bg: '#f5f3ff' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, totalLikes: 0, totalComments: 0, popularPosts: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts/analytics')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStats(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <AdminLayout>
      <div>
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.625rem", color: "var(--gray-900)", letterSpacing: "-0.02em", margin: 0 }}>
            Dashboard
          </h1>
          <p style={{ color: "var(--gray-500)", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
            Welcome back — here&apos;s an overview of your site.
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {statDefs.map(({ key, label, icon: Icon, accent, bg }) => (
            <div key={key} className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: bg, color: accent }}>
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "var(--gray-500)", margin: "0 0 0.25rem", fontWeight: 500 }}>{label}</p>
                {loading ? (
                  <div className="skeleton" style={{ height: "1.5rem", width: "60px" }} />
                ) : (
                  <p style={{ fontSize: "1.625rem", fontWeight: 700, color: "var(--gray-900)", margin: 0, letterSpacing: "-0.02em", fontFamily: "var(--font-serif)" }}>
                    {stats[key].toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Popular posts */}
        <div className="admin-panel-card">
          <div className="admin-panel-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <TrendingUp size={17} style={{ color: "var(--brand-500)" }} />
              Popular posts
            </h2>
            <Link href="/admin/posts" style={{ fontSize: "0.8125rem", color: "var(--brand-600)", textDecoration: "none", fontWeight: 500 }}>
              All posts →
            </Link>
          </div>

          <div style={{ padding: "0.5rem 0" }}>
            {loading ? (
              [1,2,3].map(i => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "0.875rem 1.5rem", gap: "1rem" }}>
                  <div className="skeleton" style={{ width: 28, height: 28, borderRadius: "50%" }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton" style={{ height: "0.875rem", width: "60%", marginBottom: "0.375rem" }} />
                    <div className="skeleton" style={{ height: "0.75rem", width: "100px" }} />
                  </div>
                </div>
              ))
            ) : (stats.popularPosts?.length ?? 0) === 0 ? (
              <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--gray-400)", fontSize: "0.9rem" }}>
                No posts yet.
              </div>
            ) : (
              stats.popularPosts.map((post, i) => (
                <div
                  key={post._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.875rem 1.5rem",
                    gap: "1rem",
                    borderBottom: i < stats.popularPosts.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--brand-50)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: i === 0 ? "var(--brand-100)" : "var(--gray-100)",
                      color: i === 0 ? "var(--brand-700)" : "var(--gray-500)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.8125rem", fontWeight: 700, flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 500, color: "var(--gray-800)", fontSize: "0.9375rem", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {post.title}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1.25rem", flexShrink: 0 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "var(--gray-400)" }}>
                      <Eye size={13} strokeWidth={2} /> {post.views}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "var(--gray-400)" }}>
                      <Heart size={13} strokeWidth={2} /> {post.likes}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}