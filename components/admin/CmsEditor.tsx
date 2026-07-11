'use client'

import { useState, useCallback } from 'react'
import { DEFAULTS, type CMS } from '@/lib/cms'

interface Props {
  initial: CMS
}

type Section = {
  label: string
  fields: { key: string; label: string; multiline?: boolean }[]
}

const sections: Section[] = [
  {
    label: 'Контакты',
    fields: [
      { key: 'phone', label: 'Телефон (отображение)' },
      { key: 'phone_href', label: 'Телефон (для href, без пробелов)' },
      { key: 'whatsapp', label: 'WhatsApp (только цифры, напр. 79001234567)' },
      { key: 'email_info', label: 'Email (общий)' },
      { key: 'email_orders', label: 'Email (заявки)' },
      { key: 'address', label: 'Адрес' },
      { key: 'hours', label: 'Режим работы (краткий)' },
      { key: 'telegram', label: 'Telegram (username без @)' },
    ],
  },
  {
    label: 'Главная страница',
    fields: [
      { key: 'hero_eyebrow', label: 'Надпись над заголовком' },
      { key: 'hero_title', label: 'Главный заголовок' },
      { key: 'hero_subtitle', label: 'Подзаголовок', multiline: true },
    ],
  },
  {
    label: 'О компании',
    fields: [
      { key: 'about_title', label: 'Заголовок страницы' },
      { key: 'about_lead', label: 'Лид (первый абзац)', multiline: true },
      { key: 'about_how1_title', label: 'Блок 1 — заголовок' },
      { key: 'about_how1_p1', label: 'Блок 1 — абзац 1', multiline: true },
      { key: 'about_how1_p2', label: 'Блок 1 — абзац 2', multiline: true },
      { key: 'about_how2_title', label: 'Блок 2 — заголовок' },
      { key: 'about_how2_p1', label: 'Блок 2 — абзац 1', multiline: true },
      { key: 'about_how2_p2', label: 'Блок 2 — абзац 2', multiline: true },
      { key: 'about_val1_title', label: 'Принцип 1 — заголовок' },
      { key: 'about_val1_desc', label: 'Принцип 1 — описание', multiline: true },
      { key: 'about_val2_title', label: 'Принцип 2 — заголовок' },
      { key: 'about_val2_desc', label: 'Принцип 2 — описание', multiline: true },
      { key: 'about_val3_title', label: 'Принцип 3 — заголовок' },
      { key: 'about_val3_desc', label: 'Принцип 3 — описание', multiline: true },
      { key: 'about_val4_title', label: 'Принцип 4 — заголовок' },
      { key: 'about_val4_desc', label: 'Принцип 4 — описание', multiline: true },
      { key: 'about_suppliers', label: 'Поставщики (текст)', multiline: true },
    ],
  },
  {
    label: 'Страница Контактов',
    fields: [
      { key: 'contacts_hours1', label: 'Часы работы — строка 1' },
      { key: 'contacts_hours2', label: 'Часы работы — строка 2' },
      { key: 'contacts_hours3', label: 'Часы работы — строка 3 (выходной)' },
    ],
  },
  {
    label: 'Доставка',
    fields: [
      { key: 'delivery_card1_title', label: 'Карточка 1 — заголовок' },
      { key: 'delivery_card1_body', label: 'Карточка 1 — текст', multiline: true },
      { key: 'delivery_card2_title', label: 'Карточка 2 — заголовок' },
      { key: 'delivery_card2_body', label: 'Карточка 2 — текст', multiline: true },
      { key: 'delivery_card3_title', label: 'Карточка 3 — заголовок' },
      { key: 'delivery_card3_body', label: 'Карточка 3 — текст', multiline: true },
      { key: 'delivery_card4_title', label: 'Карточка 4 — заголовок' },
      { key: 'delivery_card4_body', label: 'Карточка 4 — текст', multiline: true },
    ],
  },
]

export default function CmsEditor({ initial }: Props) {
  const [values, setValues] = useState<CMS>({ ...DEFAULTS, ...initial })
  const [active, setActive] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = useCallback((key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    setSaved(false)
  }, [])

  const save = async () => {
    setSaving(true)
    const section = sections[active]
    const payload: CMS = {}
    for (const f of section.fields) payload[f.key] = values[f.key] ?? ''
    try {
      await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  const section = sections[active]

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-6 border-b border-slate-200">
        {sections.map((s, i) => (
          <button
            key={s.label}
            onClick={() => { setActive(i); setSaved(false) }}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium whitespace-nowrap transition-colors ${
              i === active
                ? 'bg-white border border-b-white border-slate-200 text-slate-900 -mb-px'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="space-y-5 max-w-2xl">
        {section.fields.map((f) => (
          <div key={f.key}>
            <label className="block text-sm font-medium text-slate-700 mb-1">{f.label}</label>
            <div className="text-xs text-slate-400 mb-1 font-mono">{f.key}</div>
            {f.multiline ? (
              <textarea
                rows={3}
                value={values[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
                placeholder={DEFAULTS[f.key] ?? ''}
              />
            ) : (
              <input
                type="text"
                value={values[f.key] ?? ''}
                onChange={(e) => set(f.key, e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder={DEFAULTS[f.key] ?? ''}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 bg-brand-600 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Сохраняем...' : 'Сохранить раздел'}
        </button>
        {saved && (
          <span className="text-sm text-green-600 font-medium flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Сохранено
          </span>
        )}
      </div>
    </div>
  )
}
