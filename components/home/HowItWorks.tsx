const steps = [
  {
    num: '01',
    title: 'Оставьте заявку или пройдите подборщик',
    desc: 'Расскажите о помещении: площадь, тип, бюджет. Или просто выберите модель из каталога.',
  },
  {
    num: '02',
    title: 'Менеджер подбирает лучший вариант',
    desc: 'Перезвоним в течение часа, уточним детали и предложим оптимальную модель по вашим критериям.',
  },
  {
    num: '03',
    title: 'Закупаем у поставщика',
    desc: 'Работаем напрямую с крупными дистрибьюторами — вы получаете оптовую цену без наценки посредников.',
  },
  {
    num: '04',
    title: 'Доставка и монтаж',
    desc: 'Привезём и установим в удобное для вас время. Можно только оборудование, если монтаж не нужен.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-2">Как мы работаем</p>
          <h2 className="text-3xl font-bold text-slate-900">От заявки до установки за 4 шага</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-1/2 w-full h-px bg-slate-200" />
              )}
              <div className="relative flex flex-col items-start">
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                  <span className="text-brand-700 font-bold text-sm">{step.num}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
