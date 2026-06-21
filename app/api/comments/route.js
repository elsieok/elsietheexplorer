import { CommentController } from "@/lib/controllers/comment.controller";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const postId = searchParams.get("postId");
    const status = searchParams.get("status");

    const comments = await CommentController.getComments({
      status,
      postId,
    });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.email || !data.content || !data.postId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const comment = await CommentController.createComment(data);

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}