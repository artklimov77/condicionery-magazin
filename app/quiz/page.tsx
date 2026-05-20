'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

const IconApartment = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
)

const IconHouse = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
  </svg>
)

const IconOffice = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
  </svg>
)

const IconWarehouse = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
)

const IconBolt = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)

const IconSilent = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
)

const IconWifi = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
  </svg>
)

const IconFire = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
  </svg>
)

const IconFilter = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
)

const IconStar = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

interface Option {
  value: string
  label: string
  desc?: string
  icon?: ReactNode
}

interface Step {
  id: string
  question: string
  multi?: boolean
  options: Option[]
}

const steps: Step[] = [
  {
    id: 'room_type',
    question: 'Что будем охлаждать?',
    options: [
      { value: 'apartment', label: 'Квартира', icon: <IconApartment /> },
      { value: 'house', label: 'Загородный дом', icon: <IconHouse /> },
      { value: 'office', label: 'Офис / магазин', icon: <IconOffice /> },
      { value: 'warehouse', label: 'Производство / склад', icon: <IconWarehouse /> },
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
      { value: 'Экономия электроэнергии', label: 'Экономия электроэнергии', icon: <IconBolt /> },
      { value: 'Тихая работа', label: 'Тихая работа', icon: <IconSilent /> },
      { value: 'Wi-Fi управление', label: 'Wi-Fi / приложение', icon: <IconWifi /> },
      { value: 'Режим обогрева зимой', label: 'Обогрев зимой', icon: <IconFire /> },
      { value: 'Очистка и фильтрация', label: 'Очистка воздуха', icon: <IconFilter /> },
      { value: 'Известный бренд', label: 'Известный бренд', icon: <IconStar /> },
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Заявка принята!</h2>
          <p className="text-slate-500 mb-6">
            Менеджер перезвонит в течение часа с подборкой подходящих моделей под ваши параметры.
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
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-xl w-full">
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
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{current.question}</h2>
            {current.multi && (
              <p className="text-sm text-slate-400 mb-4">Можно выбрать несколько</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {current.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => selectOption(opt.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected(opt.value)
                      ? 'border-brand-600 bg-brand-50 text-brand-900'
                      : 'border-slate-200 hover:border-brand-300 text-slate-700'
                  }`}
                >
                  {opt.icon && (
                    <span className={`flex-shrink-0 ${isSelected(opt.value) ? 'text-brand-600' : 'text-slate-400'}`}>
                      {opt.icon}
                    </span>
                  )}
                  <div>
                    <div className="font-semibold text-sm">{opt.label}</div>
                    {opt.desc && <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Назад
                </button>
              ) : <div />}

              {current.multi && (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!((answers[current.id] as string[])?.length > 0)}
                  className="flex items-center gap-1 px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 disabled:opacity-40 transition-colors"
                >
                  Далее
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Почти готово!</h2>
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
                <p className="text-sm text-red-600">Ошибка отправки. Попробуйте снова.</p>
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

            <button onClick={() => setStep(step - 1)} className="mt-4 flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Назад
            </button>
          </>
        )}
      </div>
    </div>
  )
}
