import { NextResponse } from "next/server"
import connectMongoDB from "@/lib/db/connectMongoDB"
import Photo from "@/lib/models/photo.model"
import { verifyAdmin } from "@/lib/utils/auth"
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { cookies } from "next/headers"
import { getPhotoUrl } from "@/lib/utils/s3"

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

export async function GET(request, { params }) {
    try {
        await connectMongoDB()
        const { id } = await params
        const photo = await Photo.findById(id).lean()
        if (!photo) {
            return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
        }
        return NextResponse.json({ ...photo, url: getPhotoUrl(photo.s3Key) })
    } catch (error) {
        console.error('Failed to fetch photo:', error)
        return NextResponse.json({ error: 'Failed to fetch photo' }, { status: 500 })
    }
}

export async function PATCH(request, { params }) {
    try {
        const token = (await cookies()).get('adminToken')?.value
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        const admin = await verifyAdmin(token)
        if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const { id } = await params
        const data = await request.json()

        const update = {}
        if ('type' in data) update.type = data.type
        if ('caption' in data) update.caption = data.caption?.trim() || undefined
        if ('takenOn' in data) update.takenOn = data.takenOn || undefined
        if ('camera' in data) update.camera = data.camera?.trim() || undefined

        await connectMongoDB()
        const photo = await Photo.findByIdAndUpdate(id, update, { new: true }).lean()
        if (!photo) return NextResponse.json({ error: 'Photo not found' }, { status: 404 })

        return NextResponse.json({ message: 'Photo updated', photo: { ...photo, url: getPhotoUrl(photo.s3Key) } })
    } catch (error) {
        console.error('Failed to update photo:', error)
        return NextResponse.json({ error: 'Failed to update photo' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const token = (await cookies()).get('adminToken')?.value
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const admin = await verifyAdmin(token)
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params
        await connectMongoDB()

        const photo = await Photo.findById(id)
        if (!photo) {
            return NextResponse.json({ error: 'Photo not found' }, { status: 404 })
        }

        try {
            await s3.send(new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: photo.s3Key,
            }))
        } catch (s3Error) {
            console.error('Failed to delete S3 object, aborting Mongo delete:', s3Error)
            return NextResponse.json({ error: 'Failed to delete photo file' }, { status: 500 })
        }
        
        try {
            await Photo.findByIdAndDelete(id)
        } catch (dbError) {
            console.error(
                `CRITICAL: S3 object ${photo.s3Key} was deleted but Mongo record ${id} still exists — manual cleanup needed.`,
                dbError
            )
            return NextResponse.json(
                { error: 'Photo file deleted, but the database record could not be removed. This needs manual cleanup.' },
                { status: 500 }
            )
        }

        return NextResponse.json({ message: 'Photo deleted' })
    } catch (error) {
        console.error('Failed to delete photo:', error)
        return NextResponse.json(
            { error: 'Failed to delete photo' }, 
            { status: 500 }
        )
    }
}