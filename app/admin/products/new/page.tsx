import { db } from '@/lib/db'
import ProductForm from '@/components/admin/ProductForm'
import type { Metadata } from 'next'
import type { Category } from '@/lib/types'

export const metadata: Metadata = { title: 'Новый товар' }

export default async function NewProductPage() {
  const categories = await db.category.findMany({ orderBy: { sort_order: 'asc' } })

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Новый товар</h1>
      <ProductForm categories={categories as unknown as Category[]} />
    </div>
  )
}
