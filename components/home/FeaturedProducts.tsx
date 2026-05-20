import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/catalog/ProductCard'
import type { Product } from '@/lib/types'

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('available', true)
      .eq('is_featured', true)
      .limit(6)
    return data ?? []
  } catch {
    return []
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-2">Популярные модели</p>
            <h2 className="text-3xl font-bold text-slate-900">Часто выбирают</h2>
          </div>
          <Link
            href="/catalog"
            className="hidden sm:flex items-center gap-1 text-brand-600 font-semibold text-sm hover:underline"
          >
            Весь каталог
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <p>Каталог скоро пополнится</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-brand-600 text-brand-600 font-semibold hover:bg-brand-600 hover:text-white transition-colors"
          >
            Смотреть все модели
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
