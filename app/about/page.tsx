import Link from 'next/link'
import type { Metadata } from 'next'
import { getContent, cms } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'О компании — Nordic Air',
  description: 'Nordic Air — интернет-магазин климатической техники в Санкт-Петербурге. Работаем напрямую с поставщиками.',
}

const stats = [
  { value: '8+', label: 'Ведущих брендов' },
  { value: '5000+', label: 'Моделей в каталоге' },
  { value: 'СПб', label: 'и Лен. область' },
  { value: '5–14 дн.', label: 'Средний срок поставки' },
]

const valueIcons = [
  <svg key="money" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="idea" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  <svg key="shield" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  <svg key="lock" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>,
]

export default async function AboutPage() {
  const content = await getContent()
  const c = (key: string) => cms(content, key)

  const values = [
    { title: c('about_val1_title'), desc: c('about_val1_desc') },
    { title: c('about_val2_title'), desc: c('about_val2_desc') },
    { title: c('about_val3_title'), desc: c('about_val3_desc') },
    { title: c('about_val4_title'), desc: c('about_val4_desc') },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-3">О компании</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-balance">{c('about_title')}</h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">{c('about_lead')}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        {stats.map((s) => (
          <div key={s.label} className="bg-brand-50 rounded-2xl p-5 text-center">
            <div className="text-2xl font-bold text-brand-700 mb-1">{s.value}</div>
            <div className="text-sm text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">{c('about_how1_title')}</h2>
          <p className="text-slate-600 leading-relaxed mb-4">{c('about_how1_p1')}</p>
          <p className="text-slate-600 leading-relaxed">{c('about_how1_p2')}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">{c('about_how2_title')}</h2>
          <p className="text-slate-600 leading-relaxed mb-4">{c('about_how2_p1')}</p>
          <p className="text-slate-600 leading-relaxed">{c('about_how2_p2')}</p>
        </div>
      </div>

      <div className="mb-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Наши принципы</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
                {valueIcons[i]}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-50 rounded-2xl p-7 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-3">Наши поставщики</h2>
        <p className="text-slate-600 leading-relaxed">{c('about_suppliers')}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/quiz" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-bold text-base hover:bg-amber-600 transition-colors">
          Подобрать оборудование
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
        <Link href="/contacts" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-slate-300 text-slate-700 font-semibold text-base hover:border-brand-600 hover:text-brand-600 transition-colors">
          Связаться с нами
        </Link>
      </div>
    </div>
  )
}
