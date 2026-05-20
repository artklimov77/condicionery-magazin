import { NextRequest, NextResponse } from 'next/server'
import { getServiceClient } from '@/lib/supabase'
import { sendOrderEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customer_name, customer_phone, customer_email, comment, product_id, product_name, source, quiz_data } = body

    if (!customer_name?.trim() || !customer_phone?.trim()) {
      return NextResponse.json({ error: 'Имя и телефон обязательны' }, { status: 400 })
    }

    const supabase = getServiceClient()

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_name: customer_name.trim(),
        customer_phone: customer_phone.trim(),
        customer_email: customer_email?.trim() || null,
        comment: comment?.trim() || null,
        product_id: product_id || null,
        product_name: product_name || null,
        source: source || 'catalog',
        quiz_data: quiz_data || null,
        status: 'new',
      })
      .select()
      .single()

    if (error) throw error

    // Email уведомление (не блокируем ответ если упадёт)
    sendOrderEmail(order).catch(console.error)

    return NextResponse.json({ success: true, id: order.id })
  } catch (err) {
    console.error('Order error:', err)
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 })
  }
}
