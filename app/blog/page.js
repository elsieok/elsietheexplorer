'use client'
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { Filter } from "lucide-react";

export default function BlogPage() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedTag, setSelectedTag] = useState('all')
    const [availableTags, setAvailableTags] = useState([])
    const [showFilters, setShowFilters] = useState(false)

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Page header */}
            <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900">
                    Blog
                </h1>
                <p className="text-gray-900 text-base sm:text-lg">
                    Thoughts, tutorials, and insights about all things tech
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                {/* Mobile filter button */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full bg-[#E2B9B8] text-gray-900 px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-[#CE8988] transition-colors"
                    >
                        <Filter size={20} />
                        Filter by Tag
                        {selectedTag !== 'all' && (
                            <span className="bg-[#C56462] text-white px-2 py-1 rounded-full text-xs">
                                {selectedTag}
                            </span>
                        )}
                    </button>
                </div>

                {/* Sidebar with tag filter */}
                <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-[#E2B9B8] rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-20">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Filter by Tag</h2>
                        <div className="space-y-2">
                            <button
                                onClick={() => {
                                    setSelectedTag('all')
                                    setShowFilters(false)
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
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
                                        onClick={() => {
                                            setSelectedTag(tag)
                                            setShowFilters(false)
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
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

                {/* Blog posts grid */}
                <div className="flex-1">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12 bg-[#E2B9B8] rounded-lg">
                            <p className="text-gray-900">
                                No posts found for this tag.
                            </p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
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