import type { HTMLAttributes, ReactNode } from "react"
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react"
import { cn } from "@/lib/utils"

type AlertVariant = "info" | "success" | "warning" | "danger"

type AlertProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant
  title: string
  children: ReactNode
}

const variants = {
  info: {
    styles: "border-blue-200 bg-blue-50 text-blue-900",
    icon: Info,
  },
  success: {
    styles: "border-emerald-200 bg-emerald-50 text-emerald-900",
    icon: CheckCircle2,
  },
  warning: {
    styles: "border-amber-200 bg-amber-50 text-amber-900",
    icon: TriangleAlert,
  },
  danger: {
    styles: "border-rose-200 bg-rose-50 text-rose-900",
    icon: AlertCircle,
  },
}

function Alert({
  variant = "info",
  title,
  children,
  className,
  ...props
}: AlertProps) {
  const { styles, icon: Icon } = variants[variant]

  return (
    <div
      role="alert"
      className={cn("flex gap-3 rounded-xl border p-4", styles, className)}
      {...props}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />

      <div className="min-w-0">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="mt-1 text-sm opacity-90">{children}</div>
      </div>
    </div>
  )
}

export { Alert }
