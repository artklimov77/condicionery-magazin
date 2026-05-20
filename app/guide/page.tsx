import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Как выбрать кондиционер — полный гайд',
  description: 'Разбираем мощность, BTU, инверторные vs обычные, классы энергоэффективности. Всё что нужно знать перед покупкой.',
}

const sections = [
  {
    id: 'btu',
    title: 'Что такое BTU и как выбрать мощность',
    content: `BTU (British Thermal Unit) — единица мощности. В России мощность чаще указывают в кВт: 1 кВт ≈ 3412 BTU.

Простое правило расчёта: **1 кВт на каждые 10 м²** для стандартной комнаты с потолком 2.7 м. То есть для комнаты 25 м² нужен кондиционер 2.5 кВт (около 9000 BTU).

Если комната угловая, много окон на юг или потолки выше 3 м — берите запас 15–20%.`,
  },
  {
    id: 'inverter',
    title: 'Инверторный vs обычный: в чём разница',
    content: `**Обычный (on/off)** кондиционер работает в двух режимах: включён на 100% или выключен. Достигает нужной температуры — выключается. Температура поднялась — включается снова.

**Инверторный** плавно регулирует мощность. Достиг нужной температуры — работает на 10–30%, поддерживая комфорт без резких скачков.

Инвертор потребляет на 30–40% меньше электроэнергии, работает тише и служит дольше. Разница в цене — 5–10 000 ₽, которая отбивается за 1–2 сезона.

**Вывод:** в 2024 году брать не-инверторный смысла нет.`,
  },
  {
    id: 'energy',
    title: 'Классы энергоэффективности A, A+, A++, A+++',
    content: `Класс показывает насколько эффективно кондиционер преобразует электроэнергию в холод (или тепло).

- **A** — стандарт, достаточно для большинства задач
- **A+** — на 20% эффективнее класса A
- **A++** — на 40% эффективнее
- **A+++** — максимальная эффективность, встречается у Daikin, Mitsubishi

Разница в счёте за электричество за сезон может составлять 2–5 000 ₽. При частом использовании — имеет смысл переплатить за A++.`,
  },
  {
    id: 'types',
    title: 'Типы кондиционеров: что выбрать',
    content: `**Настенный сплит** — самый распространённый. Внутренний блок на стене, внешний на фасаде. Подходит для большинства жилых помещений.

**Кассетный** — внутренний блок монтируется в потолок, обдув со всех 4 сторон. Для больших помещений и офисов.

**Канальный** — скрыт в потолке, распределяет воздух через воздуховоды. Невидим в интерьере. Для объектов с дизайн-ремонтом.

**Мульти-сплит** — один внешний блок на 2–5 внутренних. Для нескольких комнат.`,
  },
  {
    id: 'brands',
    title: 'Какой бренд выбрать',
    content: `**Daikin** и **Mitsubishi Electric** — японские производители, эталон надёжности и тишины. Дороже, но служат 15–20 лет.

**LG** и **Samsung** — корейцы с отличным соотношением цена/качество. Много моделей с Wi-Fi. 10–15 лет службы.

**Haier** и **Gree** — китайские бренды с хорошим качеством за меньшие деньги. Гарантия производителя.

**Pioneer**, **Ballu**, **Aux** — бюджетный сегмент. Подходят для временных помещений или с ограниченным бюджетом.`,
  },
]

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-2">Полезно знать</p>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Как выбрать кондиционер</h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Кондиционер — покупка на 10–15 лет. Разберём ключевые параметры, чтобы не переплатить и не пожалеть.
        </p>
      </div>

      {/* TOC */}
      <div className="bg-brand-50 rounded-2xl p-6 mb-10">
        <h2 className="font-semibold text-slate-800 mb-3">Содержание</h2>
        <ol className="space-y-1">
          {sections.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-brand-600 hover:underline text-sm">
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {sections.map((section, i) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {i + 1}. {section.title}
            </h2>
            <div className="prose prose-slate max-w-none">
              {section.content.split('\n\n').map((para, j) => (
                <p key={j} className="text-slate-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{
                  __html: para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                }} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 bg-brand-900 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Всё ещё сомневаетесь?</h3>
        <p className="text-blue-200 mb-6">Пройдите подборщик — ответьте на 4 вопроса и получите рекомендацию от менеджера.</p>
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-accent text-white font-bold hover:bg-amber-600 transition-colors"
        >
          Пройти подборщик
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
