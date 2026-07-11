import { db } from '@/lib/db'
import type { Metadata } from 'next'
import SettingsForm from '@/components/admin/SettingsForm'

export const metadata: Metadata = { title: 'Настройки' }

const defaultSettings: Record<string, string> = {
  phone: '+7 (900) 123-45-67',
  phone_href: '+79001234567',
  whatsapp: '+79001234567',
  email_info: 'info@nordic-air.ru',
  email_orders: 'manager@nordic-air.ru',
  address: 'Санкт-Петербург',
  hours: 'Пн–Пт 9:00–18:00',
  telegram: '',
}

export default async function SettingsPage() {
  const rows = await db.content.findMany()
  const saved: Record<string, string> = {}
  for (const r of rows) saved[r.key] = r.value

  const settings = { ...defaultSettings, ...saved }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Настройки сайта</h1>
        <p className="text-slate-500 text-sm mt-1">Изменения применяются мгновенно — без перезапуска</p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  )
}
