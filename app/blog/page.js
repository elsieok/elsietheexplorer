import { getAllPosts } from "@/lib/mdx";
import BlogCard from "../components/BlogCard";

export default function BlogPage() {
    const posts = getAllPosts()

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
                <BlogCard key={post.slug} post={post}/>
                )}
            </div>

            {/** Empty state */}
            {posts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">
                        No posts yet. Check back soon!
                    </p>
                </div>
            )}
        </div>
    )
}
