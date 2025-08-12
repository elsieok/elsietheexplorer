import { PostController } from "@/lib/controllers/post.controller";
import connectMongoDB from "@/lib/db/connectMongoDB";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectMongoDB()
        const stats = await PostController.getPostStats()
        return NextResponse.json(stats)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' })
    }
}