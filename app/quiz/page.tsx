'use client'

import { useState } from 'react'

const steps = [
  {
    id: 'room_type',
    question: 'Что будем охлаждать?',
    options: [
      { value: 'apartment', label: 'Квартира', icon: '🏠' },
      { value: 'house', label: 'Загородный дом', icon: '🏡' },
      { value: 'office', label: 'Офис / магазин', icon: '🏢' },
      { value: 'warehouse', label: 'Производство / склад', icon: '🏭' },
    ],
  },
  {
    id: 'area_range',
    question: 'Какая площадь помещения?',
    options: [
      { value: 'до 20 м²', label: 'до 20 м²', desc: 'небольшая комната' },
      { value: '20–30 м²', label: '20–30 м²', desc: 'средняя комната' },
      { value: '30–50 м²', label: '30–50 м²', desc: 'большая комната / зал' },
      { value: '50–80 м²', label: '50–80 м²', desc: 'открытое пространство' },
      { value: 'более 80 м²', label: 'более 80 м²', desc: 'большое помещение' },
    ],
  },
  {
    id: 'budget_range',
    question: 'Бюджет на оборудование?',
    options: [
      { value: 'до 25 000 ₽', label: 'до 25 000 ₽', desc: 'бюджетные модели' },
      { value: '25 000–40 000 ₽', label: '25–40 тыс. ₽', desc: 'оптимальное соотношение' },
      { value: '40 000–60 000 ₽', label: '40–60 тыс. ₽', desc: 'комфорт-класс' },
      { value: 'от 60 000 ₽', label: 'от 60 000 ₽', desc: 'премиальные бренды' },
    ],
  },
  {
    id: 'priorities',
    question: 'Что важно в первую очередь?',
    multi: true,
    options: [
      { value: 'Экономия электроэнергии', label: 'Экономия электроэнергии', icon: '⚡' },
      { value: 'Тихая работа', label: 'Тихая работа', icon: '🔇' },
      { value: 'Wi-Fi управление', label: 'Wi-Fi / приложение', icon: '📱' },
      { value: 'Режим обогрева зимой', label: 'Обогрев зимой', icon: '🔥' },
      { value: 'Очистка и фильтрация', label: 'Очистка воздуха', icon: '🌿' },
      { value: 'Известный бренд', label: 'Известный бренд', icon: '⭐' },
    ],
  },
]

type Answers = Record<string, string | string[]>

export default function QuizPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [form, setForm] = useState({ name: '', phone: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const current = steps[step]
  const isLast = step === steps.length - 1
  const isFormStep = step === steps.length

  const selectOption = (value: string) => {
    if (current.multi) {
      const prev = (answers[current.id] as string[]) ?? []
      const next = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      setAnswers({ ...answers, [current.id]: next })
    } else {
      setAnswers({ ...answers, [current.id]: value })
      setTimeout(() => setStep(step + 1), 200)
    }
  }

  const isSelected = (value: string) => {
    const ans = answers[current?.id]
    if (!ans) return false
    if (Array.isArray(ans)) return ans.includes(value)
    return ans === value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          source: 'quiz',
          quiz_data: {
            room_type: answers.room_type,
            area_range: answers.area_range,
            budget_range: answers.budget_range,
            priorities: answers.priorities ?? [],
          },
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-900 to-brand-700 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Отлично!</h2>
          <p className="text-slate-500 mb-6">
            Мы получили ваши ответы. Менеджер перезвонит в течение часа с подборкой подходящих моделей.
          </p>
          <a href="/catalog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors">
            Смотреть каталог
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 to-brand-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-brand-600' : 'bg-slate-100'
              }`}
            />
          ))}
        </div>

        {!isFormStep ? (
          <>
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">
              Шаг {step + 1} из {steps.length}
            </p>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{current.question}</h2>
            {current.multi && (
              <p className="text-sm text-slate-400 mb-4">Можно выбрать несколько</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectOption(opt.value)}
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected(opt.value)
                      ? 'border-brand-600 bg-brand-50 text-brand-900'
                      : 'border-slate-200 hover:border-brand-300 text-slate-700'
                  }`}
                >
                  {'icon' in opt && <span className="text-2xl">{opt.icon}</span>}
                  <div>
                    <div className="font-semibold text-sm">{opt.label}</div>
                    {'desc' in opt && <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="text-sm text-slate-400 hover:text-slate-600">
                  ← Назад
                </button>
              ) : <div />}

              {current.multi && (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!((answers[current.id] as string[])?.length > 0)}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 disabled:opacity-40 transition-colors"
                >
                  Далее →
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Почти готово!</h2>
            <p className="text-slate-500 mb-6">
              Оставьте контакт — менеджер перезвонит с готовой подборкой под ваши параметры.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                required
                placeholder="Ваше имя"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
              <input
                type="tel"
                required
                placeholder="+7 (900) 000-00-00"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />

              {status === 'error' && (
                <p className="text-sm text-red-600">Ошибка. Попробуйте снова.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 rounded-xl bg-accent text-white font-bold text-base hover:bg-amber-600 disabled:opacity-60 transition-colors"
              >
                {status === 'loading' ? 'Отправляем...' : 'Получить подборку'}
              </button>

              <p className="text-xs text-slate-400 text-center">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>

            <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-slate-400 hover:text-slate-600">
              ← Назад
            </button>
          </>
        )}
      </div>
    </div>
  )
}
