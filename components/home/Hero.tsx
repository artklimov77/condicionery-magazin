import Link from 'next/link'

const whyItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    color: 'text-amber-400 bg-amber-400/10',
    text: 'Неправильно подобранная мощность — это деньги на ветер. Слабый не потянет, мощный будет гонять попусту.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    color: 'text-blue-400 bg-blue-400/10',
    text: 'Без профессионального монтажа гарантия производителя не действует. Любая ошибка — за ваш счёт.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    color: 'text-purple-400 bg-purple-400/10',
    text: 'VRF, канальный, кассетный или мультисплит — разные системы для разных объектов. Ошибка дорогостоящая.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-green-400 bg-green-400/10',
    text: 'Мы подбираем под ваш объект, согласуем проект и берём ответственность за результат.',
  },
]

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left column */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              Санкт-Петербург и область
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 sm:mb-6">
              Климатическое оборудование под любой объект
            </h1>

            <p className="text-base sm:text-xl text-blue-100 leading-relaxed mb-3 sm:mb-4">
              Кондиционеры, вентиляция, тепловые насосы, VRF-системы. Поможем подобрать, закупим у поставщика по оптовой цене и смонтируем.
            </p>

            <p className="text-sm sm:text-base text-blue-200 leading-relaxed mb-7 sm:mb-8">
              Не знаете что выбрать? Это нормально — климатика сложнее, чем кажется. Позвоните или пройдите подборщик — разберёмся вместе бесплатно.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a
                href="tel:+79001234567"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-brand-900 font-bold text-base sm:text-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +7 (900) 123-45-67
              </a>
              <Link
                href="/quiz"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-accent font-bold text-base sm:text-lg hover:bg-amber-600 transition-colors"
              >
                Пройти подборщик
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-xs sm:max-w-sm">
              {[
                { value: '5 000+', label: 'Позиций в каталоге' },
                { value: '15+', label: 'Брендов' },
                { value: 'Бесплатно', label: 'Консультация' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-lg sm:text-xl font-bold text-white">{value}</div>
                  <div className="text-xs text-blue-200 mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — desktop */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-lg font-bold text-white mb-6">Почему нельзя просто заказать онлайн?</h2>
              <div className="space-y-5">
                {whyItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      {item.icon}
                    </div>
                    <p className="text-sm text-blue-100 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              <a
                href="tel:+79001234567"
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-brand-900 font-bold hover:bg-blue-50 transition-colors"
              >
                Получить консультацию бесплатно
              </a>
            </div>
          </div>

          {/* Right column — mobile (simplified) */}
          <div className="lg:hidden">
            <div className="bg-white/10 rounded-2xl p-5 border border-white/15">
              <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wide">Почему важно проконсультироваться?</h2>
              <div className="space-y-3">
                {whyItems.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      {item.icon}
                    </div>
                    <p className="text-xs text-blue-100 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
