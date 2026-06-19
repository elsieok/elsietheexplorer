import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    s3Key: { type: String, required: true, unique: true },
    takenOn: { type: Date },
    caption: { type: String },
    camera: { type: String },
    // 'gallery' = shown on the public /photography page
    // 'post'    = only available to insert inline into blog posts
    type: { type: String, enum: ['gallery', 'post'], default: 'gallery' },
}, { timestamps: true });

const Photo = mongoose.models.Photo || mongoose.model("Photo", photoSchema);
export default Photo;