import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: {
    default: 'КлиматМаркет — Кондиционеры под заказ',
    template: '%s | КлиматМаркет',
  },
  description: 'Интернет-магазин кондиционеров. Подберём модель под ваш запрос, закупим у проверенных поставщиков и доставим с монтажом.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
