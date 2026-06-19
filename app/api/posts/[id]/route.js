import { PostController } from "@/lib/controllers/post.controller";
import { verifyAdmin } from "@/lib/utils/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const post = id.includes('-') ? await PostController.getPostBySlug(id) : await PostController.getPostById(id)
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error('GET /api/posts/[id] failed:', error)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const token = (await cookies()).get('adminToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }
    const admin = await verifyAdmin(token)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }
    const { id } = await params
    const data = await request.json()
    const post = await PostController.updatePost(id, data)
    return NextResponse.json(post)
  } catch (error) {
    console.error('PUT /api/posts/[id] failed:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const token = (await cookies()).get('adminToken')?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const admin = await verifyAdmin(token)
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
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