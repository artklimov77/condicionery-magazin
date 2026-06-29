import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-slate-300 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-400" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>
              </svg>
              Nordic Air
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Климатическое оборудование для жилых, коммерческих и промышленных объектов. Подбор, поставка, монтаж.
            </p>
            <p className="text-xs text-slate-500">Санкт-Петербург и область</p>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Оборудование</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog?category=bytovye-konditsionery" className="hover:text-white transition-colors">Кондиционеры</Link></li>
              <li><Link href="/catalog?category=multisplit-sistemy" className="hover:text-white transition-colors">Мультисплит-системы</Link></li>
              <li><Link href="/catalog?category=ventilyaciya" className="hover:text-white transition-colors">Вентиляция</Link></li>
              <li><Link href="/catalog?category=vrf-sistemy" className="hover:text-white transition-colors">VRF системы</Link></li>
              <li><Link href="/catalog?category=chillery" className="hover:text-white transition-colors">Чиллеры и фанкойлы</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors text-brand-400">Весь каталог →</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Покупателям</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/quiz" className="hover:text-white transition-colors">Подборщик оборудования</Link></li>
              <li><Link href="/guide" className="hover:text-white transition-colors">Как выбрать кондиционер</Link></li>
              <li><Link href="/delivery" className="hover:text-white transition-colors">Доставка и монтаж</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">О компании</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Связаться с нами</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+79001234567" className="flex items-center gap-2 text-white font-bold text-base hover:text-blue-200 transition-colors">
                  <svg className="w-4 h-4 text-brand-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +7 (900) 123-45-67
                </a>
                <p className="text-xs text-slate-500 mt-1 ml-6">Пн–Пт 9:00–18:00</p>
              </li>
              <li>
                <a href="mailto:info@nordic-air.ru" className="hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@nordic-air.ru
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/79001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-500 transition-colors mt-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.526 5.845L.057 23.882l6.224-1.634A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.383l-.361-.214-3.741.981.999-3.648-.235-.374A9.817 9.817 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Nordic Air. Все права защищены.</span>
          <span>Поставка и монтаж климатического оборудования в Санкт-Петербурге</span>
        </div>
      </div>
    </footer>
  )
}
