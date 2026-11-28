import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?:
    "default" | "secondary" | "success" | "warning" | "danger" | "outline"
}

const variants = {
  default: "bg-hub-primary-soft text-hub-primary-deep",
  secondary: "bg-hub-neutral-hover text-hub-body",
  success: "bg-hub-success/10 text-hub-success",
  warning: "bg-amber-50 text-amber-800",
  danger: "bg-hub-danger-soft text-hub-danger",
  outline: "border-hub-border-control bg-hub-surface text-hub-body",
}

function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
