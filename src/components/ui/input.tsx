import type { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type InputProps = InputHTMLAttributes<HTMLInputElement>

function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "border-hub-border-control bg-hub-input-surface text-hub-ink placeholder:text-hub-placeholder focus-visible:border-hub-focus focus-visible:ring-hub-focus/20 flex h-11 w-full rounded-xl border px-3 py-2 text-sm shadow-sm transition-colors outline-none hover:border-hub-primary-border focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-hub-neutral-hover disabled:opacity-60",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
