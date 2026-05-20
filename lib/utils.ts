export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}

export function getAreaLabel(product: { area_min?: number; area_max: number }): string {
  if (product.area_min) return `${product.area_min}–${product.area_max} м²`
  return `до ${product.area_max} м²`
}

export function getPowerLabel(kw: number): string {
  const btu = Math.round(kw * 3412)
  return `${kw} кВт (${Math.round(btu / 1000)} BTU)`
}

export function getLeadLabel(days: number): string {
  if (days <= 3) return 'Поставка 1–3 дня'
  if (days <= 7) return `Поставка ${days} дней`
  if (days <= 14) return `Поставка 1–2 недели`
  return `Поставка ~${Math.round(days / 7)} нед.`
}

export function classNames(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
