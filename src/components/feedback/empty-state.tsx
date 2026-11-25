import type { ReactNode } from "react"
import { Inbox } from "lucide-react"

type EmptyStateProps = {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
}

function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        {icon ?? <Inbox className="size-6" />}
      </div>

      <h3 className="text-base font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export { EmptyState }
