import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/utils/auth";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const token = cookies().get('adminToken')?.value
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