import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import connectMongoDB from "../db/connectMongoDB.js";
import { v4 } from "uuid";

export class CommentController {
    static async getCommentsByPost(postId, approved = true) {
        await connectMongoDB()
        const filter = { postId, ...(approved && {approved: true }) }
        /* approved && {approved: true } = cleaner way of writing:
            const filter = { postId };
                if (approved) {
                filter.approved = true;
            }
        */
        return await Comment.find(filter).populate('parentId').sort({ createdAt: -1 }).lean()
        // .populate('parentId') means in the place of the parentId (number), replace that fields value with the actual parent comment object
    }

    static async getAllComments(approved = false) {
        await connectMongoDB()
        const filter = approved ? {approved: true } : {}
        return await Comment.find(filter).sort({ createdAt: -1 })
    }

    static async createComment(data) {
        await connectMongoDB()
        
        // const verificationToken = v4()
        // const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)

        const comment = new Comment({
            ...data,
            // verificationToken,
            // verificationExpires,
            name: data.name || 'Anonymous'
        })

        const savedComment = await comment.save()

        // add comment id to post doc
        const postId = data.postId
        const commentId = savedComment._id
        await Post.findByIdAndUpdate( postId, {$addToSet: { comments: commentId }}, { new: true });

        // await sendVerificationEmail(Date.email, verificationToken, data.name || 'Anonymous')

        return savedComment
    }

    static async verifyComment(token) {
        await connectMongoDB()
        const comment = await Comment.findOne({
            verificationToken: token,
            verificationExpires: { $gt: new Date() }
        })

        if (comment) {
            comment.verified = true
            await comment.save()
            return comment
        }

        return null
    }

    static async updateComment(id, data) {
        await connectMongoDB()
        return await Comment.findById(id, data, { new: true })
    }

    static async deleteComment(id) {
        await connectMongoDB()
        return await Comment.findByIdAndDelete(id)
    }

    static async approveComment(id) {
        await connectMongoDB()
        return await Comment.findByIdAndUpdate(id, { approved: true }, { new: true })
    }

}
