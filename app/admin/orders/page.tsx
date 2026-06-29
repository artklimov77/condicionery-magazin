import { db } from '@/lib/db'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import type { Order } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Заявки' }

async function getOrders(status?: string): Promise<Order[]> {
  try {
    const data = await db.order.findMany({
      where: status ? { status } : undefined,
      orderBy: { created_at: 'desc' },
      take: 100,
    })
    return data as unknown as Order[]
  } catch {
    return []
  }
}

const statusLabels: Record<string, string> = {
  new: 'Новые',
  in_progress: 'В работе',
  done: 'Выполнены',
  cancelled: 'Отменены',
}

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams
  const status = params.status
  const orders = await getOrders(status)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Заявки</h1>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[undefined, 'new', 'in_progress', 'done', 'cancelled'].map((s) => (
          <a
            key={s ?? 'all'}
            href={s ? `/admin/orders?status=${s}` : '/admin/orders'}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              status === s
                ? 'bg-brand-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {s ? statusLabels[s] : 'Все'}
          </a>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center text-slate-400">
          Нет заявок
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['Дата', 'Клиент', 'Телефон', 'Товар / источник', 'Статус'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString('ru-RU', {
                        day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{order.customer_name}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${order.customer_phone}`} className="text-brand-600 hover:underline">
                        {order.customer_phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {order.product_name ?? (
                        <span className="italic text-slate-300">
                          {order.source === 'quiz' ? 'Подборщик' : 'Контакты'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <OrderStatusBadge orderId={order.id} status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
