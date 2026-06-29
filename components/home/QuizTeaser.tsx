import Link from 'next/link'

export default function QuizTeaser() {
  return (
    <section className="py-16 bg-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-blue-300 uppercase tracking-widest mb-3">Не знаете что выбрать?</p>
            <h2 className="text-3xl font-bold text-white mb-4">
              Подберём оборудование за 3 минуты
            </h2>
            <p className="text-blue-200 text-lg leading-relaxed mb-6">
              Ответьте на несколько вопросов о вашем объекте — тип, площадь, задача, бюджет. Менеджер перезвонит с готовой подборкой конкретных моделей.
            </p>
            <p className="text-blue-300 text-sm mb-8">
              Работает для любого типа оборудования: кондиционеры, вентиляция, тепловые насосы, VRF
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quiz"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent font-bold text-lg text-white hover:bg-amber-600 transition-colors"
              >
                Начать подбор
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="tel:+79001234567"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 font-semibold text-white hover:border-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Позвонить и спросить
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="space-y-3">
              {[
                { step: '1', label: 'Тип оборудования', desc: 'Кондиционер, вентиляция, тепловой насос...' },
                { step: '2', label: 'Тип объекта', desc: 'Квартира, офис, склад, производство...' },
                { step: '3', label: 'Площадь помещения', desc: 'Подберём нужную мощность' },
                { step: '4', label: 'Бюджет и приоритеты', desc: 'Тишина, экономия, Wi-Fi, бренд' },
                { step: '✓', label: 'Получаете подборку', desc: 'Менеджер перезвонит в течение часа', highlight: true },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl ${item.highlight ? 'bg-accent/20 border border-accent/40' : 'bg-white/10'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${item.highlight ? 'bg-accent text-white' : 'bg-brand-700 text-blue-200'}`}>
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">{item.label}</div>
                    <div className="text-blue-300 text-xs mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
