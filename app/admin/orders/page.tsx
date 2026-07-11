import { db } from '@/lib/db'
import type { Metadata } from 'next'
import OrdersTable from '@/components/admin/OrdersTable'

export const metadata: Metadata = { title: 'Заявки' }

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

async function getOrders(status?: string) {
  return db.order.findMany({
    where: status ? { status } : undefined,
    orderBy: { created_at: 'desc' },
    take: 200,
  })
}

const statusLabels: Record<string, string> = {
  new: 'Новые',
  in_progress: 'В работе',
  done: 'Выполнены',
  cancelled: 'Отменены',
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const { status } = await searchParams
  const [orders, counts] = await Promise.all([
    getOrders(status),
    db.order.groupBy({ by: ['status'], _count: { _all: true } }),
  ])

  const countMap: Record<string, number> = {}
  for (const c of counts) countMap[c.status] = c._count._all

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Заявки</h1>
          <p className="text-sm text-slate-500 mt-0.5">Всего: {orders.length}</p>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[undefined, 'new', 'in_progress', 'done', 'cancelled'].map((s) => {
          const count = s ? countMap[s] ?? 0 : Object.values(countMap).reduce((a, b) => a + b, 0)
          return (
            <a
              key={s ?? 'all'}
              href={s ? `/admin/orders?status=${s}` : '/admin/orders'}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                status === s
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {s ? statusLabels[s] : 'Все'}
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${status === s ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                {count}
              </span>
            </a>
          )
        })}
      </div>

      <OrdersTable orders={orders as unknown as import('@/lib/types').Order[]} />
    </div>
  )
}
