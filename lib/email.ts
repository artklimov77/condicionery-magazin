import { Resend } from 'resend'
import type { Order } from './types'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY not set')
  return new Resend(key)
}

export async function sendOrderEmail(order: Order & { product_name?: string }) {
  const sourceLabels: Record<string, string> = {
    product: 'Страница товара',
    catalog: 'Каталог',
    quiz: 'Подборщик',
    contacts: 'Контакты',
  }

  const quizBlock = order.quiz_data
    ? `
      <p><b>Данные подборщика:</b><br>
      Тип помещения: ${order.quiz_data.room_type}<br>
      Площадь: ${order.quiz_data.area_range}<br>
      Бюджет: ${order.quiz_data.budget_range}<br>
      Приоритеты: ${order.quiz_data.priorities.join(', ')}</p>
    `
    : ''

  const productBlock = order.product_name
    ? `<p><b>Товар:</b> ${order.product_name}</p>`
    : ''

  const html = `
    <h2>Новая заявка с сайта</h2>
    <p><b>Источник:</b> ${sourceLabels[order.source] ?? order.source}</p>
    ${productBlock}
    <hr>
    <p><b>Имя:</b> ${order.customer_name}</p>
    <p><b>Телефон:</b> ${order.customer_phone}</p>
    ${order.customer_email ? `<p><b>Email:</b> ${order.customer_email}</p>` : ''}
    ${order.comment ? `<p><b>Комментарий:</b> ${order.comment}</p>` : ''}
    ${quizBlock}
    <hr>
    <p style="color:#888;font-size:12px">ID заявки: ${order.id}</p>
  `

  await getResend().emails.send({
    from: process.env.ORDER_EMAIL_FROM!,
    to: process.env.ORDER_EMAIL_TO!,
    subject: `Новая заявка — ${order.customer_name} (${order.customer_phone})`,
    html,
  })
}
