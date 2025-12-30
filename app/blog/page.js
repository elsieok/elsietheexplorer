'use client'
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

export default function BlogPage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedTag, setSelectedTag] = useState('all')
    const [availableTags, setAvailableTags] = useState([])

    useEffect(() => {
    fetch('/api/posts')
        .then(async res => {
            if (!res.ok) {
                throw new Error('API error')
            }
            return res.json()
        })
        .then(data => {
            const postsArray = Array.isArray(data) ? data : []
            setPosts(postsArray)

            const tags = new Set()
            postsArray.forEach(post => {
                post.tags?.forEach(tag => tags.add(tag))
            })

            setAvailableTags(Array.from(tags).sort())
            setLoading(false)
        })
        .catch(err => {
            console.error('Failed to fetch posts:', err)
            setPosts([])
            setAvailableTags([])
            setLoading(false)
        })
}, [])

    const filteredPosts = selectedTag === 'all' 
        ? posts 
        : posts.filter(post => post.tags?.includes(selectedTag))

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
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/** Page header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    Blog
                </h1>
                <p className="text-gray-900 text-lg">
                    Thoughts, tutorials, and insights about all things tech
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/** Sidebar with tag filter */}
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="bg-[#E2B9B8] rounded-lg shadow-md p-6 sticky top-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Filter by Tag</h2>
                        <div className="space-y-2">
                            <button
                                onClick={() => setSelectedTag('all')}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                    selectedTag === 'all' 
                                        ? 'bg-[#C56462] text-white font-semibold' 
                                        : 'bg-white text-gray-700 hover:bg-[#F5E6E6]'
                                }`}
                            >
                                All Posts ({posts.length})
                            </button>
                            {availableTags.map(tag => {
                                const count = posts.filter(p => p.tags?.includes(tag)).length
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                                            selectedTag === tag 
                                                ? 'bg-[#C56462] text-white font-semibold' 
                                                : 'bg-white text-gray-700 hover:bg-[#F5E6E6]'
                                        }`}
                                    >
                                        {tag} ({count})
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </aside>

                {/** Blog posts grid */}
                <div className="flex-1">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12 bg-[#E2B9B8] rounded-lg">
                            <p className="text-gray-900">
                                No posts found for this tag.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {filteredPosts.map((post) => 
                                <BlogCard key={post.slug || post._id} post={post}/>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}