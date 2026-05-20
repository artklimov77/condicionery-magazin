import ProductForm from '@/components/admin/ProductForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Новый товар' }

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Новый товар</h1>
      <ProductForm />
    </div>
  )
}
