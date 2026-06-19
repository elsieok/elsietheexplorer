import { verifyAdmin } from '@/lib/utils/auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg'];

export async function POST(request) {
    try {
        const token = (await cookies()).get('adminToken')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
        }

        const admin = await verifyAdmin(token);
        if (!admin) {
            return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
        }

        // Bug fix: body was referenced before being parsed
        const body = await request.json();
        const { fileName, contentType } = body;

        if (!fileName || !contentType) {
            return NextResponse.json(
                { error: 'fileName and contentType are required' },
                { status: 400 }
            );
        }

        // Bug fix: was checking for the (non-existent) MIME type 'application/jpg'
        if (!ALLOWED_TYPES.includes(contentType)) {
            return NextResponse.json(
                { error: 'Only JPEG uploads are allowed' },
                { status: 400 }
            );
        }

        // Sanitise the filename — strip anything that isn't a safe filename char
        const safeName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const key = `photos/${Date.now()}-${safeName}`;

        const url = await getSignedUrl(
            s3,
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: key,
                ContentType: contentType,
            }),
            { expiresIn: 300 } // 5 minutes
        );
        return NextResponse.json({ url, key, maxBytes: MAX_BYTES });
    } catch (error) {
        console.error('Failed to create presigned URL:', error);
        return NextResponse.json(
            { error: 'Failed to create presigned URL' },
            { status: 500 }
        );
    }
}