'use client'

import Link from 'next/link'
import { useState } from 'react'

const nav = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Подборщик', href: '/quiz' },
  { label: 'Как выбрать', href: '/guide' },
  { label: 'Доставка', href: '/delivery' },
  { label: 'О нас', href: '/about' },
  { label: 'Контакты', href: '/contacts' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand-900">
            <svg className="w-7 h-7 text-brand-600" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>
            </svg>
            Nordic Air
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+79001234567"
              className="hidden sm:block text-sm font-semibold text-brand-900 hover:text-brand-600"
            >
              +7 (900) 123-45-67
            </a>
            <Link
              href="/quiz"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-accent text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
            >
              Подобрать
            </Link>

            {/* Burger */}
            <button
              className="md:hidden p-2 rounded-md text-slate-500 hover:text-slate-700"
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {nav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2 px-3 rounded-lg text-slate-700 hover:bg-brand-50 hover:text-brand-700 font-medium"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/quiz"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center py-3 rounded-lg bg-accent text-white font-semibold"
            >
              Подобрать кондиционер
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
