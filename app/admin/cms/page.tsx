import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { DEFAULTS, type CMS } from '@/lib/cms'
import CmsEditor from '@/components/admin/CmsEditor'

export const metadata: Metadata = { title: 'Контент сайта' }

export default async function CmsPage() {
  const rows = await db.content.findMany()
  const initial: CMS = { ...DEFAULTS }
  for (const r of rows) initial[r.key] = r.value

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Контент сайта</h1>
        <p className="text-sm text-slate-500 mt-1">Редактируйте тексты и контактные данные. Изменения применяются сразу.</p>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <CmsEditor initial={initial} />
      </div>
    </div>
  )
}
