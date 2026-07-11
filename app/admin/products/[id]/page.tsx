import { db } from '@/lib/db'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Category, Product } from '@/lib/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: 'Редактировать товар' }

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    db.product.findUnique({ where: { id } }),
    db.category.findMany({ orderBy: { sort_order: 'asc' } }),
  ])

  if (!product) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Редактировать товар</h1>
      <p className="text-slate-500 text-sm mb-8">{product.name}</p>
      <ProductForm
        product={product as unknown as Product}
        categories={categories as unknown as Category[]}
      />
    </div>
  )
}
