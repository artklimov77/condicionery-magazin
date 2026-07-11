'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatPrice, getAreaLabel } from '@/lib/utils'
import type { Product, Category } from '@/lib/types'

interface Props {
  products: (Product & { category?: Category })[]
}

export default function ProductsTable({ products }: Props) {
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)
  const [localProducts, setLocalProducts] = useState(products)

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Удалить товар "${name}"?`)) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setLocalProducts((p) => p.filter((x) => x.id !== id))
      } else {
        alert('Ошибка удаления')
      }
    } catch {
      alert('Ошибка удаления')
    } finally {
      setDeleting(null)
    }
  }

  const handleToggle = async (id: string, available: boolean) => {
    setToggling(id)
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !available }),
      })
      if (res.ok) {
        setLocalProducts((p) => p.map((x) => x.id === id ? { ...x, available: !x.available } : x))
      }
    } catch {
      alert('Ошибка')
    } finally {
      setToggling(null)
    }
  }

  if (localProducts.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center text-slate-400">
        <p className="mb-3">Ничего не найдено</p>
        <Link href="/admin/products" className="text-brand-600 hover:underline text-sm">Сбросить фильтры</Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {['Товар', 'Категория', 'Цена', 'Статус', 'Действия'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {localProducts.map((p) => (
              <tr key={p.id} className={`hover:bg-slate-50/50 transition-colors ${!p.available ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3 max-w-xs">
                  <div className="font-medium text-slate-900 truncate">{p.name}</div>
                  <div className="text-xs text-slate-400">{p.brand} · {p.model_number}</div>
                  {p.images?.[0] && (
                    <div className="mt-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt="" className="h-8 w-auto rounded object-contain" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                  {p.category?.name ?? '—'}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">
                  {(p.promo_price ?? p.price_unit) > 0
                    ? formatPrice(p.promo_price ?? p.price_unit)
                    : <span className="text-slate-400 font-normal text-xs">По запросу</span>
                  }
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleToggle(p.id, p.available)}
                      disabled={toggling === p.id}
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                        p.available
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      } ${toggling === p.id ? 'opacity-60' : ''}`}
                    >
                      {toggling === p.id ? '...' : p.available ? 'Активен' : 'Скрыт'}
                    </button>
                    {p.is_featured && <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-xs">На главной</span>}
                    {p.is_new && <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs">Новинка</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-brand-600 hover:underline font-medium text-xs"
                    >
                      Изменить
                    </Link>
                    <Link
                      href={`/catalog/${p.slug}`}
                      target="_blank"
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ↗
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={deleting === p.id}
                      className="text-red-400 hover:text-red-600 text-xs disabled:opacity-60"
                    >
                      {deleting === p.id ? '...' : 'Удалить'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
