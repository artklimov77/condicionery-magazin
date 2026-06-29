import Link from 'next/link'

const topics = [
  'Как рассчитать нужную мощность по площади',
  'Чем отличается инверторный от обычного',
  'Когда нужен мультисплит, а когда VRF',
  'На что влияет класс энергоэффективности',
  'Как правильно выбрать место для монтажа',
]

export default function GuideBanner() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-10">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-3">Полезно перед покупкой</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Гайд по выбору климатического оборудования
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Климатика — это не просто «подул холод». Неверный выбор мощности, типа системы или места монтажа обходится дорого. Разбираем всё по шагам.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/guide"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
                >
                  Читать гайд
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="tel:+79001234567"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-200 text-brand-700 font-semibold hover:bg-brand-50 transition-colors"
                >
                  Или просто позвоните
                </a>
              </div>
            </div>

            <div className="bg-brand-50 p-8 lg:p-10">
              <h3 className="font-bold text-slate-800 mb-5">В гайде разберём:</h3>
              <ul className="space-y-3">
                {topics.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-slate-600">
                    <svg className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white rounded-xl border border-brand-100">
                <p className="text-xs text-slate-500 mb-1">Хотите быстрее?</p>
                <p className="text-sm font-semibold text-slate-800">Позвоните — объясним за 5 минут и подберём конкретную модель</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
