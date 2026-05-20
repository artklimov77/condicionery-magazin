import OrderForm from '@/components/product/OrderForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакты',
}

export default function ContactsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Контакты</h1>
      <p className="text-slate-500 mb-10">Свяжитесь с нами любым удобным способом</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-6">
          {[
            {
              label: 'Телефон',
              value: '+7 (900) 123-45-67',
              href: 'tel:+79001234567',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              ),
            },
            {
              label: 'Email',
              value: 'info@klimatmarket.ru',
              href: 'mailto:info@klimatmarket.ru',
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              ),
            },
          ].map(({ label, value, href, icon }) => (
            <div key={label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
                {icon}
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-0.5">{label}</div>
                <a href={href} className="font-semibold text-slate-900 hover:text-brand-600 transition-colors">
                  {value}
                </a>
              </div>
            </div>
          ))}

          <div className="bg-brand-50 rounded-2xl p-5">
            <h3 className="font-semibold text-slate-800 mb-2">Режим работы</h3>
            <p className="text-slate-600 text-sm">Понедельник – Пятница: 9:00 – 19:00</p>
            <p className="text-slate-600 text-sm">Суббота: 10:00 – 17:00</p>
            <p className="text-slate-400 text-sm">Воскресенье: выходной</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Напишите нам</h2>
          <p className="text-sm text-slate-500 mb-6">Перезвоним в течение часа</p>
          <OrderForm source="contacts" />
        </div>
      </div>
    </div>
  )
}
