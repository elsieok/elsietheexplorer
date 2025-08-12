import { PostController } from "@/lib/controllers/post.controller";
import { verifyAdmin } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params
        console.log('Received request for id:', id)
        const post = id.includes('-') ? await PostController.getPostBySlug(id) : await PostController.getPostById(id)

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ error: 'Falied to fetch post' })
    }
}

export async function PUT(request, { params }) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        const admin = await verifyAdmin(token)

        if (!admin) {
            return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
        }
        
        const { id } = await params
        const data = await request.json()
        const post = await PostController.updatePost(id, data)
        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update post' })
    }
}

export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        const admin = verifyAdmin(token)

        if (!admin) {
            return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
        }

        const { id } = params
        const post = await PostController.deletePost(id)
        if (!post) {
            return NextResponse.json({ error: 'Post not found or already deleted' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Post deleted' })
    } catch (error) {
        console.error('Failed to delete post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
    }
}