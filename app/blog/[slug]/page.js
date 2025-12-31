'use client'

import { useState, useEffect, use } from "react";
import { format } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import ContentClient from "@/app/components/ContentClient";
import LikeButton from "@/app/components/LikeButton";
import CommentSection from "@/app/components/CommentSection";

export default function BlogPost({ params }) {
  const { slug } = use(params);
  const [post, setPost] = useState(null);
  const [mdxSource, setMdxSource] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post data
  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(async data => {
        if (!data || data.error) {
          console.error('Failed to fetch post:', slug);
          setPost(null);
        } else {
          setPost(data);
          const mdx = await serialize(data.content);
          setMdxSource(mdx);

          // Track views in localStorage
          const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '{}');
          const now = Date.now();
          if (!viewedPosts[slug] || now - viewedPosts[slug] > 4 * 60 * 60 * 1000) {
            await fetch(`/api/posts/${slug}/view`, { method: 'POST' });
            viewedPosts[slug] = now;
            localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch post:', err);
        setLoading(false);
      });
  }, [slug]);

  // Smooth scroll if URL has #comments
  useEffect(() => {
    if (post && window.location.hash === "#comments") {
      const el = document.getElementById("comments");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [post]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-gray-900">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Post Not Found</h1>
        <p className="text-gray-900">The post you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <>
      {/* Blog content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 break-words">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-900 mb-3 gap-2">
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'd MMM, yyyy')}
            </time>
            <span className="hidden sm:inline">•</span>
            <span>{post.author}</span>
            <span className="hidden sm:inline">•</span>
            <span>{post.views} views</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags?.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>

          {/* Like button */}
          <LikeButton postId={post._id} initialLikes={post.likes} />
        </header>

        {/* Post content */}
        <ContentClient source={mdxSource} />
      </article>

      {/* Comments section */}
      <section id="comments" className="mt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <CommentSection postId={post._id} />
        </div>
      </section>
    </>
  );
}
