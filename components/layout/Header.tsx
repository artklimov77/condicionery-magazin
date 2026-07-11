'use client'

import Link from 'next/link'
import { useState } from 'react'

const nav = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Подборщик', href: '/quiz' },
  { label: 'Как выбрать', href: '/guide' },
  { label: 'Доставка и монтаж', href: '/delivery' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
]

const categories = [
  { label: 'Кондиционеры', href: '/catalog?category=bytovye-konditsionery' },
  { label: 'Мультисплит', href: '/catalog?category=multisplit-sistemy' },
  { label: 'Вентиляция', href: '/catalog?category=ventilyaciya' },
  { label: 'VRF системы', href: '/catalog?category=vrf-sistemy' },
  { label: 'Тепловые насосы', href: '/catalog?category=teplovye-nasosy' },
  { label: 'Чиллеры', href: '/catalog?category=chillery' },
  { label: 'Фанкойлы', href: '/catalog?category=fankoyly' },
]

interface Props {
  phone?: string
  phoneHref?: string
}

export default function Header({ phone = '+7 (900) 123-45-67', phoneHref = '+79001234567' }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between text-xs">
          <span className="text-blue-200 hidden sm:block">Климатическое оборудование — подбор, поставка, монтаж</span>
          <div className="flex items-center gap-4 ml-auto">
            <a href="mailto:info@nordic-air.ru" className="text-blue-200 hover:text-white transition-colors hidden sm:block">
              info@nordic-air.ru
            </a>
            <a href={`tel:${phoneHref}`} className="text-white font-semibold hover:text-blue-200 transition-colors flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-900 flex-shrink-0">
              <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>
              </svg>
              Nordic Air
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-5">
              {nav.map(({ label, href }) => (
                <Link key={href} href={href} className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors whitespace-nowrap">
                  {label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={`tel:${phoneHref}`}
                className="hidden md:flex items-center gap-2 text-brand-900 font-bold text-base hover:text-brand-600 transition-colors"
              >
                <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phone}
              </a>
              <Link
                href="/quiz"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Подобрать
              </Link>
              <button
                className="lg:hidden p-2 rounded-md text-slate-500 hover:text-slate-700"
                onClick={() => setOpen(!open)}
                aria-label="Меню"
              >
                {open ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category strip */}
      <div className="hidden lg:block border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 h-10 overflow-x-auto">
            {categories.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-3 py-1 rounded-md text-xs font-medium text-slate-600 hover:text-brand-700 hover:bg-brand-50 transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <a href={`tel:${phoneHref}`} className="flex items-center gap-2 py-3 px-3 rounded-lg bg-brand-50 text-brand-700 font-bold mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {phone}
            </a>
            {nav.map(({ label, href }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="py-2 px-3 rounded-lg text-slate-700 hover:bg-brand-50 hover:text-brand-700 font-medium">
                {label}
              </Link>
            ))}
            <div className="border-t border-slate-100 mt-2 pt-2">
              <p className="text-xs text-slate-400 px-3 mb-2 uppercase tracking-wider">Оборудование</p>
              {categories.map(({ label, href }) => (
                <Link key={label} href={href} onClick={() => setOpen(false)} className="py-1.5 px-3 rounded-lg text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700 block">
                  {label}
                </Link>
              ))}
            </div>
            <Link href="/quiz" onClick={() => setOpen(false)} className="mt-3 flex items-center justify-center py-3 rounded-lg bg-accent text-white font-semibold">
              Подобрать оборудование
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
