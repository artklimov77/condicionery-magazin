import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface Ctx {
  params: Promise<{ id: string }>
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  const { id } = await params
  try {
    const body = await req.json()
    const data = await db.product.update({
      where: { id },
      data: { ...body, updated_at: new Date() },
    })
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  const { id } = await params
  try {
    await db.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }
}
