'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const sortOptions = [
  { value: 'price_asc', label: 'Цена: сначала дешевле' },
  { value: 'price_desc', label: 'Цена: сначала дороже' },
  { value: 'power', label: 'По мощности' },
  { value: 'new', label: 'Сначала новинки' },
]

export default function SortSelect({ current }: { current?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  function handleChange(value: string) {
    const next = new URLSearchParams(params.toString())
    next.set('sort', value)
    router.push(`${pathname}?${next.toString()}`)
  }

  return (
    <select
      defaultValue={current ?? 'price_asc'}
      onChange={(e) => handleChange(e.target.value)}
      className="text-sm border border-slate-200 rounded-lg px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500"
    >
      {sortOptions.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}
