'use client'
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Send, X, User } from "lucide-react";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`/api/comments?postId=${postId}&approved=true`)
      .then(r => r.ok ? r.json() : [])
      .then(data => { setComments(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [postId]);

  const validate = () => {
    const e = {};
    if (!formData.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.content.trim()) e.content = "Comment cannot be empty";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setSubmitting(true);

    try {
      const r = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, postId }),
      });

      if (r.ok) {
        setFormData({ name: "", email: "", content: "" });
        setShowForm(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 6000);
      }
    } catch {
      // silently fail; user can retry
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <div>
      {/* Section header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            fontSize: "1.375rem",
            color: "var(--gray-900)",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <MessageCircle size={20} strokeWidth={1.75} style={{ color: "var(--brand-500)" }} />
          {loading ? "Comments" : `${comments.length} comment${comments.length !== 1 ? "s" : ""}`}
        </h3>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-secondary btn-sm"
          >
            Leave a comment
          </button>
        )}
      </div>

      {/* Success banner */}
      {submitted && (
        <div className="alert alert-success" style={{ marginBottom: "1.5rem", animation: "fadeIn 300ms ease" }}>
          ✓ Your comment has been submitted and is awaiting review. Thanks!
        </div>
      )}

      {/* Comment form */}
      {showForm && (
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-soft)",
            borderRadius: "var(--radius-xl)",
            padding: "1.5rem",
            marginBottom: "2rem",
            boxShadow: "var(--shadow-sm)",
            animation: "fadeIn 200ms ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h4 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1rem", color: "var(--gray-800)", margin: 0 }}>
              Add a comment
            </h4>
            <button
              onClick={() => { setShowForm(false); setErrors({}); }}
              style={{
                background: "none",
                border: "none",
                color: "var(--gray-400)",
                cursor: "pointer",
                padding: "0.25rem",
                display: "flex",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem", marginBottom: "0.875rem" }}>
              <div>
                <label className="form-label" htmlFor="name">Name <span style={{ color: "var(--gray-400)", fontWeight: 400 }}>(optional)</span></label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-input"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="email">Email <span style={{ color: "var(--brand-500)" }}>*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input${errors.email ? " error" : ""}`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p style={{ fontSize: "0.8rem", color: "var(--danger-500)", marginTop: "0.3rem", margin: "0.3rem 0 0" }}>{errors.email}</p>}
              </div>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label" htmlFor="content">Comment <span style={{ color: "var(--brand-500)" }}>*</span></label>
              <textarea
                id="content"
                name="content"
                rows={4}
                className={`form-input form-textarea${errors.content ? " error" : ""}`}
                placeholder="Share your thoughts…"
                value={formData.content}
                onChange={handleChange}
              />
              {errors.content && <p style={{ fontSize: "0.8rem", color: "var(--danger-500)", margin: "0.3rem 0 0" }}>{errors.content}</p>}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
              <p style={{ fontSize: "0.8125rem", color: "var(--gray-400)", margin: 0 }}>
                Comments are reviewed before appearing.
              </p>
              <div style={{ display: "flex", gap: "0.625rem" }}>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setErrors({}); }}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Send size={14} />
                  {submitting ? "Submitting…" : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[1, 2].map(i => (
            <div key={i} style={{ display: "flex", gap: "0.875rem" }}>
              <div className="skeleton" style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ height: "0.875rem", width: "120px", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: "0.875rem", marginBottom: "0.375rem" }} />
                <div className="skeleton" style={{ height: "0.875rem", width: "75%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 && !showForm ? (
        <div
          style={{
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            border: "1px dashed var(--border-soft)",
            borderRadius: "var(--radius-xl)",
            color: "var(--gray-400)",
          }}
        >
          <MessageCircle size={28} strokeWidth={1.5} style={{ marginBottom: "0.625rem", color: "var(--brand-200)" }} />
          <p style={{ margin: 0, fontSize: "0.9375rem" }}>No comments yet. Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {comments.map((comment, i) => (
            <div
              key={comment._id}
              style={{
                display: "flex",
                gap: "0.875rem",
                padding: "1.125rem 0",
                borderBottom: i < comments.length - 1 ? "1px solid var(--border-subtle)" : "none",
                animation: "fadeIn 300ms ease",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "var(--brand-100)",
                  color: "var(--brand-600)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-sans)",
                  flexShrink: 0,
                }}
              >
                {comment.name && comment.name !== "Anonymous"
                  ? comment.name[0].toUpperCase()
                  : <User size={16} strokeWidth={2} />}
              </div>

              {/* Body */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.625rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--gray-800)" }}>
                    {comment.name || "Anonymous"}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--gray-400)" }}>
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p style={{ fontSize: "0.9375rem", color: "var(--gray-700)", lineHeight: 1.65, margin: 0 }}>
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}