import { PostController } from "@/lib/controllers/post.controller.js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET(request, {params }) {
    try {
        const { id } = await params
        const cookieStore = await cookies()
        let identifier = cookieStore.get('user-id')?.value

        if (!identifier) {
            return NextResponse.json({ liked: false, likes: 0 });
        }

        const post = await PostController.getPostById(id)

        if (!post) {
            return NextResponse.json({ liked: false, likes: 0 });
        }

        const liked = post.likedBy.includes(identifier)
        return NextResponse.json({ liked, likes: post.likes })
    } catch (error) {
        console.error('Failed to get like status:', error)
        return NextResponse.json({ error: 'Failed to get like status' }, { status: 500 })
    }
}

export async function POST(request, { params }) {
    try {
        const { id } = await params

        const cookieStore = await cookies()
        let identifier = cookieStore.get('user-id')?.value

        if (!identifier) {
            // generate a unique identifier (UUID)
            // UUID is a 128-bit label, typically 36 characters, great for unique identification
            identifier = crypto.randomUUID()

            // set the cookie (expires in 1 year)
            cookieStore.set('user-id', identifier, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 365 * 2, // 1 year
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
            });
        }

        const result = await PostController.likePost(id, identifier)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update like' }, { status: 500 })
    }
}