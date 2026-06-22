'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import AdminLayout from "@/app/components/admin/AdminLayout"
import { FileText, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { format } from "date-fns"

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetch('/api/posts?published=false')
      .then(r => r.ok ? r.json() : [])
      .then(data => { setPosts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this post? This also removes its comments and cannot be undone.')) return
    setDeleting(id)
    try {
      const r = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (r.ok) setPosts(prev => prev.filter(p => p._id !== id))
    } catch { /* show nothing, keep post in list */ }
    setDeleting(null)
  }

  const sortedPosts = [...posts].sort((a, b) => {
    if (a.published !== b.published) {
      return a.published ? 1 : -1
    }
    
    const dateA = a.published
      ? new Date(a.publishedAt)
      : new Date(a.createdAt)

    const dateB = b.published
      ? new Date(b.publishedAt)
      : new Date(b.createdAt)

    return dateB - dateA
  })

  return (
    <AdminLayout>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.625rem", color: "var(--gray-900)", letterSpacing: "-0.02em", margin: 0 }}>
              Posts
            </h1>
            {!loading && (
              <p style={{ color: "var(--gray-400)", fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
                {posts.length} post{posts.length !== 1 ? 's' : ''} total
              </p>
            )}
          </div>
          <Link
            href="/admin/posts/create"
            className="btn btn-primary btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <Plus size={16} />
            New post
          </Link>
        </div>

        <div className="admin-panel-card">
          {loading ? (
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div className="skeleton" style={{ flex: 1, height: "1rem" }} />
                  <div className="skeleton" style={{ width: 60, height: "1.5rem", borderRadius: "var(--radius-full)" }} />
                  <div className="skeleton" style={{ width: 40, height: "1rem" }} />
                  <div className="skeleton" style={{ width: 80, height: "1rem" }} />
                  <div className="skeleton" style={{ width: 72, height: "1rem" }} />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "0.625rem",
                }}
              >
                <FileText size={28} />
              </div>

              <p style={{ fontWeight: 600, color: "var(--gray-700)", marginBottom: "0.375rem" }}>No posts yet</p>
              <p style={{ color: "var(--gray-400)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Create your first post to get started.</p>
              <Link href="/admin/posts/create" className="btn btn-primary btn-sm">
                <Plus size={15} /> Create post
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table" style={{ minWidth: "600px" }}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th style={{ width: 100 }}>Status</th>
                    <th style={{ width: 70 }}>Views</th>
                    <th style={{ width: 70 }}>Likes</th>
                    <th style={{ width: 110 }}>Created</th>
                    <th style={{ width: 110 }}>Published</th>
                    <th style={{ width: 100 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPosts.map(post => (
                    <tr key={post._id}>
                      <td>
                        <p style={{ fontWeight: 500, color: "var(--gray-900)", margin: 0, fontSize: "0.9375rem" }}>
                          {post.title}
                        </p>
                      </td>
                      <td>
                        <span className={`badge ${post.published ? 'badge-success' : 'badge-warning'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td style={{ color: "var(--gray-600)", fontSize: "0.9rem" }}>{post.views}</td>
                      <td style={{ color: "var(--gray-600)", fontSize: "0.9rem" }}>{post.likes}</td>
                      <td style={{ color: "var(--gray-400)", fontSize: "0.875rem" }}>
                        {format(new Date(post.createdAt), 'd MMM yyyy')}
                      </td>
                      { post.publishedAt ? (
                        <td style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}>{format(new Date(post.publishedAt), 'd MMM yyyy')} </td> 
                      ) : (<td style={{ color: "var(--gray-400)", fontSize: "0.9rem" }}> -- </td>
                      )}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            title="View post"
                            style={{
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                              width: 30, height: 30, borderRadius: "var(--radius-md)",
                              color: "var(--gray-400)", textDecoration: "none",
                              transition: "all 150ms ease",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "var(--info-50)"; e.currentTarget.style.color = "var(--info-700)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gray-400)"; }}
                          >
                            <Eye size={15} />
                          </Link>
                          <Link
                            href={`/admin/posts/edit/${post._id}`}
                            title="Edit post"
                            style={{
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                              width: 30, height: 30, borderRadius: "var(--radius-md)",
                              color: "var(--gray-400)", textDecoration: "none",
                              transition: "all 150ms ease",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "var(--brand-50)"; e.currentTarget.style.color = "var(--brand-600)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gray-400)"; }}
                          >
                            <Edit size={15} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            disabled={deleting === post._id}
                            title="Delete post"
                            style={{
                              display: "inline-flex", alignItems: "center", justifyContent: "center",
                              width: 30, height: 30, borderRadius: "var(--radius-md)",
                              color: "var(--gray-400)", background: "none", border: "none",
                              cursor: "pointer", transition: "all 150ms ease",
                              opacity: deleting === post._id ? 0.5 : 1,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = "var(--danger-50)"; e.currentTarget.style.color = "var(--danger-700)"; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gray-400)"; }}
                          >
                            <Trash2 size={15} />
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
      </div>
    </AdminLayout>
  )
}