'use client'
import { useState, useEffect } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { CheckCircle, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

const FILTERS = ['pending', 'approved', 'all']

export default function AdminComments() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')
  const [actionId, setActionId] = useState(null)

  useEffect(() => {
    setLoading(true)
    const approved = filter === 'approved' ? 'true' : 'false'
    fetch(`/api/comments?approved=${approved}`)
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        let arr = Array.isArray(data) ? data : []
        if (filter === 'pending') arr = arr.filter(c => !c.approved)
        setComments(arr)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [filter])

  const handleApprove = async (id) => {
    setActionId(id)
    try {
      const r = await fetch(`/api/comments/approve/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
      })
      if (r.ok) {
        setComments(prev => prev.map(c => c._id === id ? { ...c, approved: true } : c))
      }
    } catch { /* noop */ }
    setActionId(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this comment permanently?')) return
    setActionId(id)
    try {
      const r = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
      })
      if (r.ok) setComments(prev => prev.filter(c => c._id !== id))
    } catch { /* noop */ }
    setActionId(null)
  }

  return (
    <AdminLayout>
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", flexWrap: "wrap", gap: "1rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.625rem", color: "var(--gray-900)", letterSpacing: "-0.02em", margin: 0 }}>
            Comments
          </h1>

          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              background: "var(--gray-100)",
              borderRadius: "var(--radius-md)",
              padding: "0.25rem",
              gap: "0.125rem",
            }}
          >
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "0.375rem 0.875rem",
                  borderRadius: "var(--radius-sm)",
                  border: "none",
                  fontSize: "0.875rem",
                  fontWeight: filter === f ? 600 : 400,
                  color: filter === f ? "var(--gray-900)" : "var(--gray-500)",
                  background: filter === f ? "white" : "transparent",
                  cursor: "pointer",
                  boxShadow: filter === f ? "var(--shadow-xs)" : "none",
                  transition: "all 150ms ease",
                  textTransform: "capitalize",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="admin-panel-card">
          {loading ? (
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ padding: "1rem", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.625rem" }}>
                    <div className="skeleton" style={{ height: "0.875rem", width: "100px" }} />
                    <div className="skeleton" style={{ height: "0.875rem", width: "60px", borderRadius: "var(--radius-full)" }} />
                  </div>
                  <div className="skeleton" style={{ height: "0.875rem", marginBottom: "0.375rem" }} />
                  <div className="skeleton" style={{ height: "0.875rem", width: "70%" }} />
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--gray-400)" }}>
              <p style={{ fontSize: "1.75rem", marginBottom: "0.625rem" }}>💬</p>
              <p style={{ fontWeight: 500, margin: 0, color: "var(--gray-600)" }}>
                No {filter !== 'all' ? filter : ''} comments found.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {comments.map((comment, i) => (
                <div
                  key={comment._id}
                  style={{
                    padding: "1.125rem 1.5rem",
                    borderBottom: i < comments.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--brand-50)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--gray-900)", fontSize: "0.9375rem" }}>{comment.name || 'Anonymous'}</span>
                        <span style={{ fontSize: "0.8125rem", color: "var(--gray-400)" }}>{comment.email}</span>
                        <span className={`badge ${comment.approved ? 'badge-success' : 'badge-warning'}`}>
                          {comment.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>

                      <p style={{ fontSize: "0.9375rem", color: "var(--gray-700)", lineHeight: 1.6, margin: "0 0 0.625rem" }}>
                        {comment.content}
                      </p>

                      <div style={{ fontSize: "0.8125rem", color: "var(--gray-400)", display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
                        <span>On: <span style={{ color: "var(--gray-600)", fontWeight: 500 }}>{comment.postId?.title || 'Unknown post'}</span></span>
                        <span>{format(new Date(comment.createdAt), 'd MMM yyyy, h:mm a')}</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
                      {!comment.approved && (
                        <button
                          onClick={() => handleApprove(comment._id)}
                          disabled={actionId === comment._id}
                          title="Approve comment"
                          style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            width: 32, height: 32, borderRadius: "var(--radius-md)",
                            background: "none", border: "none", cursor: "pointer",
                            color: "var(--gray-400)", transition: "all 150ms ease",
                            opacity: actionId === comment._id ? 0.5 : 1,
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "var(--success-50)"; e.currentTarget.style.color = "var(--success-700)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--gray-400)"; }}
                        >
                          <CheckCircle size={17} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(comment._id)}
                        disabled={actionId === comment._id}
                        title="Delete comment"
                        style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: 32, height: 32, borderRadius: "var(--radius-md)",
                          background: "none", border: "none", cursor: "pointer",
                          color: "var(--gray-400)", transition: "all 150ms ease",
                          opacity: actionId === comment._id ? 0.5 : 1,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "var(--danger-50)"; e.currentTarget.style.color = "var(--danger-700)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--gray-400)"; }}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}