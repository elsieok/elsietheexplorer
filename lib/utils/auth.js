import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import connectMongoDB from '../db/connectMongoDB.js'

export async function verifyAdmin(token) {
    try {
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET)
        await connectMongoDB
        const user = await User.findById(decoded.userId)
        return user && user.role == 'admin' ? user : null
    } catch (error) {
        return null
    }
}

export function generateToken(userId) {
    return jwt.sign({ userId }, process.env.NEXTAUTH_SECRET, {expiresIn: '7d' })
}