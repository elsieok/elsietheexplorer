import { CommentController } from "@/lib/controllers/comment.controller";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const postId = searchParams.get('postId')
        const approvedParam = searchParams.get('approved')

        let approved = undefined
        if (approvedParam === 'true'){
            approved = true
        } else if (approvedParam === 'true') {
            approved = false
        }

        if (postId) {
            const comments = await CommentController.getCommentsByPost(postId, approved)
            return NextResponse.json(comments)
        } else {
            const comments = await CommentController.getAllComments(approved)
            return NextResponse.json(comments)
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const data = await request.json()

        if (!data.email || !data.content || !data.postId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const comment = await CommentController.createComment(data)
        return NextResponse.json(comment, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
    }
}