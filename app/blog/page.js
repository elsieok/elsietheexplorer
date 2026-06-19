'use client'
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { Filter, X } from "lucide-react";
import { FaFilterCircleXmark } from "react-icons/fa6";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("all");
  const [availableTags, setAvailableTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const arr = Array.isArray(data) ? data : [];
        setPosts(arr);
        const tags = new Set();
        arr.forEach(p => p.tags?.forEach(t => tags.add(t)));
        setAvailableTags(Array.from(tags).sort());
        setLoading(false);
      })
      .catch(() => { setPosts([]); setLoading(false); });
  }, []);

  const filtered = selectedTag === "all" ? posts : posts.filter(p => p.tags?.includes(selectedTag));

  return (
    <div style={{ maxWidth: "72rem", marginInline: "auto", padding: "2.5rem 1.25rem 4rem" }}>

      {/* Page header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "var(--gray-900)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
          Blog
        </h1>
        <p style={{ color: "var(--gray-500)", fontSize: "1.0625rem", margin: 0 }}>
          Oh, dont mind me. Just yapping away...
        </p>
      </div>

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>

        {/* Sidebar — desktop */}
        <aside
          style={{
            width: "210px",
            flexShrink: 0,
            position: "sticky",
            top: "80px",
          }}
          className="blog-sidebar"
        >
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xl)",
              padding: "1.25rem",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-400)", marginBottom: "0.875rem" }}>
              Filter by tag
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <TagButton label="All posts" count={posts.length} active={selectedTag === "all"} onClick={() => setSelectedTag("all")} />
              {availableTags.map(tag => (
                <TagButton
                  key={tag}
                  label={tag}
                  count={posts.filter(p => p.tags?.includes(tag)).length}
                  active={selectedTag === tag}
                  onClick={() => setSelectedTag(tag)}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Mobile filter bar */}
          <div className="mobile-filter-bar" style={{ marginBottom: "1.25rem" }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-soft)",
                borderRadius: "var(--radius-md)",
                color: "var(--gray-700)",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              <Filter size={15} />
              Filter
              {selectedTag !== "all" && (
                <span
                  style={{
                    background: "var(--brand-500)",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "0.1rem 0.5rem",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  {selectedTag}
                </span>
              )}
            </button>

            {showFilters && (
              <div
                style={{
                  marginTop: "0.625rem",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1rem",
                  boxShadow: "var(--shadow-md)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                {["all", ...availableTags].map(tag => (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(tag); setShowFilters(false); }}
                    style={{
                      padding: "0.35rem 0.875rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: selectedTag === tag ? "var(--brand-500)" : "var(--border-soft)",
                      background: selectedTag === tag ? "var(--brand-500)" : "transparent",
                      color: selectedTag === tag ? "white" : "var(--gray-600)",
                      transition: "all 150ms ease",
                    }}
                  >
                    {tag === "all" ? "All" : tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active filter indicator */}
          {selectedTag !== "all" && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>
                Showing <strong style={{ color: "var(--gray-800)" }}>{filtered.length}</strong> post{filtered.length !== 1 ? "s" : ""} tagged
              </span>
              <span className="badge badge-brand">{selectedTag}</span>
              <button
                onClick={() => setSelectedTag("all")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontSize: "0.8125rem",
                  color: "var(--gray-400)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.1rem 0.25rem",
                }}
              >
                <X size={13} /> Clear
              </button>
            </div>
          )}

          {/* Posts grid */}
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ background: "var(--bg-surface)", borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                  <div className="skeleton" style={{ height: "3px" }} />
                  <div style={{ padding: "1.375rem 1.5rem" }}>
                    <div className="skeleton" style={{ height: "0.75rem", width: "45%", marginBottom: "0.875rem" }} />
                    <div className="skeleton" style={{ height: "1.25rem", marginBottom: "0.5rem" }} />
                    <div className="skeleton" style={{ height: "1rem", width: "85%", marginBottom: "0.375rem" }} />
                    <div className="skeleton" style={{ height: "1rem", width: "60%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                padding: "4rem 2rem",
                textAlign: "center",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-xl)",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'var(--brand-50)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginInline: 'auto',
                  marginBottom: '1rem',
                }}
              >
                <FaFilterCircleXmark size={22} style={{ color: 'var(--brand-300)' }} strokeWidth={1.5} />
              </div>
              <p style={{ fontWeight: 600, color: "var(--gray-800)", marginBottom: "0.375rem" }}>No posts found</p>
              <p style={{ color: "var(--gray-500)", fontSize: "0.9rem", margin: 0 }}>Try a different tag filter.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {filtered.map(post => (
                <BlogCard key={post.slug || post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .blog-sidebar { display: none !important; }
          .mobile-filter-bar { display: block !important; }
        }
        @media (min-width: 768px) {
          .mobile-filter-bar { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function TagButton({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 0.75rem",
        borderRadius: "var(--radius-md)",
        fontSize: "0.875rem",
        fontWeight: active ? 600 : 400,
        color: active ? "var(--brand-700)" : "var(--gray-600)",
        background: active ? "var(--brand-50)" : "transparent",
        border: "none",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        transition: "all 150ms ease",
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "var(--gray-50)"; e.currentTarget.style.color = "var(--gray-800)"; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gray-600)"; } }}
    >
      <span>{label}</span>
      <span
        style={{
          fontSize: "0.75rem",
          color: active ? "var(--brand-600)" : "var(--gray-400)",
          fontWeight: 400,
        }}
      >
        {count}
      </span>
    </button>
  );
}