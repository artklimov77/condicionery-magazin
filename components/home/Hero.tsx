import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Работаем с крупными поставщиками
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-balance mb-6">
            Кондиционер под ваш запрос — без переплат
          </h1>

          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Подберём нужную модель, закупим у поставщика по оптовой цене и доставим с монтажом.
            Не знаете что выбрать — пройдите подборщик за 2 минуты.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/quiz"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-accent font-bold text-lg hover:bg-amber-600 transition-colors"
            >
              Подобрать кондиционер
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/catalog"
              className="flex items-center justify-center px-7 py-4 rounded-xl border-2 border-white/40 font-semibold text-lg hover:border-white hover:bg-white/10 transition-colors"
            >
              Смотреть каталог
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            {[
              { value: '8+', label: 'Ведущих брендов' },
              { value: '100+', label: 'Моделей в каталоге' },
              { value: '5–10 дн.', label: 'Срок поставки' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-blue-200 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
