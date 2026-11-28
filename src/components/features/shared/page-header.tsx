import type { ReactNode } from "react"

type PageHeaderProps = {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="min-w-0">
        <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.16em] uppercase">
          {eyebrow}
        </p>
        <h1 className="editorial-heading text-hub-title mt-1.5 text-2xl sm:text-[2rem]">
          {title}
        </h1>
        <p className="text-hub-muted mt-2 max-w-2xl text-sm leading-6">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}
