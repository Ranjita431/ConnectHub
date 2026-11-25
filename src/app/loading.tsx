import { Sparkles } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <Sparkles className="size-7" />
        </div>

        <div className="space-y-2 text-center">
          <h2 className="text-lg font-semibold text-slate-900">ConnectHub</h2>
          <p className="text-sm text-slate-500">
            Getting everything ready for you...
          </p>
        </div>

        <div className="h-1.5 w-36 overflow-hidden rounded-full bg-indigo-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-indigo-600" />
        </div>
      </div>
    </div>
  )
}
