'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Product, Category } from '@/lib/types'

interface Props {
  product?: Partial<Product>
  categories?: Category[]
}

const brands = ['Daikin', 'Mitsubishi Electric', 'LG', 'Samsung', 'Midea', 'Haier', 'Gree', 'Pioneer', 'Ballu', 'Aux', 'Daichi', 'Kentatsu', 'Bosch', 'Fujitsu', 'TOSOT', 'Lessar', 'Axioma']
const energyClasses = ['A', 'A+', 'A++', 'A+++', 'B', 'C']

export default function ProductForm({ product, categories = [] }: Props) {
  const router = useRouter()
  const isEdit = !!product?.id

  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    brand: product?.brand ?? 'Daikin',
    category_id: product?.category_id ?? '',
    model_number: product?.model_number ?? '',
    product_type: product?.product_type ?? 'кондиционер',
    power_kw: product?.power_kw?.toString() ?? '2.5',
    area_min: product?.area_min?.toString() ?? '',
    area_max: product?.area_max?.toString() ?? '25',
    energy_class: product?.energy_class ?? 'A+',
    noise_indoor_db: product?.noise_indoor_db?.toString() ?? '',
    noise_outdoor_db: product?.noise_outdoor_db?.toString() ?? '',
    inverter: product?.inverter ?? true,
    wifi: product?.wifi ?? false,
    heating: product?.heating ?? true,
    air_purifier: product?.air_purifier ?? false,
    smart_home: product?.smart_home ?? false,
    price_unit: product?.price_unit?.toString() ?? '0',
    promo_price: product?.promo_price?.toString() ?? '',
    price_install: product?.price_install?.toString() ?? '18000',
    lead_days: product?.lead_days?.toString() ?? '7',
    description: product?.description ?? '',
    available: product?.available ?? true,
    is_featured: product?.is_featured ?? false,
    is_new: product?.is_new ?? false,
    is_promo: product?.is_promo ?? false,
  })

  const [images, setImages] = useState<string[]>(product?.images ?? [])
  const [newImage, setNewImage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }))

  const autoSlug = (name: string) =>
    name.toLowerCase()
      .replace(/[аa]/g, 'a').replace(/[бb]/g, 'b').replace(/[вv]/g, 'v')
      .replace(/[гg]/g, 'g').replace(/[дd]/g, 'd').replace(/[еe]/g, 'e')
      .replace(/[жj]/g, 'zh').replace(/[зz]/g, 'z').replace(/[иi]/g, 'i')
      .replace(/[кk]/g, 'k').replace(/[лl]/g, 'l').replace(/[мm]/g, 'm')
      .replace(/[нn]/g, 'n').replace(/[оo]/g, 'o').replace(/[пp]/g, 'p')
      .replace(/[рr]/g, 'r').replace(/[сs]/g, 's').replace(/[тt]/g, 't')
      .replace(/[уu]/g, 'u').replace(/[фf]/g, 'f').replace(/[хh]/g, 'h')
      .replace(/[цc]/g, 'c').replace(/[чch]/g, 'ch').replace(/[шsh]/g, 'sh')
      .replace(/[ъъь]/g, '').replace(/[эe]/g, 'e').replace(/[юyu]/g, 'yu')
      .replace(/[яya]/g, 'ya').replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

  const addImage = () => {
    const url = newImage.trim()
    if (url && !images.includes(url)) {
      setImages([...images, url])
      setNewImage('')
    }
  }

  const removeImage = (url: string) => setImages(images.filter((i) => i !== url))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const payload = {
      name: form.name,
      slug: form.slug || autoSlug(form.name),
      brand: form.brand,
      category_id: form.category_id || null,
      model_number: form.model_number || null,
      product_type: form.product_type,
      power_kw: parseFloat(form.power_kw) || 0,
      area_min: form.area_min ? parseInt(form.area_min) : null,
      area_max: parseInt(form.area_max) || 0,
      energy_class: form.energy_class,
      noise_indoor_db: form.noise_indoor_db ? parseInt(form.noise_indoor_db) : null,
      noise_outdoor_db: form.noise_outdoor_db ? parseInt(form.noise_outdoor_db) : null,
      inverter: form.inverter,
      wifi: form.wifi,
      heating: form.heating,
      air_purifier: form.air_purifier,
      smart_home: form.smart_home,
      price_unit: parseInt(form.price_unit) || 0,
      promo_price: form.promo_price ? parseInt(form.promo_price) : null,
      price_install: parseInt(form.price_install) || 0,
      lead_days: parseInt(form.lead_days) || 7,
      description: form.description || null,
      images,
      available: form.available,
      is_featured: form.is_featured,
      is_new: form.is_new,
      is_promo: form.is_promo,
    }

    try {
      const url = isEdit ? `/api/admin/products/${product!.id}` : '/api/admin/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

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

  const inp = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition'
  const lbl = 'block text-xs font-semibold text-slate-600 mb-1'
  const card = 'bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-5'

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      {/* Basic info */}
      <div className={card}>
        <h2 className="font-semibold text-slate-800 mb-5">Основная информация</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={lbl}>Название *</label>
            <input required type="text" value={form.name} onChange={(e) => { set('name', e.target.value); if (!isEdit) set('slug', autoSlug(e.target.value)) }} className={inp} placeholder="Daikin FTXB25C" />
          </div>
          <div>
            <label className={lbl}>Slug (URL)</label>
            <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)} className={inp} placeholder="daikin-ftxb25c" />
          </div>
          <div>
            <label className={lbl}>Артикул / Model</label>
            <input type="text" value={form.model_number} onChange={(e) => set('model_number', e.target.value)} className={inp} />
          </div>
          <div>
            <label className={lbl}>Бренд *</label>
            <select required value={form.brand} onChange={(e) => set('brand', e.target.value)} className={inp}>
              {brands.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Категория</label>
            <select value={form.category_id} onChange={(e) => set('category_id', e.target.value)} className={inp}>
              <option value="">— Без категории —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={lbl}>Тип оборудования</label>
            <input type="text" value={form.product_type} onChange={(e) => set('product_type', e.target.value)} className={inp} placeholder="кондиционер" />
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className={card}>
        <h2 className="font-semibold text-slate-800 mb-5">Технические характеристики</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className={lbl}>Мощность, кВт</label>
            <input type="number" step="0.1" min="0" max="100" value={form.power_kw} onChange={(e) => set('power_kw', e.target.value)} className={inp} />
          </div>
          <div>
            <label className={lbl}>Площадь от, м²</label>
            <input type="number" min="0" max="1000" value={form.area_min} onChange={(e) => set('area_min', e.target.value)} className={inp} placeholder="—" />
          </div>
          <div>
            <label className={lbl}>Площадь до, м²</label>
            <input type="number" min="0" max="5000" value={form.area_max} onChange={(e) => set('area_max', e.target.value)} className={inp} />
          </div>
          <div>
            <label className={lbl}>Класс энергоэфф.</label>
            <select value={form.energy_class} onChange={(e) => set('energy_class', e.target.value)} className={inp}>
              {energyClasses.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Шум внутр., дБ</label>
            <input type="number" min="20" max="70" value={form.noise_indoor_db} onChange={(e) => set('noise_indoor_db', e.target.value)} className={inp} placeholder="—" />
          </div>
          <div>
            <label className={lbl}>Шум наружн., дБ</label>
            <input type="number" min="20" max="80" value={form.noise_outdoor_db} onChange={(e) => set('noise_outdoor_db', e.target.value)} className={inp} placeholder="—" />
          </div>
        </div>

        <div className="mt-4">
          <label className={lbl}>Функции</label>
          <div className="flex flex-wrap gap-4">
            {[
              { key: 'inverter', label: 'Инверторный' },
              { key: 'wifi', label: 'Wi-Fi' },
              { key: 'heating', label: 'Обогрев' },
              { key: 'air_purifier', label: 'Очистка воздуха' },
              { key: 'smart_home', label: 'Умный дом' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form[key as keyof typeof form] as boolean} onChange={(e) => set(key, e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-brand-600" />
                <span className="text-sm text-slate-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Price */}
      <div className={card}>
        <h2 className="font-semibold text-slate-800 mb-5">Цена и логистика</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Цена оборудования, ₽ <span className="text-slate-400 font-normal">(0 = цена по запросу)</span></label>
            <input type="number" min="0" value={form.price_unit} onChange={(e) => set('price_unit', e.target.value)} className={inp} placeholder="0" />
          </div>
          <div>
            <label className={lbl}>Акционная цена, ₽ <span className="text-slate-400 font-normal">(необязательно)</span></label>
            <input type="number" min="0" value={form.promo_price} onChange={(e) => set('promo_price', e.target.value)} className={inp} placeholder="—" />
          </div>
          <div>
            <label className={lbl}>Цена монтажа, ₽</label>
            <input type="number" min="0" value={form.price_install} onChange={(e) => set('price_install', e.target.value)} className={inp} />
          </div>
          <div>
            <label className={lbl}>Срок поставки, дней</label>
            <input type="number" min="1" max="90" value={form.lead_days} onChange={(e) => set('lead_days', e.target.value)} className={inp} />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className={card}>
        <h2 className="font-semibold text-slate-800 mb-4">Фотографии</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="url"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className={`${inp} flex-1`}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
          />
          <button type="button" onClick={addImage} className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors whitespace-nowrap">
            Добавить
          </button>
        </div>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {images.map((url) => (
              <div key={url} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-24 w-24 object-cover rounded-xl border border-slate-100" onError={(e) => (e.currentTarget.src = '')} />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        {images.length === 0 && <p className="text-sm text-slate-400">Фото не добавлено</p>}
      </div>

      {/* Description */}
      <div className={card}>
        <h2 className="font-semibold text-slate-800 mb-4">Описание</h2>
        <textarea rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} className={inp} placeholder="Краткое описание модели..." />
      </div>

      {/* Flags */}
      <div className={card}>
        <h2 className="font-semibold text-slate-800 mb-4">Флаги и видимость</h2>
        <div className="flex flex-wrap gap-5">
          {[
            { key: 'available', label: 'Активен (виден в каталоге)' },
            { key: 'is_featured', label: 'Показывать на главной' },
            { key: 'is_new', label: 'Новинка' },
            { key: 'is_promo', label: 'Акция' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form[key as keyof typeof form] as boolean} onChange={(e) => set(key, e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-brand-600" />
              <span className="text-sm text-slate-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {error && <div className="mb-4 p-4 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={status === 'loading'} className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors">
          {status === 'loading' ? 'Сохраняем...' : isEdit ? 'Сохранить изменения' : 'Создать товар'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
          Отмена
        </button>
        {isEdit && (
          <a href={`/catalog/${product?.slug}`} target="_blank" className="text-sm text-brand-600 hover:underline ml-2">
            Посмотреть на сайте →
          </a>
        )}
      </div>
    </form>
  )
}
