import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import OrderForm from '@/components/product/OrderForm'
import { formatPrice, getAreaLabel, getPowerLabel, getLeadLabel } from '@/lib/utils'
import type { Product } from '@/lib/types'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const { data } = await supabase
      .from('products')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .single()
    return data
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Товар не найден' }
  return {
    title: product.name,
    description: `${product.name} — мощность ${product.power_kw} кВт, площадь ${getAreaLabel(product)}. Цена ${formatPrice(product.price_unit)}.`,
  }
}

const featuresList = [
  { key: 'inverter', label: 'Инверторный' },
  { key: 'wifi', label: 'Wi-Fi управление' },
  { key: 'heating', label: 'Режим обогрева' },
  { key: 'air_purifier', label: 'Очистка воздуха' },
  { key: 'smart_home', label: 'Умный дом' },
]

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const currentPrice = product.promo_price ?? product.price_unit

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-brand-600">Главная</a>
        <span>›</span>
        <a href="/catalog" className="hover:text-brand-600">Каталог</a>
        <span>›</span>
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex items-center justify-center min-h-80">
          {product.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.images[0]} alt={product.name} className="max-h-72 object-contain" />
          ) : (
            <div className="text-slate-200 text-center">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" strokeWidth={0.75} viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="10" rx="2" />
                <rect x="7" y="17" width="2" height="3" />
                <rect x="15" y="17" width="2" height="3" />
              </svg>
              <p className="text-sm mt-2">Фото скоро добавим</p>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-brand-600">{product.brand}</span>
            {product.is_new && (
              <span className="px-2 py-0.5 rounded-md bg-brand-600 text-white text-xs font-semibold">Новинка</span>
            )}
            {product.promo_price && (
              <span className="px-2 py-0.5 rounded-md bg-red-500 text-white text-xs font-semibold">Акция</span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">{product.name}</h1>
          {product.model_number && (
            <p className="text-sm text-slate-400 mb-4">Арт.: {product.model_number}</p>
          )}

          {/* Key specs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { label: 'Мощность', value: getPowerLabel(product.power_kw) },
              { label: 'Площадь', value: getAreaLabel(product) },
              { label: 'Энергокласс', value: product.energy_class },
              { label: 'Шум (внутр.)', value: product.noise_indoor_db ? `${product.noise_indoor_db} дБ` : '—' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3">
                <div className="text-xs text-slate-400 mb-0.5">{label}</div>
                <div className="text-sm font-semibold text-slate-900">{value}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {featuresList.map(({ key, label }) =>
              (product as unknown as Record<string, unknown>)[key] ? (
                <span key={key} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-sm font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {label}
                </span>
              ) : null
            )}
          </div>

          {/* Lead time */}
          <div className="flex items-center gap-2 mb-5 text-sm text-slate-500">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            {getLeadLabel(product.lead_days)}
          </div>

          {/* Price */}
          <div className="mb-6">
            {product.promo_price && (
              <div className="text-slate-400 line-through text-base">{formatPrice(product.price_unit)}</div>
            )}
            <div className="text-3xl font-bold text-slate-900">{formatPrice(currentPrice)}</div>
            {product.price_install > 0 && (
              <div className="text-slate-400 text-sm mt-0.5">
                + монтаж {formatPrice(product.price_install)} (итого {formatPrice(currentPrice + product.price_install)})
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description + Order form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Description & specs */}
        <div>
          {product.description && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Описание</h2>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {Object.keys(product.specs ?? {}).length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Характеристики</h2>
              <div className="rounded-xl border border-slate-100 overflow-hidden">
                {Object.entries(product.specs).map(([key, val], i) => (
                  <div key={key} className={`flex justify-between px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <span className="text-slate-500">{key}</span>
                    <span className="font-medium text-slate-900">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order form */}
        <div id="order" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Оставить заявку</h2>
          <p className="text-sm text-slate-500 mb-6">Менеджер перезвонит в течение часа и уточнит детали</p>
          <OrderForm productId={product.id} productName={product.name} source="product" />
        </div>
      </div>
    </div>
  )
}
