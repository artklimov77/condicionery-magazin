import { db } from '@/lib/db'
import Link from 'next/link'
import { formatPrice, getAreaLabel } from '@/lib/utils'
import type { Product } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Товары' }

async function getProducts(): Promise<Product[]> {
  try {
    const data = await db.product.findMany({
      orderBy: { created_at: 'desc' },
    })
    return data as unknown as Product[]
  } catch {
    return []
  }
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Товары ({products.length})</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Добавить товар
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {['Товар', 'Бренд', 'Тип', 'Площадь', 'Цена', 'Статус', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{p.name}</div>
                    <div className="text-xs text-slate-400">{p.model_number}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.brand}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{p.product_type}</td>
                  <td className="px-4 py-3 text-slate-500">{getAreaLabel(p)}</td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{formatPrice(p.promo_price ?? p.price_unit)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {p.available ? (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Активен</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs">Скрыт</span>
                      )}
                      {p.is_featured && (
                        <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs">Featured</span>
                      )}
                      {p.is_new && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs">Новинка</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-brand-600 hover:underline font-medium text-xs"
                    >
                      Редактировать
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            <p className="mb-3">Товаров ещё нет</p>
            <Link href="/admin/products/new" className="text-brand-600 hover:underline text-sm">
              Добавить первый товар →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
