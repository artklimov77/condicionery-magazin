import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import FilterSidebar from '@/components/catalog/FilterSidebar'
import ProductCard from '@/components/catalog/ProductCard'
import SortSelect from '@/components/catalog/SortSelect'
import type { Category, Product } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Каталог кондиционеров',
  description: 'Широкий выбор кондиционеров от ведущих брендов. Фильтрация по площади, мощности, бренду и цене.',
}

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

async function getProducts(filters: Record<string, string>): Promise<Product[]> {
  try {
    let query = supabase.from('products').select('*').eq('available', true)

    if (filters.brand) query = query.eq('brand', filters.brand)
    if (filters.area) query = query.lte('area_max', Number(filters.area))
    if (filters.price_max) query = query.lte('price_unit', Number(filters.price_max))
    if (filters.inverter) query = query.eq('inverter', true)
    if (filters.wifi) query = query.eq('wifi', true)
    if (filters.heating) query = query.eq('heating', true)

    const sort = filters.sort ?? 'price_asc'
    if (sort === 'price_asc') query = query.order('price_unit', { ascending: true })
    else if (sort === 'price_desc') query = query.order('price_unit', { ascending: false })
    else if (sort === 'power') query = query.order('power_kw', { ascending: false })
    else query = query.order('created_at', { ascending: false })

    const { data } = await query.limit(60)
    return data ?? []
  } catch {
    return []
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await supabase.from('categories').select('*').order('sort_order')
    return data ?? []
  } catch {
    return []
  }
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const filters = await searchParams
  const [products, categories] = await Promise.all([getProducts(filters), getCategories()])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-1">Каталог кондиционеров</h1>
        <p className="text-slate-500">{products.length} моделей</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <Suspense fallback={null}>
          <FilterSidebar categories={categories} />
        </Suspense>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Sort bar */}
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
              <p className="text-slate-400">Попробуйте изменить фильтры или{' '}
                <a href="/catalog" className="text-brand-600 hover:underline">сбросьте их</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

