import Link from 'next/link'

const topics = [
  'Что такое BTU и как рассчитать мощность',
  'Инверторный vs обычный — в чём разница',
  'Класс энергоэффективности A, A+, A++',
  'Сплит-система vs мультисплит',
]

export default function GuideBanner() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left */}
            <div className="p-8 lg:p-10">
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-3">Полезно знать</p>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Гайд по выбору кондиционера
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                Кондиционер — дорогая и долгосрочная покупка. Разберём главные параметры на примерах,
                чтобы вы точно знали за что платите.
              </p>
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition-colors"
              >
                Читать гайд
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Right */}
            <div className="bg-brand-50 p-8 lg:p-10">
              <h3 className="font-semibold text-slate-800 mb-4">В гайде разберём:</h3>
              <ul className="space-y-3">
                {topics.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-slate-600">
                    <svg className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
