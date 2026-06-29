import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Санкт-Петербург и область
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-balance mb-6">
              Климатическое оборудование под любой объект
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed mb-4">
              Кондиционеры, вентиляция, тепловые насосы, VRF-системы. Поможем подобрать, закупим у поставщика по оптовой цене и смонтируем.
            </p>

            <p className="text-base text-blue-200 leading-relaxed mb-8">
              Не знаете что выбрать? Это нормально — климатика сложнее, чем кажется. Позвоните или пройдите подборщик — разберёмся вместе бесплатно.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="tel:+79001234567"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white text-brand-900 font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +7 (900) 123-45-67
              </a>
              <Link
                href="/quiz"
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-accent font-bold text-lg hover:bg-amber-600 transition-colors"
              >
                Пройти подборщик
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-sm">
              {[
                { value: '5 000+', label: 'Позиций в каталоге' },
                { value: '15+', label: 'Брендов' },
                { value: 'Бесплатно', label: 'Консультация' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-xl font-bold text-white">{value}</div>
                  <div className="text-xs text-blue-200 mt-0.5 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: why call */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-lg font-bold text-white mb-6">Почему нельзя просто заказать онлайн?</h2>
              <div className="space-y-5">
                {[
                  {
                    icon: '⚠️',
                    text: 'Неправильно подобранная мощность — это деньги на ветер. Слабый не потянет, мощный будет гонять попусту.',
                  },
                  {
                    icon: '🔧',
                    text: 'Без профессионального монтажа гарантия производителя не действует. Любая ошибка — за ваш счёт.',
                  },
                  {
                    icon: '📐',
                    text: 'VRF, канальный, кассетный или мультисплит — разные системы для разных объектов. Ошибка дорогостоящая.',
                  },
                  {
                    icon: '✅',
                    text: 'Мы подбираем под ваш объект, согласуем проект и берём ответственность за результат.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
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
        </div>
      </div>
    </section>
  )
}
