import Link from 'next/link'
import type { Product } from '@/lib/types'
import { formatPrice, getAreaLabel } from '@/lib/utils'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const currentPrice = product.promo_price ?? product.price_unit

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Image */}
      <Link href={`/catalog/${product.slug}`} className="relative block aspect-[4/3] bg-slate-50">
        {product.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <rect x="3" y="7" width="18" height="10" rx="2" />
              <rect x="7" y="17" width="2" height="3" />
              <rect x="15" y="17" width="2" height="3" />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="px-2 py-0.5 rounded-md bg-brand-600 text-white text-xs font-semibold">Новинка</span>
          )}
          {product.promo_price && (
            <span className="px-2 py-0.5 rounded-md bg-red-500 text-white text-xs font-semibold">Акция</span>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-slate-400 font-medium mb-1">{product.brand}</div>
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="font-semibold text-slate-900 hover:text-brand-600 transition-colors line-clamp-2 mb-3">
            {product.name}
          </h3>
        </Link>

        {/* Key specs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs">
            {product.power_kw} кВт
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs">
            {getAreaLabel(product)}
          </span>
          {product.inverter && (
            <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-xs">Инвертор</span>
          )}
          {product.wifi && (
            <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-xs">Wi-Fi</span>
          )}
        </div>

        {/* Lead time */}
        <div className="flex items-center gap-1.5 mb-4">
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
          <span className="text-xs text-slate-500">
            Поставка {product.lead_days <= 7 ? `${product.lead_days} дней` : '1–2 недели'}
          </span>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className="mb-3">
            {product.promo_price && (
              <div className="text-xs text-slate-400 line-through">{formatPrice(product.price_unit)}</div>
            )}
            <div className="text-xl font-bold text-slate-900">
              {formatPrice(currentPrice)}
            </div>
            {product.price_install > 0 && (
              <div className="text-xs text-slate-400">+ монтаж {formatPrice(product.price_install)}</div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              href={`/catalog/${product.slug}`}
              className="flex-1 text-center py-2.5 rounded-xl border border-brand-600 text-brand-600 text-sm font-semibold hover:bg-brand-600 hover:text-white transition-colors"
            >
              Подробнее
            </Link>
            <Link
              href={`/catalog/${product.slug}#order`}
              className="flex-1 text-center py-2.5 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
            >
              Заказать
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
