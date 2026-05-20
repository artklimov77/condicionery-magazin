import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-white font-bold text-lg mb-3">КлиматМаркет</div>
            <p className="text-sm leading-relaxed">
              Кондиционеры от крупных поставщиков. Подбор, заказ, доставка и монтаж под ключ.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Каталог</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog?category=nastennye" className="hover:text-white transition-colors">Настенные сплит-системы</Link></li>
              <li><Link href="/catalog?category=kassetnye" className="hover:text-white transition-colors">Кассетные</Link></li>
              <li><Link href="/catalog?category=kanalnye" className="hover:text-white transition-colors">Канальные</Link></li>
              <li><Link href="/catalog?category=multi-split" className="hover:text-white transition-colors">Мульти-сплит</Link></li>
              <li><Link href="/catalog" className="hover:text-white transition-colors">Все товары</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Покупателям</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/quiz" className="hover:text-white transition-colors">Подборщик кондиционера</Link></li>
              <li><Link href="/guide" className="hover:text-white transition-colors">Как выбрать кондиционер</Link></li>
              <li><Link href="/delivery" className="hover:text-white transition-colors">Доставка и монтаж</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">О компании</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+79001234567" className="hover:text-white transition-colors">
                  +7 (900) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@klimatmarket.ru" className="hover:text-white transition-colors">
                  info@klimatmarket.ru
                </a>
              </li>
              <li className="mt-3">
                <Link
                  href="/quiz"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-amber-600 transition-colors"
                >
                  Подобрать кондиционер →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} КлиматМаркет. Все права защищены.</span>
          <span>Работаем с крупнейшими поставщиками климатической техники</span>
        </div>
      </div>
    </footer>
  )
}
