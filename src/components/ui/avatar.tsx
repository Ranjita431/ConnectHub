import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string
  imageUrl?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const sizes = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-xl",
}

function Avatar({
  name,
  imageUrl,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div
      role="img"
      aria-label={`${name}'s avatar`}
      className={cn(
        "bg-hub-avatar-lavender text-hub-avatar-lavender-ink flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
        sizes[size],
        className,
      )}
      {...props}
    >
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="size-full object-cover" />
      ) : (
        initials
      )}
    </div>
  )
}

export { Avatar }
