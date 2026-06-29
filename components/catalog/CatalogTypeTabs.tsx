'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const tabs = [
  { label: 'Все', slug: '' },
  { label: 'Кондиционеры', slug: 'bytovye-konditsionery' },
  { label: 'Мультисплит', slug: 'multisplit-sistemy' },
  { label: 'VRF системы', slug: 'vrf-sistemy' },
  { label: 'Полупромышленные', slug: 'polupromyshlennye-konditsionery' },
  { label: 'Тепловые насосы', slug: 'teplovye-nasosy' },
  { label: 'Чиллеры', slug: 'chillery' },
  { label: 'Фанкойлы', slug: 'fankoyly' },
  { label: 'Вентиляция', slug: 'ventilyaciya' },
  { label: 'Мобильные', slug: 'mobilnye-konditsionery' },
]

export default function CatalogTypeTabs() {
  const params = useSearchParams()
  const current = params.get('category') ?? ''

  const buildHref = (slug: string) => {
    const next = new URLSearchParams(params.toString())
    next.delete('product_type')
    if (slug) {
      next.set('category', slug)
    } else {
      next.delete('category')
    }
    next.delete('page')
    const qs = next.toString()
    return `/catalog${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="flex overflow-x-auto gap-2 pb-1 -mx-1 px-1 scrollbar-none">
      {tabs.map((tab) => {
        const active = current === tab.slug
        return (
          <Link
            key={tab.label}
            href={buildHref(tab.slug)}
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
