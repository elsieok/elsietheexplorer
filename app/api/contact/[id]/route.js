import { NextResponse } from "next/server"
import connectMongoDB from "@/lib/db/connectMongoDB"
import Contact from "@/lib/models/contact.model"
import { verifyAdmin } from "@/lib/utils/auth"

export async function DELETE(request, { params }) {
    try {
        const token = request.headers.get('authorization')?.replace('Bearer ', '')
        const admin = await verifyAdmin(token)

        if (!admin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { id } = await params
        await connectMongoDB()
        
        const contact = await Contact.findByIdAndDelete(id)
        
        if (!contact) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 })
        }

        return NextResponse.json({ message: 'Contact message deleted' })
    } catch (error) {
        console.error('Failed to delete contact:', error)
        return NextResponse.json(
            { error: 'Failed to delete contact message' }, 
            { status: 500 }
        )
    }
}