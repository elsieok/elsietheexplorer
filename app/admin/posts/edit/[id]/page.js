'use client'
import { use, useState, useEffect } from "react"
import AdminLayout from "@/app/components/admin/AdminLayout"
import PostForm from "@/app/components/admin/PostForm"

export default function EditPost({ params }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = use(params)

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(r => r.json())
      .then(data => { setPost(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  return (
    <AdminLayout>
      <div>
        <div style={{ marginBottom: "1.75rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1.625rem",
              color: "var(--gray-900)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Edit post
          </h1>
          {post && (
            <p style={{ color: "var(--gray-400)", fontSize: "0.875rem", margin: "0.25rem 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {post.title}
            </p>
          )}
        </div>

        {loading ? (
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xl)",
              padding: "1.75rem",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <div className="skeleton" style={{ height: "0.8rem", width: "60px", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: "2.5rem", borderRadius: "var(--radius-md)" }} />
              </div>
              <div>
                <div className="skeleton" style={{ height: "0.8rem", width: "60px", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: "2.5rem", borderRadius: "var(--radius-md)" }} />
              </div>
            </div>
            <div className="skeleton" style={{ height: "0.8rem", width: "80px", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ height: "5rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem" }} />
            <div className="skeleton" style={{ height: "0.8rem", width: "80px", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ height: "16rem", borderRadius: "var(--radius-md)" }} />
          </div>
        ) : !post ? (
          <div
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xl)",
              color: "var(--gray-500)",
            }}
          >
            Post not found or failed to load.
          </div>
        ) : (
          <PostForm post={post} isEdit />
        )}
      </div>
    </AdminLayout>
  )
}