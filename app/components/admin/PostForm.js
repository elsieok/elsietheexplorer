'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Save, X } from "lucide-react"

export default function PostForm({ post = null, isEdit = false }) {
  const [formData, setFormData] = useState({
    title:     post?.title     || '',
    slug:      post?.slug      || '',
    content:   post?.content   || '',
    excerpt:   post?.excerpt   || '',
    author:    post?.author    || 'Elsie',
    tags:      post?.tags?.join(', ') || '',
    published: post?.published ?? true,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    }

    try {
      const url = isEdit ? `/api/posts/${post._id}` : '/api/posts'
      const method = isEdit ? 'PUT' : 'POST'
      const r = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(payload),
      })

      if (r.ok) {
        router.push('/admin/posts')
      } else {
        const data = await r.json()
        setError(data.error || 'Failed to save. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setSaving(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const field = (label, name, required = false, hint = '') => (
    <div>
      <label className="form-label" htmlFor={`pf-${name}`}>
        {label}
        {required && <span style={{ color: "var(--brand-500)", marginLeft: "0.25rem" }}>*</span>}
        {hint && <span style={{ fontWeight: 400, color: "var(--gray-400)", fontSize: "0.8rem", marginLeft: "0.375rem" }}>{hint}</span>}
      </label>
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger" style={{ marginBottom: "1.5rem" }}>{error}</div>}

      <div
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-xl)",
          padding: "1.75rem",
          boxShadow: "var(--shadow-sm)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}
      >
        {/* Title + Slug */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            {field("Title", "title", true)}
            <input
              id="pf-title"
              name="title"
              type="text"
              required
              className="form-input"
              value={formData.title}
              onChange={handleChange}
              placeholder="My awesome post"
            />
          </div>
          <div>
            {field("Slug", "slug", false, "(auto-generated from title)")}
            <input
              id="pf-slug"
              name="slug"
              type="text"
              className="form-input"
              value={formData.slug}
              onChange={handleChange}
              placeholder="my-awesome-post"
            />
          </div>
        </div>

        {/* Author + Tags */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            {field("Author", "author", true)}
            <input
              id="pf-author"
              name="author"
              type="text"
              required
              className="form-input"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div>
            {field("Tags", "tags", false, "(comma-separated)")}
            <input
              id="pf-tags"
              name="tags"
              type="text"
              className="form-input"
              value={formData.tags}
              onChange={handleChange}
              placeholder="tech, web dev, travel"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          {field("Excerpt", "excerpt", true)}
          <textarea
            id="pf-excerpt"
            name="excerpt"
            required
            rows={3}
            className="form-input form-textarea"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="A brief summary of the post…"
          />
        </div>

        {/* Content */}
        <div>
          {field("Content", "content", true, "(Markdown / MDX)")}
          <textarea
            id="pf-content"
            name="content"
            required
            rows={22}
            className="form-input form-textarea"
            style={{ fontFamily: "'Fira Code', 'Cascadia Code', monospace", fontSize: "0.9rem", lineHeight: 1.6 }}
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your post content here…"
          />
        </div>

        {/* Published toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <div
            onClick={() => setFormData(p => ({ ...p, published: !p.published }))}
            role="switch"
            aria-checked={formData.published}
            tabIndex={0}
            onKeyDown={e => { if (e.key === ' ' || e.key === 'Enter') setFormData(p => ({ ...p, published: !p.published })) }}
            style={{
              width: 44,
              height: 24,
              borderRadius: "var(--radius-full)",
              background: formData.published ? "var(--brand-500)" : "var(--gray-300)",
              position: "relative",
              cursor: "pointer",
              transition: "background 200ms ease",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: formData.published ? 23 : 3,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "white",
                boxShadow: "var(--shadow-sm)",
                transition: "left 200ms ease",
              }}
            />
          </div>
          <label
            style={{ fontSize: "0.9375rem", color: "var(--gray-700)", cursor: "pointer", userSelect: "none" }}
            onClick={() => setFormData(p => ({ ...p, published: !p.published }))}
          >
            {formData.published ? 'Published' : 'Draft (not visible to readers)'}
          </label>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
            paddingTop: "0.875rem",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <X size={15} /> Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary btn-sm"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
          >
            <Save size={15} />
            {saving ? 'Saving…' : (isEdit ? 'Update post' : 'Publish post')}
          </button>
        </div>
      </div>
    </form>
  )
}