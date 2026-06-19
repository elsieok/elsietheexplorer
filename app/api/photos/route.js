import { verifyAdmin } from "@/lib/utils/auth";
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db/connectMongoDB"
import Photo from "@/lib/models/photo.model"
import { getPhotoUrl } from "@/lib/utils/s3"
import { cookies } from "next/headers"

export async function POST(request) {
    try {
        const token = (await cookies()).get('adminToken')?.value
        if (!token) {
            return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
        }
        const admin = await verifyAdmin(token)
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
        }
        const data = await request.json()
        if (!data.s3Key) {
            return NextResponse.json(
                { error: 's3Key is required' },
                { status: 400 }
            )
        }
        if (!data.type) data.type = 'gallery'

        await connectMongoDB()
        const photo = await Photo.create(data)
        return NextResponse.json(
            { message: 'Photo saved successfully', photo: { ...photo.toObject(), url: getPhotoUrl(photo.s3Key) } },
            { status: 201 }
        )
    } catch (error) {
        console.error('Failed to upload photo:', error)
        return NextResponse.json(
            { error: 'Failed to upload photo' },
            { status: 500 }
        )
    }
}

export async function GET(request) {
    try {
        await connectMongoDB()
        const { searchParams } = new URL(request.url)
        const type = searchParams.get('type') // 'gallery' | 'post' | omitted (= everything)

        let filter = {}
        if (type === 'gallery') {
            // Photos uploaded before `type` existed have no field at all —
            // treat anything that isn't explicitly 'post' as a gallery photo
            filter = { type: { $ne: 'post' } }
        } else if (type === 'post') {
            filter = { type: 'post' }
        }

        const photos = await Photo.find(filter).sort({ takenOn: -1, createdAt: -1 }).lean()
        const withUrls = photos.map(photo => ({
            ...photo,
            url: getPhotoUrl(photo.s3Key),
        }))
        return NextResponse.json(withUrls)
    } catch (error) {
        console.error('Failed to fetch photos:', error)
        return NextResponse.json(
            { error: 'Failed to fetch photos' },
            { status: 500 }
        )
    }
}