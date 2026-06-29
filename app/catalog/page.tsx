import { Suspense } from 'react'
import { db } from '@/lib/db'
import FilterSidebar from '@/components/catalog/FilterSidebar'
import ProductCard from '@/components/catalog/ProductCard'
import SortSelect from '@/components/catalog/SortSelect'
import CatalogTypeTabs from '@/components/catalog/CatalogTypeTabs'
import type { Category, Product } from '@/lib/types'
import type { Metadata } from 'next'
import { Prisma } from '@prisma/client'

export const metadata: Metadata = {
  title: 'Каталог климатического оборудования',
  description: 'Кондиционеры, вентиляция, тепловые насосы, VRF-системы от ведущих брендов. Фильтрация по площади, мощности, бренду и цене.',
}

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

async function getProducts(filters: Record<string, string>): Promise<Product[]> {
  try {
    const where: Prisma.ProductWhereInput = { available: true }

    if (filters.brand) where.brand = filters.brand
    if (filters.category) where.category_id = filters.category
    if (filters.product_type) where.product_type = { contains: filters.product_type, mode: 'insensitive' }
    if (filters.area) where.area_max = { lte: Number(filters.area) }
    if (filters.price_max) where.price_unit = { lte: Number(filters.price_max) }
    if (filters.inverter) where.inverter = true
    if (filters.wifi) where.wifi = true
    if (filters.heating) where.heating = true

    const sort = filters.sort ?? 'price_asc'
    let orderBy: Prisma.ProductOrderByWithRelationInput = { price_unit: 'asc' }
    if (sort === 'price_desc') orderBy = { price_unit: 'desc' }
    else if (sort === 'power') orderBy = { power_kw: 'desc' }
    else if (sort === 'new') orderBy = { created_at: 'desc' }

    const data = await db.product.findMany({ where, orderBy, take: 60 })
    return data as unknown as Product[]
  } catch {
    return []
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const data = await db.category.findMany({ orderBy: { sort_order: 'asc' } })
    return data as unknown as Category[]
  } catch {
    return []
  }
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const filters = await searchParams
  const [products, categories] = await Promise.all([getProducts(filters), getCategories()])

  const selectedType = filters.product_type ?? ''
  const typeLabel = selectedType || 'Всё оборудование'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Каталог оборудования</h1>
        <p className="text-slate-500">{typeLabel} · {products.length} моделей</p>
      </div>

      {/* Type tabs */}
      <div className="mb-6">
        <Suspense fallback={null}>
          <CatalogTypeTabs />
        </Suspense>
      </div>

      {/* Not finding price note */}
      <div className="mb-6 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700">
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          Для VRF, чиллеров и промышленных систем цена формируется индивидуально.{' '}
          <a href="tel:+79001234567" className="font-semibold underline hover:no-underline">Позвоните</a> — рассчитаем под ваш объект.
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Suspense fallback={null}>
          <FilterSidebar categories={categories} />
        </Suspense>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-slate-500 hidden sm:block">
              Найдено: <b>{products.length}</b> моделей
            </div>
            <Suspense fallback={null}>
              <SortSelect current={filters.sort} />
            </Suspense>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg className="w-16 h-16 text-slate-200 mb-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">Ничего не найдено</h3>
              <p className="text-slate-400 mb-4">Попробуйте изменить фильтры или{' '}
                <a href="/catalog" className="text-brand-600 hover:underline">сбросьте их</a>
              </p>
              <a
                href="tel:+79001234567"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
              >
                Позвонить — подберём вручную
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
