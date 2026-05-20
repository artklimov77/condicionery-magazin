import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Панель управления',
    template: '%s | Админ',
  },
  robots: 'noindex, nofollow',
}

const adminNav = [
  { label: 'Дашборд', href: '/admin' },
  { label: 'Товары', href: '/admin/products' },
  { label: 'Заявки', href: '/admin/orders' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin topbar */}
      <header className="bg-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <span className="font-bold text-sm">КлиматМаркет — Панель управления</span>
              <nav className="flex items-center gap-4">
                {adminNav.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            <Link href="/" className="text-blue-300 hover:text-white text-xs" target="_blank">
              ← На сайт
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  )
}
