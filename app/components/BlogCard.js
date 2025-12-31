import Link from "next/link";
import { format } from "date-fns";

export default function BlogCard({ post }) {
    const postDate = post.date || post.publishedAt

    return (
        <article className="bg-[#CE8988]/50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            <div className="p-6 flex flex-col flex-grow">
                {/* Post metadata */}
                <div className="flex items-center text-sm text-gray-900 mb-3">
                    <time dateTime={post.date}>
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
                <p className="text-gray-900 mb-4">
                    {post.excerpt}
                    <br />
                    {/* Read more */}
                    <Link href={`/blog/${post.slug}`} className="text-[#803635] hover:text-[#6B2D2C]  hover:underline font-medium text-sm">
                        Read More...
                    </Link>
                </p>

                {/* This div will grow to fill space */}
                <div className="flex-grow"></div>

                {/* Tags and Views/Comments pinned to bottom */}
                <div className="mt-auto">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {post.tags?.map((tag) => (
                            <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Comments */}
                    <div className="text-xl font-bold text-gray-900 flex items-center justify-between">

                        {post.comments?.length === 0 && (
                            <Link href={`/blog/${post.slug}#comments`} className="text-grey-900 hover:text-[#6B2D2C] hover:underline">
                                No comments yet
                            </Link>
                        )}
                        {post.comments?.length > 0 && (
                            <Link href={`/blog/${post.slug}#comments`} className="text-gray-900 hover:text-[#6B2D2C] hover:underline">
                                {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </article>

    )
}