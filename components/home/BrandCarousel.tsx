const brands = [
  'Daikin', 'Mitsubishi Electric', 'LG', 'Samsung', 'Midea',
  'Bosch', 'Daichi', 'Kentatsu', 'Haier', 'Gree', 'Lessar',
  'TOSOT', 'Fujitsu', 'Axioma', 'Pioneer',
]

export default function BrandCarousel() {
  return (
    <section className="bg-white border-y border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
          Работаем с поставщиками ведущих мировых брендов
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {brands.map((brand) => (
            <div
              key={brand}
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-500 hover:border-brand-300 hover:text-brand-700 hover:bg-brand-50 transition-colors cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
