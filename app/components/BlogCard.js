import Link from "next/link";
import { format } from "date-fns";

export default function BlogCard({ post }) {
    const postDate = post.date || post.publishedAt

    return (
        <article className="bg-[#CE8988]/50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
                {/* Post metadata */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <time dateTime="{post.date}">
                        {format(new Date(postDate), 'd MMM, yyyy')}
                    </time>
                    <span className="mx-2"> • </span>
                    <span> {post.author} </span>
                </div>

                {/* Post.title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#6B2D2C] hover:underline transition-colors">
                    {post.title}
                    </Link>
                </h3>

                {/* Post excerpt */}
                <p className="text-gray-600 mb-4">
                    {post.excerpt}
                    <br />
                    {/* Read more */}
                    <Link href={`/blog/${post.slug}`} className="text-[#1C8694] hover:text-[#22A1B2] hover:underline font-medium text-sm">
                    Read More...
                    </Link>
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Views and Likes */}
                <div className="text-xl font-bold mb-3 text-gray-900 flex items-center justify-between">
                    {post.views > 0 && (
                        <span>{post.views} views</span>
                    )}
                    {post.likes > 0 && (
                        <>
                            <span className="mx-2"> • </span>
                            <span>{post.likes} likes</span>
                        </>
                    )}
                </div>
            </div>
        </article>
    )
}