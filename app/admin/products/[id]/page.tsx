import { db } from '@/lib/db'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: 'Редактировать товар' }

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params
  const product = await db.product.findUnique({ where: { id } })

  if (!product) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Редактировать: {product.name}</h1>
      <ProductForm product={product as unknown as import('@/lib/types').Product} />
    </div>
  )
}
