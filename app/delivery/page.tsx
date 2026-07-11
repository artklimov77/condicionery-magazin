import type { Metadata } from 'next'
import { getContent, cms } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Доставка и монтаж',
}

export default async function DeliveryPage() {
  const content = await getContent()
  const c = (key: string) => cms(content, key)

  const cards = [
    { title: c('delivery_card1_title'), body: c('delivery_card1_body') },
    { title: c('delivery_card2_title'), body: c('delivery_card2_body') },
    { title: c('delivery_card3_title'), body: c('delivery_card3_body') },
    { title: c('delivery_card4_title'), body: c('delivery_card4_body') },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Доставка и монтаж</h1>
      <p className="text-slate-500 mb-10">Всё — от заказа до установки</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-2">{card.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{card.body}</p>
          </div>
        ))}
      </div>

      <div className="bg-brand-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Оплата</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Наличными', desc: 'При получении / монтаже' },
            { label: 'Картой', desc: 'Онлайн или на месте' },
            { label: 'Безналичный расчёт', desc: 'Для юридических лиц' },
          ].map((p) => (
            <div key={p.label} className="bg-white rounded-xl p-4">
              <div className="font-semibold text-slate-900 text-sm mb-1">{p.label}</div>
              <div className="text-xs text-slate-400">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
