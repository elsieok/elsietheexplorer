import { CommentController } from "@/lib/controllers/comment.controller";
import { verifyAdmin } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        const admin = verifyAdmin(token)

        if (!admin) {
            return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
        }

        const { id } = await params
        const comment = await CommentController.deleteComment(id)
        if (!comment) {
            return NextResponse.json({ error: 'Comment not found or already deleted' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Comment deleted' })
    } catch (error) {
        console.error('Failed to delete comment:', error);
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
    }
}