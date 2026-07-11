import { db } from '@/lib/db'
import Link from 'next/link'
import { formatPrice, getAreaLabel } from '@/lib/utils'
import type { Product, Category } from '@/lib/types'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProductsTable from '@/components/admin/ProductsTable'
import { Prisma } from '@prisma/client'

export const metadata: Metadata = { title: 'Товары' }

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

async function getData(filters: Record<string, string>) {
  const where: Prisma.ProductWhereInput = {}

  if (filters.q) {
    where.OR = [
      { name: { contains: filters.q, mode: 'insensitive' } },
      { brand: { contains: filters.q, mode: 'insensitive' } },
      { model_number: { contains: filters.q, mode: 'insensitive' } },
    ]
  }
  if (filters.category) where.category = { slug: filters.category }
  if (filters.brand) where.brand = { contains: filters.brand, mode: 'insensitive' }
  if (filters.available === 'true') where.available = true
  if (filters.available === 'false') where.available = false
  if (filters.price === 'zero') where.price_unit = 0
  if (filters.price === 'set') where.price_unit = { gt: 0 }

  const page = Math.max(1, parseInt(filters.page ?? '1'))
  const perPage = 50

  const [products, total, categories] = await Promise.all([
    db.product.findMany({
      where,
      include: { category: true },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    db.product.count({ where }),
    db.category.findMany({ orderBy: { sort_order: 'asc' } }),
  ])

  return { products, total, categories, page, perPage, totalPages: Math.ceil(total / perPage) }
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const filters = await searchParams
  const { products, total, categories, page, perPage, totalPages } = await getData(filters)

  const buildUrl = (overrides: Record<string, string>) => {
    const p = { ...filters, ...overrides }
    const qs = Object.entries(p)
      .filter(([, v]) => v !== '')
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&')
    return `/admin/products${qs ? `?${qs}` : ''}`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Товары</h1>
          <p className="text-sm text-slate-500 mt-0.5">Найдено: {total} · страница {page} из {totalPages}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          Добавить
        </Link>
      </div>

      {/* Filters */}
      <form method="GET" action="/admin/products" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-5 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Поиск</label>
          <input
            name="q"
            defaultValue={filters.q ?? ''}
            placeholder="Название, бренд, артикул..."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
        <div className="min-w-40">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Категория</label>
          <select name="category" defaultValue={filters.category ?? ''} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">Все категории</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="min-w-36">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Цена</label>
          <select name="price" defaultValue={filters.price ?? ''} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">Все</option>
            <option value="set">Есть цена</option>
            <option value="zero">Цена по запросу</option>
          </select>
        </div>
        <div className="min-w-32">
          <label className="block text-xs font-semibold text-slate-500 mb-1">Статус</label>
          <select name="available" defaultValue={filters.available ?? ''} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option value="">Все</option>
            <option value="true">Активные</option>
            <option value="false">Скрытые</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors">
            Найти
          </button>
          <Link href="/admin/products" className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors">
            Сброс
          </Link>
        </div>
      </form>

      {/* Table */}
      <Suspense fallback={null}>
        <ProductsTable products={products as unknown as (Product & { category?: Category })[]} />
      </Suspense>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {page > 1 && (
            <Link href={buildUrl({ page: String(page - 1) })} className="px-4 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50 transition-colors">
              ← Назад
            </Link>
          )}
          <span className="text-sm text-slate-500 px-4">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link href={buildUrl({ page: String(page + 1) })} className="px-4 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50 transition-colors">
              Вперёд →
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
