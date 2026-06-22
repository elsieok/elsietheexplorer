'use client'

import { useState, useEffect, use } from "react";
import { format } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import ContentClient from "@/app/components/ContentClient";
import LikeButton from "@/app/components/LikeButton";
import SharePost from "@/app/components/SharePost";
import CommentSection from "@/app/components/CommentSection";
import Link from "next/link";
import { ArrowLeft, Clock, Eye } from "lucide-react";
import { FaQ, FaQuestion } from "react-icons/fa6";

function estimateReadTime(content) {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogPost({ params }) {
  const { slug } = use(params);
  const [post, setPost] = useState(null);
  const [mdxSource, setMdxSource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(r => r.json())
      .then(async data => {
        if (!data || data.error) { setPost(null); setLoading(false); return; }
        setPost(data);
        const mdx = await serialize(data.content);
        setMdxSource(mdx);

        const viewed = JSON.parse(localStorage.getItem("viewedPosts") || "{}");
        const now = Date.now();
        if (!viewed[slug] || now - viewed[slug] > 4 * 60 * 60 * 1000) {
          await fetch(`/api/posts/${slug}/view`, { method: "POST" });
          viewed[slug] = now;
          localStorage.setItem("viewedPosts", JSON.stringify(viewed));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (post && window.location.hash === "#comments") {
      const el = document.getElementById("comments");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [post]);

  if (loading) {
    return (
      <div style={{ maxWidth: "44rem", marginInline: "auto", padding: "3rem 1.25rem" }}>
        <div className="skeleton" style={{ height: "1rem", width: "120px", marginBottom: "2rem" }} />
        <div className="skeleton" style={{ height: "2.5rem", marginBottom: "0.875rem" }} />
        <div className="skeleton" style={{ height: "2rem", width: "70%", marginBottom: "1.5rem" }} />
        <div className="skeleton" style={{ height: "1rem", width: "200px", marginBottom: "2.5rem" }} />
        {[1,2,3,4,5].map(i => (
          <div key={i} className="skeleton" style={{ height: "1rem", marginBottom: "0.625rem", width: i % 3 === 0 ? "80%" : "100%" }} />
        ))}
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ maxWidth: "44rem", marginInline: "auto", padding: "4rem 1.25rem", textAlign: "center" }}>
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
          <FaQuestion size={22} style={{ color: 'var(--brand-300)' }} strokeWidth={1.5} />
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", color: "var(--gray-900)", marginBottom: "0.75rem" }}>
          Post not found
        </h1>
        <p style={{ color: "var(--gray-500)", marginBottom: "2rem" }}>
          The post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/blog" className="btn btn-primary">← Back to blog</Link>
      </div>
    );
  }

  const readTime = estimateReadTime(post.content);

  return (
    <div style={{ background: "var(--bg-page)" }}>

      {/* Back nav */}
      <div style={{ maxWidth: "44rem", marginInline: "auto", padding: "1.75rem 1.25rem 0" }}>
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.875rem",
            color: "var(--gray-400)",
            textDecoration: "none",
            transition: "color 150ms ease",
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--brand-600)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--gray-400)"}
        >
          <ArrowLeft size={14} /> Back to blog
        </Link>
      </div>

      {/* Article */}
      <article style={{ maxWidth: "44rem", marginInline: "auto", padding: "2rem 1.25rem 3rem" }}>

        {/* Header */}
        <header style={{ marginBottom: "2.25rem" }}>
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "1.125rem" }}>
            {post.tags?.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 5vw, 2.625rem)",
              fontWeight: 700,
              color: "var(--gray-900)",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
              marginBottom: "1.25rem",
            }}
          >
            {post.title}
          </h1>

          {/* Meta row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1rem",
              paddingBottom: "1.375rem",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--brand-100)",
                  color: "var(--brand-700)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  fontFamily: "var(--font-sans)",
                  flexShrink: 0,
                }}
              >
                {post.author?.[0]?.toUpperCase() ?? "E"}
              </div>
              <div>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--gray-800)", margin: 0, lineHeight: 1.3 }}>
                  {post.author}
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--gray-400)", margin: 0, lineHeight: 1.3 }}>
                  <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), "d MMMM yyyy")}</time>
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "auto" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "var(--gray-400)" }}>
                <Clock size={13} strokeWidth={2} />
                {readTime} min read
              </span>
              {post.views !== 1 ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "var(--gray-400)" }}>
                    <Eye size={13} strokeWidth={2} />
                      {post.views} views
                  </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "var(--gray-400)" }}>
                  <Eye size={13} strokeWidth={2} />
                    {post.views} view
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        {mdxSource && <ContentClient source={mdxSource} />}
      </article>

      {/* Like and Share Buttons */}
      <section>
        <div 
          style={{
            maxWidth: "44rem",
            marginInline: "auto",
            padding: "0 1.25rem 4rem",
            alignItems: "center",
            display: "flex",
            gap: "1.5rem",
          }}>
          <LikeButton postId={post._id} initialLikes={post.likes} />
          <SharePost postTitle={post.title} />
        </div>
      </section>
      {/* Comments */}
      <section id="comments">
        <div style={{ maxWidth: "44rem", marginInline: "auto", padding: "0 1.25rem 4rem" }}>
          <CommentSection postId={post._id} />
        </div>
      </section>
    </div>
  );
}