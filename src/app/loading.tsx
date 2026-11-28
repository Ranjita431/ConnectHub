import { Network } from "lucide-react"

export default function Loading() {
  return (
    <div className="bg-hub-canvas flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="bg-hub-primary flex size-14 items-center justify-center rounded-2xl text-white shadow-md shadow-[#413247]/10">
          <Network className="size-7" />
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-hub-ink text-lg font-semibold">ConnectHub</h2>
          <p className="text-hub-muted text-sm">
            Getting everything ready for you...
          </p>
        </div>

        <div className="bg-hub-primary-soft h-1.5 w-36 overflow-hidden rounded-full">
          <div className="bg-hub-primary h-full w-1/2 animate-pulse rounded-full motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  )
}
