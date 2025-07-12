import Link from "next/link";
import { getAllPosts } from "@/lib/md";
import BlogCard from "./components/BlogCard";

export default function Home() {
    const posts = getAllPosts().slice(0, 3); // Show only latest 3 posts

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Welcome to ElsieThe Explorer!
            </h1>
            <p className="text-xl text-gray-900 mb-8">
            This is my personal blog and portfolio website for travel, tech, talk and more!
            </p>
            <div className="flex gap-4 justify-center">
            <Link 
                href="/blog" 
                className="bg-[#94E1EB]/60 text-white px-6 py-3 rounded-lg hover:bg-[#B2E9F0]/75 transition-colors"
            >
                Read My Blog
            </Link>
            <Link 
                href="/about" 
                className="border border-[#94E1EB/60 text-[#94E1EB] px-6 py-3 rounded-lg hover:bg-[#B2E9F0]/75 hover:text-white transition-colors"
            >
                About Me
            </Link>
            </div>
        </section>

        {/* Latest Posts */}
        <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Latest Posts</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
            ))}
            </div>
            <div className="text-center mt-8">
            <Link href="/blog" className="text-[#1C8694] hover:text-[#22A1B2] hover:bg-[#B2E9F0]/75 font-medium bg-[#94E1EB]/60 px-6 py-3 rounded-lg hover:bg-[#B2E9F0]/75 transition-colors">
                View All Posts →
            </Link>
            </div>
        </section>
        </div>
    )
}
