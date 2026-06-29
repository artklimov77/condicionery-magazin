import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingContact from '@/components/common/FloatingContact'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: {
    default: 'Nordic Air — Климатическое оборудование в Санкт-Петербурге',
    template: '%s | Nordic Air',
  },
  description: 'Кондиционеры, вентиляция, тепловые насосы, VRF-системы. Подбор, поставка и монтаж под ключ. Работаем напрямую с дистрибьюторами — без посредников.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Nordic Air',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  )
}
