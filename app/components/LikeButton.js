'use client'
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function LikeButton({ postId, initialLikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${postId}/like`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) { setLikes(data.likes); setLiked(data.liked); }
      })
      .catch(error => console.error("Failed to fetch like status", error)); // FIX: was 'err'
  }, [postId]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    // Optimistic update
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikes(l => wasLiked ? l - 1 : l + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    try {
      const r = await fetch(`/api/posts/${postId}/like`, { method: "POST" });
      if (r.ok) {
        const data = await r.json();
        setLikes(data.likes);
        setLiked(data.liked);
      } else {
        // Revert on failure
        setLiked(wasLiked);
        setLikes(l => wasLiked ? l + 1 : l - 1);
      }
    } catch (error) {
      console.error("Failed to like:", error);
      setLiked(wasLiked);
      setLikes(l => wasLiked ? l + 1 : l - 1);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      aria-label={liked ? "Unlike this post" : "Like this post"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        borderRadius: "var(--radius-full)",
        border: "1.5px solid",
        borderColor: liked ? "var(--brand-400)" : "var(--gray-200)",
        background: liked ? "var(--brand-50)" : "var(--bg-surface)",
        color: liked ? "var(--brand-600)" : "var(--gray-500)",
        fontSize: "0.9375rem",
        fontWeight: 500,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        transition: "all 200ms ease",
        fontFamily: "var(--font-sans)",
      }}
      onMouseEnter={e => {
        if (!loading) {
          e.currentTarget.style.borderColor = "var(--brand-400)";
          e.currentTarget.style.background = "var(--brand-50)";
          e.currentTarget.style.color = "var(--brand-600)";
        }
      }}
      onMouseLeave={e => {
        if (!loading && !liked) {
          e.currentTarget.style.borderColor = "var(--gray-200)";
          e.currentTarget.style.background = "var(--bg-surface)";
          e.currentTarget.style.color = "var(--gray-500)";
        }
      }}
    >
      <Heart
        size={17}
        strokeWidth={2}
        fill={liked ? "currentColor" : "none"}
        style={{
          transform: animating ? "scale(1.3)" : "scale(1)",
          transition: "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />
      <span>{likes}</span>
    </button>
  );
}