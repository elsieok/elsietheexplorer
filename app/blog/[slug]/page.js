import { getAllPosts, getPostBySlug } from "@/lib/md";
// import { MDXRemote } from "next-mdx-remote";
import { format } from "date-fns";
import ContentClient from "@/app/components/PostContentClient";

// This function tells Next.js which blog posts exist
export async function generateStaticParams() {
    // Async functions are executed in a non-blocking way
    // but can make code unpredictable and hard to read and debug.
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// This func sets the page metadata (title, description, etc.)
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    return {
        title: post.title,
        description: post.excerpt,
    }
}

export default async function BlogPost({ params}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    return (
        <article className="max-w-4xl mx-auto px-4 py-12">
            {/* Post header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    {post.title}
                </h1>
                
                {/* Post metadata */}
                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <time dateTime={post.date}>
                        {format(new Date(post.date), 'd MMM, yyyy')}
                    </time>
                    <span className="mx-2"> • </span>
                    <span>{post.author}</span>
                </div>

                {/** Tags */}
                <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </header>

            {/** Post content */}
            {/* MDX Content rendered on the client */}
            <ContentClient source={post.content} />
        </article>
    );
}