import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db/connectMongoDB";
import User from "@/lib/models/user.model";
import { generateToken } from "@/lib/utils/auth";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const {email, password } = await request.json()

        await connectMongoDB()
        const user = await User.findOne({ email })

        if (!user || !(await user.comparePassword(password))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
        }

        const token = generateToken(user._id)
        ;(await cookies()).set('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/'
        })
        return NextResponse.json({ token, user: { id: user._id, email: user.email } })
    } catch (error) {
        return NextResponse.json({ error: 'Login failed' }, { status: 500 })
    }
}