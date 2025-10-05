import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    // mongo automatically adds _id field to every document
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    author: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }], // session IDs
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true }); // createdAt and updatedAt

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
// Check if model already exists before defining it, causig error because using it in multiple places makes mongoose redefine a model which isn't allowed

export default Post;