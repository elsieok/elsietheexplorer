import { PostController } from "@/lib/controllers/post.controller";
import Post from "@/lib/models/post.model";
import { NextResponse } from "next/server";

export async function POST(request, {params }) {
    const { id } = await params
    const slug = id.includes('-') ? id : null

    try {
        await PostController.incrementView(slug)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to count view:', error)
        return NextResponse.json({ error: 'Failed to count view' }, { status: 500 })
    }
}