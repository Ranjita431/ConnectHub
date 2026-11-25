import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/feedback/empty-state"

type PagePlaceholderProps = {
  title: string
  description: string
  emptyTitle: string
  emptyDescription: string
}

function PagePlaceholder({
  title,
  description,
  emptyTitle,
  emptyDescription,
}: PagePlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <div>
        <Badge variant="secondary">Preview</Badge>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          {description}
        </p>
      </div>

      <EmptyState title={emptyTitle} description={emptyDescription} />
    </div>
  )
}

export { PagePlaceholder }
