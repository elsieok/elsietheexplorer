'use client'
import Link from "next/link";
import BlogCard from "./components/BlogCard";
import { useState, useEffect } from "react";

export default function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/posts').then(res => res.json()).then(data => {
            const topPosts = data.slice(0,3)
            console.log(`Fetched top ${Math.min(topPosts.length, 3)} posts: `, topPosts)
            setPosts(topPosts)
            setLoading(false)
        }).catch(err => {
            console.error('Failed to fetch posts: ', err)
            setLoading(false)
        })
    }, [])

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Hero Section */}
            <section className="text-center mb-12 sm:mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
                    Welcome to ElsieThe Explorer!
                </h1>
                <p className="text-base sm:text-xl text-gray-900 mb-6 sm:mb-8 px-2">
                    This is my personal blog and portfolio website for travel, tech, talk and more!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                    <Link 
                        href="/blog"
                        className="bg-white text-[#C56462] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#F5E6E6] transition-colors shadow-md text-sm sm:text-base"
                    >
                        Read My Blog
                    </Link>
                    <Link 
                        href="/projects"
                        className="bg-[#803635] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#6B2D2C] transition-colors shadow-md text-sm sm:text-base"
                    >
                        View My Projects
                    </Link>
                    <Link 
                        href="/photography"
                        className="bg-white text-[#C56462] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#F5E6E6] transition-colors shadow-md text-sm sm:text-base"
                    >
                        Look at My Photos
                    </Link>
                    <Link 
                        href="/about"
                        className="bg-[#803635] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-[#6B2D2C] transition-colors shadow-md text-sm sm:text-base"
                    >
                        Learn More About Me
                    </Link>
                </div>
            </section>

            {/* Latest Posts */}
            <section>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-900">Latest Posts</h2>

                {loading ? (
                    <div className="max-w-6xl mx-auto px-4 py-12">
                        <div className="text-center">
                            <p className="text-gray-900">Loading posts...</p>
                        </div>
                    </div>
                ) : (posts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-900">
                                No posts just yet!
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {posts.map((post) => (
                                    <BlogCard key={post.slug} post={post} />
                                ))}
                            </div>
                            <div className="text-center mt-6 sm:mt-8">
                                <Link 
                                    href="/blog" 
                                    className="inline-block text-[#803635] hover:text-[#6B2D2C] hover:bg-[#6B2D2C]/30 hover:underline font-medium bg-[#803635]/20 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base"
                                >
                                    View All Posts →
                                </Link>
                            </div>
                        </>
                    )
                )}
            </section>
        </div>
    )
}