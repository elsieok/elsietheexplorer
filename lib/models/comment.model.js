import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    name: { type: String, default: 'Anonymous' },
    email: { type: String, required: true },
    content: { type: String, required: true },
    approved: { type: Boolean, default: false },
    // verificationToken: { type: String },
    // verificationExpires: { type: Date },
    // verified: { type: Boolean, default: false },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }, // For replies
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;