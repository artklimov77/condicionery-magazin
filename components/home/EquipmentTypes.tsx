import Link from 'next/link'

const types = [
  {
    href: '/catalog?category=bytovye-konditsionery',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="8" rx="2" />
        <path strokeLinecap="round" d="M7 15v3M17 15v3M7 7V5M17 7V5" />
        <circle cx="12" cy="11" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Кондиционеры',
    desc: 'Бытовые и полупромышленные сплит-системы для квартир, домов и офисов',
    badge: '2000+ моделей',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    href: '/catalog?category=multisplit-sistemy',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="2" y="3" width="8" height="5" rx="1.5" />
        <rect x="14" y="3" width="8" height="5" rx="1.5" />
        <rect x="2" y="16" width="8" height="5" rx="1.5" />
        <rect x="14" y="16" width="8" height="5" rx="1.5" />
        <path strokeLinecap="round" d="M6 8v4M18 8v4M6 12h12M12 12v4" />
      </svg>
    ),
    title: 'Мультисплит',
    desc: 'Один наружный блок — несколько внутренних. Идеально для нескольких комнат',
    badge: '600+ моделей',
    color: 'text-indigo-600 bg-indigo-50',
  },
  {
    href: '/catalog?category=ventilyaciya',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Вентиляция',
    desc: 'Приточно-вытяжные установки, рекуператоры, канальные системы вентиляции',
    badge: 'Под заказ',
    color: 'text-teal-600 bg-teal-50',
  },
  {
    href: '/catalog?category=vrf-sistemy',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="12" rx="2" />
        <path strokeLinecap="round" d="M6 16v4M18 16v4M8 10h8M12 8v4" />
        <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'VRF системы',
    desc: 'Мощные мультизональные системы для торговых центров, офисных зданий и гостиниц',
    badge: '1400+ моделей',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    href: '/catalog?category=chillery',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path strokeLinecap="round" d="M3 10h18M7 14h2M11 14h2" />
        <circle cx="17" cy="14" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: 'Чиллеры',
    desc: 'Промышленные холодильные машины для крупных объектов и производств',
    badge: '300+ моделей',
    color: 'text-cyan-600 bg-cyan-50',
  },
  {
    href: '/catalog?category=fankoyly',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 8v2M12 14v2M8 12h2M14 12h2" />
      </svg>
    ),
    title: 'Фанкойлы',
    desc: 'Вентиляторные доводчики для систем центрального кондиционирования',
    badge: '290+ моделей',
    color: 'text-orange-600 bg-orange-50',
  },
]

export default function EquipmentTypes() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-2">Полный спектр климатики</p>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Что мы поставляем</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            От бытового сплита до промышленной VRF-системы — работаем с любыми объектами и задачами
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {types.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:border-brand-200 transition-all flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${t.color}`}>
                  {t.icon}
                </div>
                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                  {t.badge}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-brand-600 transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-brand-600 text-sm font-semibold mt-auto">
                Смотреть каталог
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm mb-3">Не нашли нужную категорию? У нас есть и тепловые насосы, и прецизионные кондиционеры</p>
          <a
            href="tel:+79001234567"
            className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:underline"
          >
            Позвоните — подберём под любую задачу
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
