import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { Prisma } from '@prisma/client'

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, status, manager_notes } = body

  if (!id) return NextResponse.json({ error: 'id обязателен' }, { status: 400 })

  try {
    if (status !== undefined) {
      await db.order.update({ where: { id }, data: { status } })
    }
    if (manager_notes !== undefined) {
      await db.$executeRaw(Prisma.sql`UPDATE orders SET manager_notes = ${manager_notes} WHERE id = ${id}::uuid`)
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 })
  }
}
