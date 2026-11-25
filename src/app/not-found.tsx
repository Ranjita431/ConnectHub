import Link from "next/link"
import { ArrowLeft, SearchX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <SearchX className="size-7" />
        </div>

        <p className="mt-5 text-sm font-semibold text-indigo-600">ERROR 404</p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ArrowLeft className="size-4" />
          Back to ConnectHub
        </Link>
      </div>
    </div>
  )
}
