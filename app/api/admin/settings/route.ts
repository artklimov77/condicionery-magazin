import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const rows = await db.content.findMany()
    const obj: Record<string, string> = {}
    for (const r of rows) obj[r.key] = r.value
    return NextResponse.json(obj)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Record<string, string> = await req.json()
    const ops = Object.entries(body).map(([key, value]) =>
      db.content.upsert({ where: { key }, update: { value }, create: { key, value } })
    )
    await Promise.all(ops)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }
}
