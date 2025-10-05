import { PostController } from "@/lib/controllers/post.controller";
import Post from "@/lib/models/post.model";
import { verifyAdmin } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request, {params }) {
    const { id } = await params
    const slug = id.includes('-') ? id : null

    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        const admin = await verifyAdmin(token)
        
        if (!admin){
           await PostController.incrementView(slug)
        }
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to count view:', error)
        return NextResponse.json({ error: 'Failed to count view' }, { status: 500 })
    }
}