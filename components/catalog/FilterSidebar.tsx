'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import type { Category } from '@/lib/types'

interface Props {
  categories: Category[]
}

const brands = ['Daikin', 'Mitsubishi Electric', 'LG', 'Samsung', 'Haier', 'Gree', 'Pioneer', 'Ballu', 'Aux']
const areas = [
  { label: 'до 20 м²', value: '20' },
  { label: 'до 30 м²', value: '30' },
  { label: 'до 50 м²', value: '50' },
  { label: 'до 80 м²', value: '80' },
]
const priceRanges = [
  { label: 'до 25 000 ₽', max: '25000' },
  { label: '25 000 – 40 000 ₽', max: '40000' },
  { label: '40 000 – 60 000 ₽', max: '60000' },
  { label: 'от 60 000 ₽', min: '60000' },
]

export default function FilterSidebar({ categories }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const update = useCallback((key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString())
    if (value === null || next.get(key) === value) {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    next.delete('page')
    router.push(`${pathname}?${next.toString()}`)
  }, [params, pathname, router])

  const active = (key: string, val: string) => params.get(key) === val

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-20">
        <h2 className="font-semibold text-slate-900 mb-5">Фильтры</h2>

        {/* Category */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Тип</h3>
          <div className="flex flex-col gap-1">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => update('category', c.slug)}
                className={`text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active('category', c.slug)
                    ? 'bg-brand-600 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Бренд</h3>
          <div className="flex flex-wrap gap-1.5">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => update('brand', b)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  active('brand', b)
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Area */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Площадь помещения</h3>
          <div className="flex flex-col gap-1">
            {areas.map((a) => (
              <button
                key={a.value}
                onClick={() => update('area', a.value)}
                className={`text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active('area', a.value)
                    ? 'bg-brand-600 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Цена оборудования</h3>
          <div className="flex flex-col gap-1">
            {priceRanges.map((p) => (
              <button
                key={p.max ?? p.min}
                onClick={() => update('price_max', p.max ?? null)}
                className={`text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  active('price_max', p.max ?? '')
                    ? 'bg-brand-600 text-white font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Функции</h3>
          <div className="flex flex-col gap-2">
            {[
              { key: 'inverter', label: 'Инверторный' },
              { key: 'wifi', label: 'Wi-Fi управление' },
              { key: 'heating', label: 'Режим обогрева' },
            ].map((f) => (
              <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={params.has(f.key)}
                  onChange={() => update(f.key, params.has(f.key) ? null : '1')}
                  className="w-4 h-4 rounded border-slate-300 text-brand-600 cursor-pointer"
                />
                <span className="text-sm text-slate-600">{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset */}
        {params.size > 0 && (
          <button
            onClick={() => router.push(pathname)}
            className="mt-5 w-full py-2 rounded-lg text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Сбросить фильтры
          </button>
        )}
      </div>
    </aside>
  )
}
