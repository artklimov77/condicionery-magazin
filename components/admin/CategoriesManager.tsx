'use client'

import { useState } from 'react'
import type { Category } from '@/lib/types'

type CategoryWithCount = Category & { _count: { products: number } }

interface Props {
  categories: CategoryWithCount[]
}

const emptyForm = { name: '', slug: '', description: '', sort_order: '0' }

export default function CategoriesManager({ categories: initial }: Props) {
  const [categories, setCategories] = useState(initial)
  const [editing, setEditing] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const autoSlug = (name: string) =>
    name.toLowerCase()
      .replace(/[а]/g, 'a').replace(/[б]/g, 'b').replace(/[в]/g, 'v').replace(/[г]/g, 'g')
      .replace(/[д]/g, 'd').replace(/[е]/g, 'e').replace(/[ж]/g, 'zh').replace(/[з]/g, 'z')
      .replace(/[и]/g, 'i').replace(/[й]/g, 'y').replace(/[к]/g, 'k').replace(/[л]/g, 'l')
      .replace(/[м]/g, 'm').replace(/[н]/g, 'n').replace(/[о]/g, 'o').replace(/[п]/g, 'p')
      .replace(/[р]/g, 'r').replace(/[с]/g, 's').replace(/[т]/g, 't').replace(/[у]/g, 'u')
      .replace(/[ф]/g, 'f').replace(/[х]/g, 'h').replace(/[ц]/g, 'c').replace(/[ч]/g, 'ch')
      .replace(/[ш]/g, 'sh').replace(/[щ]/g, 'sch').replace(/[ъь]/g, '').replace(/[э]/g, 'e')
      .replace(/[ю]/g, 'yu').replace(/[я]/g, 'ya').replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')

  const startEdit = (cat: CategoryWithCount) => {
    setCreating(false)
    setEditing(cat.id)
    setForm({ name: cat.name, slug: cat.slug, description: cat.description ?? '', sort_order: cat.sort_order.toString() })
  }

  const startCreate = () => {
    setEditing(null)
    setCreating(true)
    setForm(emptyForm)
  }

  const cancel = () => { setEditing(null); setCreating(false) }

  const handleSave = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    const body = { name: form.name, slug: form.slug || autoSlug(form.name), description: form.description || null, sort_order: parseInt(form.sort_order) || 0 }
    try {
      if (creating) {
        const res = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        const created = await res.json()
        setCategories([...categories, { ...created, _count: { products: 0 } }])
        setCreating(false)
      } else if (editing) {
        await fetch(`/api/admin/categories/${editing}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        setCategories(categories.map((c) => c.id === editing ? { ...c, ...body } : c))
        setEditing(null)
      }
    } catch {
      alert('Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, name: string, count: number) => {
    if (count > 0 && !confirm(`В категории "${name}" есть ${count} товаров. Они потеряют категорию. Удалить?`)) return
    if (count === 0 && !confirm(`Удалить категорию "${name}"?`)) return
    setDeleting(id)
    try {
      await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
      setCategories(categories.filter((c) => c.id !== id))
    } catch {
      alert('Ошибка удаления')
    } finally {
      setDeleting(null)
    }
  }

  const inp = 'w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500'

  return (
    <div className="space-y-4">
      {/* Create form */}
      {creating && (
        <div className="bg-brand-50 rounded-2xl border border-brand-100 p-5">
          <h3 className="font-semibold text-slate-800 mb-4">Новая категория</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Название *</label>
              <input type="text" value={form.name} onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value, slug: autoSlug(e.target.value) })) }} className={inp} placeholder="Кондиционеры" autoFocus />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Slug (URL)</label>
              <input type="text" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inp} placeholder="konditsionery" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Описание</label>
              <input type="text" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inp} placeholder="Краткое описание..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Порядок сортировки</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))} className={inp} />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-60">
              {saving ? 'Создаём...' : 'Создать'}
            </button>
            <button onClick={cancel} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50">Отмена</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <span className="text-sm text-slate-500">Категории товаров</span>
          <button onClick={startCreate} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Добавить
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="py-12 text-center text-slate-400">Категорий ещё нет</div>
        ) : (
          <div className="divide-y divide-slate-50">
            {categories.map((cat) => (
              <div key={cat.id}>
                {editing === cat.id ? (
                  <div className="px-6 py-4 bg-brand-50/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Название</label>
                        <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inp} autoFocus />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Slug</label>
                        <input type="text" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inp} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Описание</label>
                        <input type="text" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inp} />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Порядок</label>
                        <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))} className={inp} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 disabled:opacity-60">
                        {saving ? 'Сохраняем...' : 'Сохранить'}
                      </button>
                      <button onClick={cancel} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm hover:bg-slate-50">Отмена</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                      {cat.sort_order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900">{cat.name}</div>
                      <div className="text-xs text-slate-400">/catalog?category={cat.slug} · {cat.description ?? 'без описания'}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold text-slate-700">{cat._count.products} товаров</span>
                      <button onClick={() => startEdit(cat)} className="text-brand-600 hover:underline text-sm font-medium">Изменить</button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name, cat._count.products)}
                        disabled={deleting === cat.id}
                        className="text-red-400 hover:text-red-600 text-sm disabled:opacity-60"
                      >
                        {deleting === cat.id ? '...' : 'Удалить'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
