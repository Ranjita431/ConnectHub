import type { HTMLAttributes } from "react"
import type { DemoCommunity } from "@/lib/demo-platform"

const artStyles: Record<DemoCommunity["style"], string> = {
  studio: "bg-[#d6ccef]",
  reading: "bg-[#e8cbbb]",
  outdoors: "bg-[#cfdbc0]",
  garden: "bg-[#d7e5d0]",
  technology: "bg-[#d5e0eb]",
}

export function CommunityArt({
  community,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement> & { community: DemoCommunity }) {
  return (
    <div
      aria-hidden="true"
      className={`relative isolate overflow-hidden ${artStyles[community.style]} ${className}`}
      {...props}
    >
      {community.style === "studio" && (
        <div className="absolute inset-y-0 right-[12%] flex -rotate-6 items-center gap-3">
          <span className="size-12 rounded-full bg-[#ef9a79]" />
          <span className="mt-7 size-10 rounded-full bg-[#7683c8]" />
          <span className="-mt-8 size-7 rounded-full bg-[#d7dfaa]" />
        </div>
      )}
      {community.style === "reading" && (
        <div className="absolute top-1/2 right-[16%] flex h-[68%] w-12 -translate-y-1/2 rotate-[8deg] items-center justify-center rounded-r-sm bg-[#b8765c] shadow-md shadow-[#7b5544]/15">
          <span className="h-4/5 w-px bg-white/40" />
        </div>
      )}
      {community.style === "outdoors" && (
        <div className="absolute top-1/2 right-[9%] size-24 -translate-y-1/2 rounded-full border border-[#758665]/30">
          <span className="absolute top-3 left-4 size-12 rounded-full bg-[#9fb589]/70" />
          <span className="bg-hub-primary absolute right-3 bottom-3 size-2 rounded-full" />
        </div>
      )}
      {community.style === "garden" && (
        <div className="absolute right-[12%] bottom-0 flex h-4/5 items-end gap-2">
          <span className="h-10 w-5 rotate-[-18deg] rounded-full bg-[#78976c]" />
          <span className="h-14 w-6 rounded-full bg-[#8da36d]" />
          <span className="h-8 w-5 rotate-[18deg] rounded-full bg-[#a5b88d]" />
        </div>
      )}
      {community.style === "technology" && (
        <div className="absolute top-1/2 right-[12%] grid size-20 -translate-y-1/2 rotate-12 grid-cols-3 gap-1">
          <span className="rounded-full bg-[#6e88a6]" />
          <span className="rounded-full bg-[#c4a4b9]" />
          <span className="rounded-full bg-[#91a9bc]" />
          <span className="rounded-full bg-[#b0c1cb]" />
          <span className="bg-hub-primary rounded-full" />
          <span className="rounded-full bg-[#a7b49d]" />
          <span className="rounded-full bg-[#d0bfa1]" />
          <span className="rounded-full bg-[#8199aa]" />
          <span className="rounded-full bg-[#ceb6a7]" />
        </div>
      )}
    </div>
  )
}
