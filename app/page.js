'use client'
import Link from "next/link";
import BlogCard from "./components/BlogCard";
import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Code2, Camera } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Blog",
    description: "Thoughts on travel, tech, and everything in between.",
    href: "/blog",
    color: "var(--brand-500)",
    bg: "var(--brand-50)",
  },
  {
    icon: Code2,
    title: "Projects",
    description: "Personal projects I've built while learning the craft.",
    href: "/projects",
    color: "#0ea5e9",
    bg: "#f0f9ff",
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Moments captured from adventures around the world.",
    href: "/photography",
    color: "#8b5cf6",
    bg: "#f5f3ff",
  },
];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then(r => r.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data.slice(0, 3) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--brand-500) 0%, var(--brand-700) 100%)",
          padding: "5rem 1.25rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: "52rem", marginInline: "auto" }}>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.25rem, 6vw, 3.75rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            Welcome to<br />
            Elsie<em>The</em>Explorer
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.65,
              marginBottom: "2.25rem",
              maxWidth: "44ch",
              marginInline: "auto",
            }}
          >
            My personal corner of the internet — travel, tech, talk and more.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                background: "white",
                color: "var(--brand-700)",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "0.9375rem",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                transition: "transform 200ms ease, box-shadow 200ms ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.16)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)"; }}
            >
              Read the blog <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.75rem",
                background: "rgba(255,255,255,0.12)",
                color: "white",
                borderRadius: "var(--radius-md)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                transition: "background 200ms ease",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            >
              Learn more about me
            </Link>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section style={{ maxWidth: "72rem", marginInline: "auto", padding: "3.5rem 1.25rem 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {features.map(({ icon: Icon, title, description, href, color, bg }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "block",
                padding: "1.5rem",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-xl)",
                boxShadow: "var(--shadow-sm)",
                textDecoration: "none",
                transition: "box-shadow 200ms ease, transform 200ms ease",
                color: "inherit",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.transform = ""; }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "var(--radius-lg)",
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1rem",
                  color,
                }}
              >
                <Icon size={22} strokeWidth={1.75} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: "1.0625rem",
                  color: "var(--gray-900)",
                  marginBottom: "0.375rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--gray-500)", margin: 0, lineHeight: 1.55 }}>
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest posts */}
      <section style={{ maxWidth: "72rem", marginInline: "auto", padding: "3.5rem 1.25rem 4rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.625rem",
              fontWeight: 700,
              color: "var(--gray-900)",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Latest posts
          </h2>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--brand-600)",
              textDecoration: "none",
              transition: "color 150ms ease",
            }}
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                <div className="skeleton" style={{ height: "8rem" }} />
                <div style={{ padding: "1.25rem" }}>
                  <div className="skeleton" style={{ height: "1rem", marginBottom: "0.75rem", width: "40%" }} />
                  <div className="skeleton" style={{ height: "1.25rem", marginBottom: "0.5rem" }} />
                  <div className="skeleton" style={{ height: "1rem", width: "80%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-xl)",
              color: "var(--gray-500)",
            }}
          >
            No posts yet — check back soon!
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {posts.map(post => (
              <BlogCard key={post.slug || post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}