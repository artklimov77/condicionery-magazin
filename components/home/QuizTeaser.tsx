import Link from 'next/link'

export default function QuizTeaser() {
  return (
    <section className="py-16 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-widest mb-3">Не знаете что выбрать?</p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Подберём кондиционер за 2 минуты
          </h2>
          <p className="text-blue-200 text-lg leading-relaxed mb-8">
            Ответьте на 4 вопроса — площадь, бюджет, тип помещения и приоритеты.
            Менеджер перезвонит с готовой подборкой конкретных моделей.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent font-bold text-lg text-white hover:bg-amber-600 transition-colors"
            >
              Начать подбор
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/guide"
              className="flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white/30 font-semibold text-white hover:border-white hover:bg-white/10 transition-colors"
            >
              Хочу разобраться сам
            </Link>
          </div>

          {/* Steps preview */}
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            {['Тип помещения', 'Площадь', 'Бюджет', 'Приоритеты'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 text-sm text-blue-100">
                  <span className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </div>
                {i < 3 && (
                  <svg className="hidden sm:block w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
