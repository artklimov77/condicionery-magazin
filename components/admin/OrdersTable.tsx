'use client'

import { useState } from 'react'
import type { Order } from '@/lib/types'

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'Новая', color: 'bg-amber-100 text-amber-800' },
  in_progress: { label: 'В работе', color: 'bg-blue-100 text-blue-800' },
  done: { label: 'Выполнена', color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Отменена', color: 'bg-slate-100 text-slate-500' },
}

interface Props {
  orders: Order[]
}

export default function OrdersTable({ orders: initial }: Props) {
  const [orders, setOrders] = useState(initial)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [savingNote, setSavingNote] = useState<string | null>(null)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  const changeStatus = async (id: string, status: string) => {
    setUpdatingStatus(id)
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      setOrders((o) => o.map((x) => x.id === id ? { ...x, status } : x))
    } catch {
      alert('Ошибка обновления')
    } finally {
      setUpdatingStatus(null)
    }
  }

  const saveNote = async (id: string) => {
    setSavingNote(id)
    try {
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, manager_notes: notes[id] ?? '' }),
      })
    } catch {
      alert('Ошибка')
    } finally {
      setSavingNote(null)
    }
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center text-slate-400">
        Нет заявок
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {orders.map((order) => {
        const cfg = statusConfig[order.status] ?? statusConfig.new
        const isOpen = expanded === order.id
        const quizData = order.quiz_data as Record<string, unknown> | null

        return (
          <div key={order.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Row */}
            <div
              className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
              onClick={() => setExpanded(isOpen ? null : order.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-slate-900 text-sm">{order.customer_name}</span>
                  <a href={`tel:${order.customer_phone}`} onClick={(e) => e.stopPropagation()} className="text-brand-600 text-sm hover:underline">
                    {order.customer_phone}
                  </a>
                </div>
                <div className="text-xs text-slate-400 mt-0.5 truncate">
                  {new Date(order.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  {' · '}
                  {order.product_name ?? (order.source === 'quiz' ? 'Подборщик' : order.source === 'contact' ? 'Страница контактов' : 'Форма')}
                </div>
              </div>

              {/* Status dropdown */}
              <div className="relative group flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer ${cfg.color} ${updatingStatus === order.id ? 'opacity-60' : ''}`}>
                  {cfg.label}
                </span>
                <div className="hidden group-hover:block absolute right-0 top-full mt-1 z-10 bg-white rounded-xl border border-slate-200 shadow-lg py-1 min-w-36">
                  {Object.entries(statusConfig).map(([key, { label }]) => (
                    <button
                      key={key}
                      onClick={() => changeStatus(order.id, key)}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-slate-50 transition-colors ${key === order.status ? 'font-semibold text-brand-600' : 'text-slate-700'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <svg className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>

            {/* Expanded */}
            {isOpen && (
              <div className="border-t border-slate-100 px-5 py-4 bg-slate-50/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {order.customer_email && (
                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-0.5">Email</div>
                      <a href={`mailto:${order.customer_email}`} className="text-sm text-brand-600 hover:underline">{order.customer_email}</a>
                    </div>
                  )}
                  {order.comment && (
                    <div className="sm:col-span-2">
                      <div className="text-xs font-semibold text-slate-500 mb-0.5">Комментарий клиента</div>
                      <p className="text-sm text-slate-700">{order.comment}</p>
                    </div>
                  )}
                  {order.product_name && (
                    <div>
                      <div className="text-xs font-semibold text-slate-500 mb-0.5">Товар</div>
                      <p className="text-sm text-slate-700">{order.product_name}</p>
                    </div>
                  )}
                  {quizData && (
                    <div className="sm:col-span-2">
                      <div className="text-xs font-semibold text-slate-500 mb-1">Данные из подборщика</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(quizData).map(([k, v]) => (
                          <span key={k} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg">
                            {k}: {Array.isArray(v) ? v.join(', ') : String(v)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Manager notes */}
                <div>
                  <div className="text-xs font-semibold text-slate-500 mb-1">Заметка менеджера</div>
                  <div className="flex gap-2">
                    <textarea
                      rows={2}
                      value={notes[order.id] ?? ((order as unknown as Record<string, string>).manager_notes ?? '')}
                      onChange={(e) => setNotes((n) => ({ ...n, [order.id]: e.target.value }))}
                      placeholder="Добавить заметку..."
                      className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                    <button
                      onClick={() => saveNote(order.id)}
                      disabled={savingNote === order.id}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 disabled:opacity-60 self-end"
                    >
                      {savingNote === order.id ? '...' : 'Сохранить'}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-slate-100">
                  <a href={`tel:${order.customer_phone}`} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Позвонить
                  </a>
                  <a href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`} target="_blank" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors">
                    WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
