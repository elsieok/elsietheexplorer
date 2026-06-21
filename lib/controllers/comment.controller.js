import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import connectMongoDB from "../db/connectMongoDB.js";

export class CommentController {

    static async getComments({ status, postId }) {
        await connectMongoDB();

        const filter = {};

        if (status === "approved") {
            filter.approved = true;
        }

        if (status === "pending") {
            filter.approved = false;
        }

        if (postId) {
            filter.postId = postId;
        }

        return await Comment.find(filter)
            .populate("postId", "title slug")
            .populate("parentId")
            .sort({ createdAt: -1 })
            .lean();
    }

    static async createComment(data) {
        await connectMongoDB();

        const comment = await Comment.create({
            ...data,
            name: data.name || "Anonymous",
        });

        await Post.findByIdAndUpdate(
            data.postId,
            { $addToSet: { comments: comment._id } }
        );

        return comment;
    }

    static async approveComment(id) {
        await connectMongoDB();

        return await Comment.findByIdAndUpdate(
            id,
            { approved: true },
            { new: true }
        ).populate("postId", "title");
    }

    static async deleteComment(id) {
        await connectMongoDB();
        return await Comment.findByIdAndDelete(id);
    }
}