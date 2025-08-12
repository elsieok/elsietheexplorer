import { CommentController } from "@/lib/controllers/comment.controller";
import { verifyAdmin } from "@/lib/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        const admin = await verifyAdmin(token)

        if (!admin) {
            return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
        }

        const { id } = await params
        const comment = await CommentController.approveComment(id)
        return NextResponse.json(comment)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to approve comment' }, { status: 500 })
    }
}