'use client'
import { use, useState, useEffect } from "react";
import { format } from "date-fns";
import { serialize } from "next-mdx-remote/serialize";
import ContentClient from "@/app/components/ContentClient";
import LikeButton from "@/app/components/LikeButton";
import CommentSection from "@/app/components/CommentSection";

// // This function tells Next.js which blog posts exist
// export async function generateStaticParams() {
//     // Async functions are executed in a non-blocking way
//     // but can make code unpredictable and hard to read and debug.
//     const posts = getAllPosts();
//     return posts.map((post) => ({
//         slug: post.slug,
//     }));
// }

// // This func sets the page metadata (title, description, etc.)
// export async function generateMetadata({ params }) {
//     const { slug } = await params;
//     const post = await getPostBySlug(slug);

//     return {
//         title: post.title,
//         description: post.excerpt,
//     }
// }

export default function BlogPost({ params }) {
    const { slug } = use(params);
    const [post, setPost] = useState(null)
    const [mdxSource, setMdxSource] = useState(null)
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        fetch(`/api/posts/${slug}`).then(res => res.json()).then(async data => {
            if (data.error) {
                console.log(`${slug}`)
                console.log('Fetched posts but an error fetched a null post')
                setPost(null)
            } else {
                setPost(data)
                const mdx = await serialize(data.content)
                setMdxSource(mdx)
                const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts') || '{}')
                const now = Date.now();

                if (!viewedPosts[slug] || now - viewedPosts[slug] > 4 * 60 * 60 * 1000) {
                    await fetch(`/api/posts/${slug}/view`, { method: 'POST' })
                    viewedPosts[slug] = now
                    localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts))
                }
            }
            setLoading(false)
        }).catch(err => {
            console.error('Failed to fetch post: ', err)
            setLoading(false)
        })
    }, [slug])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <p className="text-gray-900">Loading post...</p>
            </div> 
        )
    } else if (!post) {
        return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Post Not Found</h1>
            <p className="text-gray-900">The post you&apos;re looking for doesn&apos;t exist.</p>
        </div>
        )
    }

    return (
        <>
            <article className="max-w-4xl mx-auto px-4 py-12">
                {/* Post header */}
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-gray-900">
                        {post.title}
                    </h1>
                    
                    {/* Post metadata */}
                    <div className="flex items-center text-sm text-gray-900 mb-3">
                        <time dateTime={post.publishedAt}>
                            {format(new Date(post.publishedAt), 'd MMM, yyyy')}
                        </time>
                        <span className="mx-2"> • </span>
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.views} views</span>
                    </div>

                    {/** Tags */}
                    <div className="flex flex-wrap gap-2">
                        {post.tags?.map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div>
                        {/* Like button */}
                        <LikeButton postId={post._id} initialLikes={post.likes}/>
                    </div>
                </header>


                {/** Post content */}
                {/* MDX Content rendered on the client */}
                <ContentClient source={mdxSource} />
            </article>

            {/* Comments section */}
            <div className="max-w4xl mx-auto px-4 pb-12">
                <CommentSection postId={post._id}/>
            </div>
        </>
    );
}