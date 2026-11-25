import Link from "next/link"
import { Search, Bell, ChevronDown } from "lucide-react"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur-md sm:px-8">
      {/* Search */}
      <div className="relative w-full max-w-xl">
        <Search
          size={19}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          placeholder="Search people, communities, interests..."
          aria-label="Search ConnectHub"
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pr-4 pl-11 text-sm text-slate-700 transition outline-none focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>

      {/* Actions */}
      <div className="ml-4 flex shrink-0 items-center gap-3">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
        >
          <Bell size={21} />

          <span className="absolute top-2 right-2 size-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </Link>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50"
          aria-label="User profile menu"
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            A
          </div>

          <span className="hidden text-sm font-semibold text-slate-700 md:block">
            Alex Morgan
          </span>

          <ChevronDown size={16} className="hidden text-slate-400 md:block" />
        </button>
      </div>
    </header>
  )
}
