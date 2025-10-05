import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/utils/auth";

export async function POST(request) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        const isAdmin = await verifyAdmin(token)

        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Verify error:', error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}