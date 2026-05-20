'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/lib/types'

interface Props {
  product?: Partial<Product>
}

const brands = ['Daikin', 'Mitsubishi Electric', 'LG', 'Samsung', 'Haier', 'Gree', 'Pioneer', 'Ballu', 'Aux']
const energyClasses = ['A', 'A+', 'A++', 'A+++']

export default function ProductForm({ product }: Props) {
  const router = useRouter()
  const isEdit = !!product?.id

  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    brand: product?.brand ?? 'Daikin',
    model_number: product?.model_number ?? '',
    power_kw: product?.power_kw?.toString() ?? '2.5',
    area_max: product?.area_max?.toString() ?? '25',
    energy_class: product?.energy_class ?? 'A+',
    noise_indoor_db: product?.noise_indoor_db?.toString() ?? '',
    inverter: product?.inverter ?? true,
    wifi: product?.wifi ?? false,
    heating: product?.heating ?? true,
    air_purifier: product?.air_purifier ?? false,
    price_unit: product?.price_unit?.toString() ?? '',
    price_install: product?.price_install?.toString() ?? '18000',
    lead_days: product?.lead_days?.toString() ?? '7',
    description: product?.description ?? '',
    available: product?.available ?? true,
    is_featured: product?.is_featured ?? false,
    is_new: product?.is_new ?? false,
    is_promo: product?.is_promo ?? false,
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }))

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9а-яё]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const payload = {
      name: form.name,
      slug: form.slug || autoSlug(form.name),
      brand: form.brand,
      model_number: form.model_number,
      power_kw: parseFloat(form.power_kw),
      area_max: parseInt(form.area_max),
      energy_class: form.energy_class,
      noise_indoor_db: form.noise_indoor_db ? parseInt(form.noise_indoor_db) : null,
      inverter: form.inverter,
      wifi: form.wifi,
      heating: form.heating,
      air_purifier: form.air_purifier,
      price_unit: parseInt(form.price_unit),
      price_install: parseInt(form.price_install) || 0,
      lead_days: parseInt(form.lead_days) || 7,
      description: form.description,
      available: form.available,
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_promo: form.is_promo,
    }

    try {
      const url = isEdit ? `/api/admin/products/${product!.id}` : '/api/admin/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Ошибка сохранения')
      }

      setStatus('success')
      router.push('/admin/products')
      router.refresh()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    }
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition'
  const labelClass = 'block text-xs font-semibold text-slate-600 mb-1'

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-5">Основная информация</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelClass}>Название *</label>
            <input required type="text" value={form.name} onChange={(e) => { set('name', e.target.value); if (!isEdit) set('slug', autoSlug(e.target.value)) }} className={inputClass} placeholder="Daikin FTXB25C" />
          </div>
          <div>
            <label className={labelClass}>Slug (URL)</label>
            <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inputClass} placeholder="daikin-ftxb25c" />
          </div>
          <div>
            <label className={labelClass}>Артикул / Model Number</label>
            <input type="text" value={form.model_number} onChange={(e) => set('model_number', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Бренд *</label>
            <select required value={form.brand} onChange={(e) => set('brand', e.target.value)} className={inputClass}>
              {brands.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-5">Технические характеристики</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className={labelClass}>Мощность, кВт *</label>
            <input required type="number" step="0.1" min="0.5" max="30" value={form.power_kw} onChange={(e) => set('power_kw', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Площадь макс., м² *</label>
            <input required type="number" min="5" max="500" value={form.area_max} onChange={(e) => set('area_max', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Класс энергоэфф.</label>
            <select value={form.energy_class} onChange={(e) => set('energy_class', e.target.value)} className={inputClass}>
              {energyClasses.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Шум внутр., дБ</label>
            <input type="number" min="20" max="60" value={form.noise_indoor_db} onChange={(e) => set('noise_indoor_db', e.target.value)} className={inputClass} placeholder="38" />
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClass}>Функции</label>
          <div className="flex flex-wrap gap-4">
            {[
              { key: 'inverter', label: 'Инверторный' },
              { key: 'wifi', label: 'Wi-Fi' },
              { key: 'heating', label: 'Режим обогрева' },
              { key: 'air_purifier', label: 'Очистка воздуха' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[key as keyof typeof form] as boolean}
                  onChange={(e) => set(key, e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-brand-600"
                />
                <span className="text-sm text-slate-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-5">Цена и логистика</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Цена оборудования, ₽ *</label>
            <input required type="number" min="0" value={form.price_unit} onChange={(e) => set('price_unit', e.target.value)} className={inputClass} placeholder="35000" />
          </div>
          <div>
            <label className={labelClass}>Цена монтажа, ₽</label>
            <input type="number" min="0" value={form.price_install} onChange={(e) => set('price_install', e.target.value)} className={inputClass} placeholder="18000" />
          </div>
          <div>
            <label className={labelClass}>Срок поставки, дней</label>
            <input type="number" min="1" max="60" value={form.lead_days} onChange={(e) => set('lead_days', e.target.value)} className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-5">Описание</h2>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          className={inputClass}
          placeholder="Краткое описание модели..."
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <h2 className="font-semibold text-slate-800 mb-4">Флаги витрины</h2>
        <div className="flex flex-wrap gap-5">
          {[
            { key: 'available', label: 'Товар активен (виден в каталоге)' },
            { key: 'is_featured', label: 'Показывать на главной' },
            { key: 'is_new', label: 'Новинка' },
            { key: 'is_promo', label: 'Акция' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form[key as keyof typeof form] as boolean}
                onChange={(e) => set(key, e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-brand-600"
              />
              <span className="text-sm text-slate-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors"
        >
          {status === 'loading' ? 'Сохраняем...' : isEdit ? 'Сохранить изменения' : 'Создать товар'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
        >
          Отмена
        </button>
      </div>
    </form>
  )
}
