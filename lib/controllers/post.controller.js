import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import connectMongoDB from "../db/connectMongoDB.js";

export class PostController {
    static async getAllPosts(published = true) {
        await connectMongoDB();
        const query = published ? { published: true } : {};
        // if pulished == true, query = {published: true}, otherwise query is empty
        // pulished is true, passed in from the parameters, if called with no arguments,
        // false can be manually passed in, but there is a separate function for that for clarity's sake
        return await Post.find(query).sort({ publishedAt : -1});
    }

    static async getPostBySlug(slug) {
        await connectMongoDB();
        return await Post.findOne({ slug, published: true });
    }

    static async incrementView(slug) {
        await connectMongoDB()
        const post = await Post.findOneAndUpdate(
            { slug, published: true },
            { $inc: { views: 1 } },
            { new: true }
        )
        return post
    }

    static async getPostById(id) {
        await connectMongoDB()
        return await Post.findById(id).lean()
        // .lean() means return plain javascript object instead of a mongoose document
    }

    static async createPost(data) {
        await connectMongoDB()
        const post = new Post(data)
        return await post.save()
    }

    static async updatePost(id, data) {
        await connectMongoDB();
        return await Post.findByIdAndUpdate( id, data, { new: true });
        // {new: true } = return the updated document instead of the original
        // if empty or false, return original document before update. kind of like ++i and i++
    }

    static async deletePost(id) {
        await connectMongoDB();
        // Also delete all comments for this post
        await Comment.deleteMany({ postId: id });
        return await Post.findByIdAndDelete(id);
    }

    static async likePost(postId, identifier) {
        await connectMongoDB()
        const post = await Post.findById(postId)
        
        if (post.likedBy.includes(identifier)) {
            // Unlike
            post.likes -= 1
            post.likedBy = post.likedBy.filter(id => id !== identifier)
        } else {
            // Like
            post.likes += 1
            post.likedBy.push(identifier)
        }
        
        await post.save()
        return { liked: post.likedBy.includes(identifier), likes: post.likes }
    }

    static async getPostStats() {
        await connectMongoDB();
        const totalPosts = await Post.countDocuments();
        const publishedPosts = await Post.countDocuments({ published: true });
        const totalViews = await Post.aggregate([
            { $group: { _id: null, total: { $sum: '$views' } } }
        ]);
        const totalLikes = await Post.aggregate([
            { $group: { _id: null, total: { $sum: '$likes' } } }
        ]);
        const totalComments = await Comment.countDocuments({ approved: true })
        const popularPosts = await Post.find({ published: true }).sort({ views: -1 }).limit(5).select('title views likes')
        // .select() include only certain fields, omit other fields to reduce size

        return {
            totalPosts,
            publishedPosts,
            totalViews: totalViews[0]?.total || 0,
            totalLikes: totalLikes[0]?.total || 0,
            totalComments,
            popularPosts
        };
    }

}
