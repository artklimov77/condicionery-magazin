import { db } from '@/lib/db'
import type { Metadata } from 'next'
import CategoriesManager from '@/components/admin/CategoriesManager'

export const metadata: Metadata = { title: 'Категории' }

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { sort_order: 'asc' },
    include: { _count: { select: { products: true } } },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Категории</h1>
          <p className="text-sm text-slate-500 mt-0.5">{categories.length} категорий</p>
        </div>
      </div>
      <CategoriesManager categories={categories as unknown as (import('@/lib/types').Category & { _count: { products: number } })[]} />
    </div>
  )
}
