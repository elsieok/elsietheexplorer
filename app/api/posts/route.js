import { PostController } from "@/lib/controllers/post.controller.js";
import { verifyAdmin } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published') !== 'false'

    const posts = await PostController.getAllPosts(published)

    // Defensive: ensure array
    return NextResponse.json(Array.isArray(posts) ? posts : [])
  } catch (error) {
    console.error('GET /api/posts failed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    const admin = await verifyAdmin(token)

    if (!admin) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }
    
    const data = await request.json()
    const post = await PostController.createPost(data)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' })
  }

}
