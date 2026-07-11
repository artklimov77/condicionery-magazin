import { db } from '@/lib/db'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Дашборд' }

async function getStats() {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [totalProducts, availableProducts, noPrice, newOrders, todayOrders, totalOrders, recentOrders, categories] = await Promise.all([
      db.product.count(),
      db.product.count({ where: { available: true } }),
      db.product.count({ where: { available: true, price_unit: 0 } }),
      db.order.count({ where: { status: 'new' } }),
      db.order.count({ where: { created_at: { gte: today } } }),
      db.order.count(),
      db.order.findMany({
        orderBy: { created_at: 'desc' },
        take: 5,
      }),
      db.category.findMany({
        include: { _count: { select: { products: true } } },
        orderBy: { sort_order: 'asc' },
      }),
    ])
    return { totalProducts, availableProducts, noPrice, newOrders, todayOrders, totalOrders, recentOrders, categories }
  } catch {
    return { totalProducts: 0, availableProducts: 0, noPrice: 0, newOrders: 0, todayOrders: 0, totalOrders: 0, recentOrders: [], categories: [] }
  }
}

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'Новая', color: 'bg-amber-100 text-amber-800' },
  in_progress: { label: 'В работе', color: 'bg-blue-100 text-blue-800' },
  done: { label: 'Выполнена', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Отменена', color: 'bg-slate-100 text-slate-500' },
}

export default async function AdminDashboard() {
  const s = await getStats()

  const statCards = [
    { label: 'Товаров в каталоге', value: s.availableProducts, total: s.totalProducts, href: '/admin/products', color: 'bg-blue-500', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
      </svg>
    )},
    { label: 'Без цены (по запросу)', value: s.noPrice, href: '/admin/products?price=zero', color: 'bg-slate-500', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )},
    { label: 'Новых заявок', value: s.newOrders, href: '/admin/orders?status=new', color: s.newOrders > 0 ? 'bg-amber-500' : 'bg-slate-500', urgent: s.newOrders > 0, icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
    )},
    { label: 'Заявок сегодня', value: s.todayOrders, href: '/admin/orders', color: 'bg-green-500', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    )},
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Дашборд</h1>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Добавить товар
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-shadow ${c.urgent ? 'border-amber-300 ring-2 ring-amber-200' : 'border-slate-100'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${c.color} flex items-center justify-center text-white`}>
                {c.icon}
              </div>
              {c.urgent && (
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">!</span>
              )}
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-0.5">{c.value}</div>
            <div className="text-xs text-slate-500">{c.label}</div>
            {'total' in c && c.total && (
              <div className="text-xs text-slate-400 mt-1">всего в базе: {c.total}</div>
            )}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Последние заявки</h2>
            <Link href="/admin/orders" className="text-xs text-brand-600 hover:underline">Все →</Link>
          </div>
          {s.recentOrders.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">Заявок пока нет</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {s.recentOrders.map((o) => {
                const cfg = statusConfig[o.status] ?? statusConfig.new
                return (
                  <div key={o.id} className="flex items-center gap-4 px-6 py-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 text-sm truncate">{o.customer_name}</div>
                      <div className="text-xs text-slate-400">{o.customer_phone} · {new Date(o.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                    <div className="text-xs text-slate-400 truncate flex-1 hidden sm:block">{o.product_name ?? (o.source === 'quiz' ? 'Подборщик' : 'Форма')}</div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${cfg.color}`}>{cfg.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Категории</h2>
            <Link href="/admin/categories" className="text-xs text-brand-600 hover:underline">Управлять →</Link>
          </div>
          <div className="divide-y divide-slate-50">
            {s.categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between px-6 py-2.5">
                <span className="text-sm text-slate-700 truncate">{cat.name}</span>
                <span className="text-sm font-semibold text-slate-900 ml-2 flex-shrink-0">{cat._count.products}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {[
          { label: 'Добавить товар', href: '/admin/products/new', color: 'text-brand-600 bg-brand-50 hover:bg-brand-100' },
          { label: 'Новые заявки', href: '/admin/orders?status=new', color: 'text-amber-600 bg-amber-50 hover:bg-amber-100' },
          { label: 'Добавить категорию', href: '/admin/categories', color: 'text-slate-600 bg-slate-50 hover:bg-slate-100' },
          { label: 'Настройки сайта', href: '/admin/settings', color: 'text-slate-600 bg-slate-50 hover:bg-slate-100' },
        ].map(({ label, href, color }) => (
          <Link key={href} href={href} className={`flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${color}`}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
