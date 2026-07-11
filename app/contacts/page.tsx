import OrderForm from '@/components/product/OrderForm'
import type { Metadata } from 'next'
import { getContent, cms } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Контакты — Nordic Air',
  description: 'Свяжитесь с Nordic Air. Работаем по Санкт-Петербургу и Ленинградской области.',
}

export default async function ContactsPage() {
  const content = await getContent()
  const c = (key: string) => cms(content, key)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Контакты</h1>
      <p className="text-slate-500 mb-10">Работаем по Санкт-Петербургу и Ленинградской области</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Телефон</div>
              <a href={`tel:${c('phone_href')}`} className="font-semibold text-slate-900 hover:text-brand-600 transition-colors">
                {c('phone')}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-0.5">Email</div>
              <a href={`mailto:${c('email_info')}`} className="font-semibold text-slate-900 hover:text-brand-600 transition-colors">
                {c('email_info')}
              </a>
            </div>
          </div>

          {c('address') && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-0.5">Адрес</div>
                <span className="font-semibold text-slate-900">{c('address')}</span>
              </div>
            </div>
          )}

          {c('whatsapp') && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.526 5.845L.057 23.882l6.224-1.634A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.383l-.361-.214-3.741.981.999-3.648-.235-.374A9.817 9.817 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-0.5">WhatsApp</div>
                <a href={`https://wa.me/${c('whatsapp').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-green-600 hover:text-green-700 transition-colors">
                  Написать в WhatsApp
                </a>
              </div>
            </div>
          )}

          <div className="bg-brand-50 rounded-2xl p-5">
            <h3 className="font-semibold text-slate-800 mb-2">Режим работы</h3>
            {c('contacts_hours1') && <p className="text-slate-600 text-sm">{c('contacts_hours1')}</p>}
            {c('contacts_hours2') && <p className="text-slate-600 text-sm">{c('contacts_hours2')}</p>}
            {c('contacts_hours3') && <p className="text-slate-400 text-sm">{c('contacts_hours3')}</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Напишите нам</h2>
          <p className="text-sm text-slate-500 mb-6">Перезвоним в течение часа</p>
          <OrderForm source="contacts" />
        </div>
      </div>
    </div>
  )
}
