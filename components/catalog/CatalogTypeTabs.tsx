'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const tabs = [
  { label: 'Все', type: '' },
  { label: 'Кондиционеры', type: 'Бытовые кондиционеры' },
  { label: 'Мультисплит', type: 'Мультисплит-системы' },
  { label: 'VRF', type: 'VRF-системы' },
  { label: 'Полупромышленные', type: 'Полупромышленные' },
  { label: 'Чиллеры', type: 'Чиллеры' },
  { label: 'Фанкойлы', type: 'Фанкойлы' },
  { label: 'Вентиляция', type: 'Вентиляция' },
]

export default function CatalogTypeTabs() {
  const params = useSearchParams()
  const current = params.get('product_type') ?? ''

  const buildHref = (type: string) => {
    const next = new URLSearchParams(params.toString())
    if (type) {
      next.set('product_type', type)
    } else {
      next.delete('product_type')
    }
    next.delete('page')
    const qs = next.toString()
    return `/catalog${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="flex overflow-x-auto gap-2 pb-1 -mx-1 px-1 scrollbar-none">
      {tabs.map((tab) => {
        const active = current === tab.type
        return (
          <Link
            key={tab.label}
            href={buildHref(tab.type)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              active
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700'
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
