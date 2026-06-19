import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  ;(await cookies()).delete('adminToken')
  return NextResponse.json({ success: true })
}