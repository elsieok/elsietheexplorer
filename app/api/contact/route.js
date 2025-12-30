import { NextResponse } from "next/server"
import connectMongoDB from "@/lib/db/connectMongoDB"
import Contact from "@/lib/models/contact.model"

export async function POST(request) {
    try {
        const data = await request.json()

        if (!data.name || !data.email || !data.message) {
            return NextResponse.json(
                { error: 'Missing required fields' }, 
                { status: 400 }
            )
        }

        await connectMongoDB()
        
        const contact = new Contact({
            name: data.name,
            email: data.email,
            message: data.message
        })

        await contact.save()

        return NextResponse.json(
            { message: 'Contact message saved successfully' }, 
            { status: 201 }
        )
    } catch (error) {
        console.error('Failed to save contact message:', error)
        return NextResponse.json(
            { error: 'Failed to save contact message' }, 
            { status: 500 }
        )
    }
}

export async function GET(request) {
    try {
        await connectMongoDB()
        const contacts = await Contact.find({}).sort({ createdAt: -1 })
        return NextResponse.json(contacts)
    } catch (error) {
        console.error('Failed to fetch contacts:', error)
        return NextResponse.json(
            { error: 'Failed to fetch contacts' }, 
            { status: 500 }
        )
    }
}