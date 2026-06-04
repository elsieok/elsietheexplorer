import Link from "next/link";
import { format } from "date-fns";
import { MessageCircle, Eye } from "lucide-react";

export default function BlogCard({ post }) {
  const postDate = post.date || post.publishedAt;

  return (
    <article
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "box-shadow 200ms ease, transform 200ms ease",
        height: "100%",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.transform = "";
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, var(--brand-400), var(--brand-300))",
        }}
      />

      <div style={{ padding: "1.375rem 1.5rem 1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8125rem",
            color: "var(--gray-400)",
            marginBottom: "0.75rem",
          }}
        >
          <time dateTime={postDate}>
            {format(new Date(postDate), "d MMM yyyy")}
          </time>
          <span aria-hidden>·</span>
          <span>{post.author}</span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 600,
            fontSize: "1.125rem",
            lineHeight: 1.35,
            color: "var(--gray-900)",
            marginBottom: "0.625rem",
            letterSpacing: "-0.015em",
          }}
        >
          <Link
            href={`/blog/${post.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              transition: "color 150ms ease",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--brand-700)"}
            onMouseLeave={e => e.currentTarget.style.color = "inherit"}
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--gray-500)",
              lineHeight: 1.6,
              marginBottom: "1.125rem",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            paddingTop: "0.875rem",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", flex: 1, overflow: "hidden" }}>
            {post.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="tag tag-gray">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", flexShrink: 0 }}>
            {post.views > 0 && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "0.8125rem",
                  color: "var(--gray-400)",
                }}
              >
                <Eye size={13} strokeWidth={2} />
                {post.views}
              </span>
            )}
            <Link
              href={`/blog/${post.slug}#comments`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontSize: "0.8125rem",
                color: "var(--gray-400)",
                textDecoration: "none",
                transition: "color 150ms ease",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--brand-500)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--gray-400)"}
            >
              <MessageCircle size={13} strokeWidth={2} />
              {post.comments?.length ?? 0}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}