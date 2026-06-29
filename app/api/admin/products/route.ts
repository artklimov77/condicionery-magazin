import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const data = await db.product.findMany({ orderBy: { created_at: 'desc' } })
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = await db.product.create({ data: body })
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }
}
