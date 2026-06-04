'use client'
import { useState, useEffect } from "react"
import AdminLayout from "@/app/components/admin/AdminLayout"
import { BarChart3, TrendingUp, Heart, MessageSquare, FileText, Eye } from 'lucide-react'

export default function AdminAnalytics() {
  const [data, setData] = useState({ totalPosts: 0, totalViews: 0, totalLikes: 0, totalComments: 0, popularPosts: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts/analytics', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const stats = [
    { label: 'Total posts',    value: data.totalPosts,    icon: FileText,      accent: 'var(--brand-500)',    bg: 'var(--brand-50)' },
    { label: 'Total views',    value: data.totalViews,    icon: Eye,           accent: '#0ea5e9',              bg: '#f0f9ff' },
    { label: 'Total likes',    value: data.totalLikes,    icon: Heart,         accent: '#ec4899',              bg: '#fdf2f8' },
    { label: 'Total comments', value: data.totalComments, icon: MessageSquare, accent: '#8b5cf6',              bg: '#f5f3ff' },
  ]

  const maxViews = Math.max(...(data.popularPosts?.map(p => p.views) ?? [1]), 1)

  return (
    <AdminLayout>
      <div>
        <div style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.625rem", color: "var(--gray-900)", letterSpacing: "-0.02em", margin: 0 }}>
            Analytics
          </h1>
          <p style={{ color: "var(--gray-500)", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
            Overview of your content performance.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {stats.map(({ label, value, icon: Icon, accent, bg }) => (
            <div key={label} className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: bg, color: accent }}>
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <div>
                <p style={{ fontSize: "0.8125rem", color: "var(--gray-500)", margin: "0 0 0.25rem", fontWeight: 500 }}>{label}</p>
                {loading ? (
                  <div className="skeleton" style={{ height: "1.5rem", width: "60px" }} />
                ) : (
                  <p style={{ fontSize: "1.625rem", fontWeight: 700, color: "var(--gray-900)", margin: 0, letterSpacing: "-0.02em", fontFamily: "var(--font-serif)" }}>
                    {value.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Top posts */}
        <div className="admin-panel-card">
          <div className="admin-panel-header" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h2 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <TrendingUp size={17} style={{ color: "var(--brand-500)" }} />
              Top performing posts
            </h2>
          </div>

          <div style={{ padding: "0.75rem 1.5rem 1.25rem" }}>
            {loading ? (
              [1,2,3].map(i => (
                <div key={i} style={{ padding: "1rem 0", borderBottom: "1px solid var(--border-subtle)" }}>
                  <div className="skeleton" style={{ height: "0.9rem", width: "60%", marginBottom: "0.625rem" }} />
                  <div className="skeleton" style={{ height: "0.5rem", borderRadius: "var(--radius-full)" }} />
                </div>
              ))
            ) : (data.popularPosts?.length ?? 0) === 0 ? (
              <p style={{ color: "var(--gray-400)", textAlign: "center", padding: "2rem 0", margin: 0 }}>No data yet.</p>
            ) : (
              data.popularPosts.map((post, i) => {
                const engagementPct = post.views > 0 ? Math.round((post.likes / post.views) * 100) : 0
                const barWidth = Math.round((post.views / maxViews) * 100)
                return (
                  <div
                    key={post._id}
                    style={{
                      padding: "1rem 0",
                      borderBottom: i < data.popularPosts.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "0.625rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: 1, minWidth: 0 }}>
                        <span
                          style={{
                            width: 24, height: 24, borderRadius: "50%",
                            background: i === 0 ? "var(--brand-100)" : "var(--gray-100)",
                            color: i === 0 ? "var(--brand-700)" : "var(--gray-500)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "0.75rem", fontWeight: 700, flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </span>
                        <p style={{ fontWeight: 500, color: "var(--gray-800)", fontSize: "0.9375rem", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {post.title}
                        </p>
                      </div>
                      <div style={{ display: "flex", gap: "1.25rem", flexShrink: 0, fontSize: "0.8125rem" }}>
                        <span style={{ color: "var(--gray-500)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Eye size={12} /> {post.views.toLocaleString()}
                        </span>
                        <span style={{ color: "var(--gray-500)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                          <Heart size={12} /> {post.likes.toLocaleString()}
                        </span>
                        <span
                          style={{
                            color: engagementPct >= 10 ? "var(--success-700)" : "var(--gray-400)",
                            fontWeight: 600,
                          }}
                        >
                          {engagementPct}%
                        </span>
                      </div>
                    </div>
                    {/* Mini bar chart */}
                    <div style={{ height: 6, background: "var(--gray-100)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${barWidth}%`,
                          background: i === 0 ? "var(--brand-400)" : "var(--gray-300)",
                          borderRadius: "var(--radius-full)",
                          transition: "width 600ms ease",
                        }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}