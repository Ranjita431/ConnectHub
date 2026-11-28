import type { TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "border-hub-border-control bg-hub-input-surface text-hub-ink placeholder:text-hub-placeholder focus-visible:border-hub-focus focus-visible:ring-hub-focus/20 flex min-h-24 w-full rounded-xl border px-3 py-2 text-sm shadow-sm transition-colors outline-none hover:border-hub-primary-border focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-hub-neutral-hover disabled:opacity-60",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
