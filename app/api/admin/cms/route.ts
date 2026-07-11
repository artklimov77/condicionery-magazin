import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const rows = await db.content.findMany()
  const data: Record<string, string> = {}
  for (const r of rows) data[r.key] = r.value
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json() as Record<string, string>
  for (const [key, value] of Object.entries(body)) {
    await db.content.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
  }
  return NextResponse.json({ ok: true })
}
