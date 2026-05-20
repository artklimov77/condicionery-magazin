'use client'

import { useState } from 'react'

const statusConfig = {
  new: { label: 'Новая', color: 'bg-amber-100 text-amber-800' },
  in_progress: { label: 'В работе', color: 'bg-blue-100 text-blue-800' },
  done: { label: 'Выполнена', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Отменена', color: 'bg-slate-100 text-slate-500' },
}

interface Props {
  orderId: string
  status: string
}

export default function OrderStatusBadge({ orderId, status: initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus)
  const [loading, setLoading] = useState(false)

  const cfg = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.new

  const changeStatus = async (next: string) => {
    setLoading(true)
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: next }),
      })
      setStatus(next)
    } catch {
      alert('Ошибка обновления')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative group inline-block">
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${cfg.color} ${loading ? 'opacity-60' : ''}`}>
        {cfg.label}
      </span>
      <div className="hidden group-hover:block absolute top-full left-0 mt-1 z-10 bg-white rounded-xl border border-slate-200 shadow-lg py-1 min-w-32">
        {Object.entries(statusConfig).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => changeStatus(key)}
            className={`block w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition-colors ${key === status ? 'font-semibold text-brand-600' : 'text-slate-700'}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
