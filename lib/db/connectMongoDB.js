import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({ path: '.env.local' })


const connectMongoDB = async () => {
    // Check if already connected
    if (mongoose.connections[0].readyState) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connection to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDB;