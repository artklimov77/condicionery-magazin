'use client'

import { useState } from 'react'

interface Props {
  settings: Record<string, string>
}

const fields = [
  { section: 'Контакты', items: [
    { key: 'phone', label: 'Телефон (отображение)', placeholder: '+7 (999) 123-45-67', hint: 'Как отображается на сайте' },
    { key: 'phone_href', label: 'Телефон (для ссылки)', placeholder: '+79991234567', hint: 'Без пробелов, скобок и тире' },
    { key: 'whatsapp', label: 'WhatsApp номер', placeholder: '+79991234567', hint: 'Для кнопки WhatsApp' },
    { key: 'telegram', label: 'Telegram', placeholder: '@nordic_air_spb', hint: 'Username без @' },
    { key: 'email_info', label: 'Email (общий)', placeholder: 'info@nordic-air.ru' },
    { key: 'email_orders', label: 'Email (для заявок)', placeholder: 'manager@nordic-air.ru', hint: 'Куда приходят уведомления о заявках' },
  ]},
  { section: 'Адрес и режим работы', items: [
    { key: 'address', label: 'Адрес', placeholder: 'Санкт-Петербург, ул. Примерная, 1' },
    { key: 'hours', label: 'Часы работы', placeholder: 'Пн–Пт 9:00–18:00, Сб 10:00–15:00' },
  ]},
]

export default function SettingsForm({ settings: initial }: Props) {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const handleSave = async () => {
    setStatus('saving')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
    }
  }

  const inp = 'w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500'
  const lbl = 'block text-xs font-semibold text-slate-600 mb-1'

  return (
    <div className="max-w-2xl space-y-5">
      {fields.map(({ section, items }) => (
        <div key={section} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-semibold text-slate-800 mb-5">{section}</h2>
          <div className="space-y-4">
            {items.map(({ key, label, placeholder, hint }) => (
              <div key={key}>
                <label className={lbl}>{label}</label>
                <input
                  type="text"
                  value={form[key] ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className={inp}
                />
                {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 transition-colors"
        >
          {status === 'saving' ? 'Сохраняем...' : 'Сохранить настройки'}
        </button>
        {status === 'saved' && (
          <span className="text-green-600 text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Сохранено
          </span>
        )}
        {status === 'error' && <span className="text-red-500 text-sm">Ошибка сохранения</span>}
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-sm text-amber-700">
        <strong>Важно:</strong> телефон на сайте берётся из настроек при первой загрузке страницы. После изменения номера обновите страницу.
      </div>
    </div>
  )
}
