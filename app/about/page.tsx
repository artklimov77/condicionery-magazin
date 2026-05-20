import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О компании',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">О компании</h1>
      <p className="text-xl text-slate-500 leading-relaxed mb-10">
        КлиматМаркет — интернет-магазин климатической техники, работающий напрямую с крупными поставщиками.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Как мы работаем</h2>
          <p className="text-slate-600 leading-relaxed">
            Мы не держим большой склад — мы принимаем заявки, подбираем оптимальную модель под ваш запрос
            и закупаем напрямую у проверенных дистрибьюторов. Это позволяет предлагать честные цены
            без наценки за хранение.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Почему это выгодно</h2>
          <p className="text-slate-600 leading-relaxed">
            Кондиционер — специфический товар. Неправильно подобранная мощность, не тот тип для вашего
            помещения — и через год пожалеете о покупке. Наш подход: сначала разобраться в вашей задаче,
            потом подобрать решение.
          </p>
        </div>
      </div>

      <div className="bg-brand-50 rounded-2xl p-8 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Наши поставщики</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          Работаем с официальными дистрибьюторами Daikin, Mitsubishi Electric, LG, Samsung, Haier, Gree и других
          ведущих брендов климатической техники. Всё оборудование поставляется с официальной гарантией производителя.
        </p>
        <p className="text-slate-500 text-sm">
          Сертификаты и документы на оборудование предоставляем по запросу.
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-bold text-lg hover:bg-amber-600 transition-colors"
        >
          Подобрать кондиционер
        </Link>
      </div>
    </div>
  )
}
