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
    <div className="border-hub-border-control bg-hub-surface flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-12 text-center">
      <div className="bg-hub-primary-soft text-hub-primary flex mb-4 size-12 items-center justify-center rounded-2xl">
        {icon ?? <Inbox className="size-6" />}
      </div>

      <h3 className="text-hub-title text-base font-semibold">{title}</h3>

      <p className="text-hub-muted mt-2 max-w-sm text-sm leading-6">
        {description}
      </p>

      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export { EmptyState }
