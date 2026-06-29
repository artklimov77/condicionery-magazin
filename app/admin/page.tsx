import { db } from '@/lib/db'
import Link from 'next/link'

async function getStats() {
  try {
    const [totalProducts, newOrders, totalOrders] = await Promise.all([
      db.product.count({ where: { available: true } }),
      db.order.count({ where: { status: 'new' } }),
      db.order.count(),
    ])
    return { totalProducts, newOrders, totalOrders }
  } catch {
    return { totalProducts: 0, newOrders: 0, totalOrders: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Дашборд</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {[
          { label: 'Товаров в каталоге', value: stats.totalProducts, href: '/admin/products', color: 'bg-blue-500' },
          { label: 'Новых заявок', value: stats.newOrders, href: '/admin/orders', color: 'bg-amber-500', urgent: stats.newOrders > 0 },
          { label: 'Всего заявок', value: stats.totalOrders, href: '/admin/orders', color: 'bg-slate-500' },
        ].map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className={`bg-white rounded-2xl border shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-shadow ${s.urgent ? 'border-amber-300 ring-2 ring-amber-200' : 'border-slate-100'}`}
          >
            <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center text-white text-xl font-bold flex-shrink-0`}>
              {s.value}
            </div>
            <div>
              <div className="font-semibold text-slate-900">{s.label}</div>
              {s.urgent && <div className="text-xs text-amber-600 font-medium mt-0.5">Требуют обработки</div>}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          href="/admin/products/new"
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Добавить товар</div>
            <div className="text-xs text-slate-400">Создать новую позицию в каталоге</div>
          </div>
        </Link>

        <Link
          href="/admin/orders?status=new"
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-slate-900">Новые заявки</div>
            <div className="text-xs text-slate-400">Посмотреть необработанные</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
