const steps = [
  {
    num: '01',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Заявка или звонок',
    desc: 'Опишите задачу: тип объекта, площадь, пожелания. Или просто позвоните — всё узнаем в разговоре.',
  },
  {
    num: '02',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Бесплатный подбор',
    desc: 'Менеджер перезвонит в течение часа, изучит объект и предложит оптимальное решение с конкретными моделями.',
  },
  {
    num: '03',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Закупка у поставщика',
    desc: 'Работаем напрямую с крупными дистрибьюторами — Daichi, Русклимат, WAFE. Никаких посредников.',
  },
  {
    num: '04',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Монтаж и гарантия',
    desc: 'Профессиональная установка в удобное время. Гарантия на оборудование и монтаж. Сервисное обслуживание.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-2">Как мы работаем</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">От заявки до готового климата</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Берём на себя всё — от подбора оборудования до монтажа. Вам остаётся только наслаждаться результатом.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative flex flex-col">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-1/2 w-full h-px bg-gradient-to-r from-brand-200 to-transparent" />
              )}
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-brand-600 flex items-center justify-center mb-4 text-white shadow-lg shadow-brand-200">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-brand-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-900">Готовы начать?</p>
            <p className="text-sm text-slate-500">Звонок бесплатный, консультация ни к чему не обязывает</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="tel:+79001234567"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Позвонить сейчас
            </a>
            <a href="/quiz" className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-600 text-brand-600 font-semibold text-sm hover:bg-brand-600 hover:text-white transition-colors">
              Пройти подборщик
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
