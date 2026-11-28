import type { HTMLAttributes } from "react"
import type { DemoCommunity } from "@/lib/demo-platform"

const communityPhotography: Record<DemoCommunity["style"], string> = {
  studio:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
  reading:
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85",
  outdoors:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85",
  garden:
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=85",
  technology:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
}

export function CommunityArt({
  community,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { community: DemoCommunity }) {
  return (
    <div
      aria-hidden="true"
      className={`relative isolate overflow-hidden bg-hub-surface-soft ${className}`}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={communityPhotography[community.style]}
        alt=""
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#312b35]/15 via-transparent to-white/5" />
    </div>
  )
}
