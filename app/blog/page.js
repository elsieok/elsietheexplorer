'use client'
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

export default function BlogPage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/posts').then(res => res.json()).then(data => {
            // default is GET request, fetch('/api/posts', { method: 'GET' })
            console.log('Fetched posts:', data)
            setPosts(data)
            setLoading(false)
        }).catch(err => {
            console.error('Failed to fetch posts: ', err)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center">
                    <p className="text-gray-900">Loading posts...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/** Page header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    Blog
                </h1>
                <p className="text-gray-900 text-lg">
                    Thoughts, tutorials, and insights about all things tech
                </p>
            </div>

            {/** Blog posts grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => 
                <BlogCard key={post.slug || post._id } post={post}/>
                )}
            </div>

            {/** Empty state */}
            {posts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-900">
                        No posts yet. Check back soon!
                    </p>
                </div>
            )}
        </div>
    )
}
