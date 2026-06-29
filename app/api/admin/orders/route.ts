import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json()
  if (!id || !status) return NextResponse.json({ error: 'id и status обязательны' }, { status: 400 })

  try {
    await db.order.update({ where: { id }, data: { status } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }
}
