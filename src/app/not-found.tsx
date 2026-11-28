import Link from "next/link"
import { ArrowLeft, SearchX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="bg-hub-canvas flex min-h-screen items-center justify-center px-4">
      <div className="border-hub-border bg-hub-surface w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">
        <div className="bg-hub-primary-soft text-hub-primary mx-auto flex size-14 items-center justify-center rounded-2xl">
          <SearchX className="size-7" />
        </div>

        <p className="text-hub-primary mt-5 text-sm font-semibold">ERROR 404</p>

        <h1 className="editorial-heading text-hub-title mt-2 text-2xl">
          Page not found
        </h1>

        <p className="text-hub-muted mt-2 text-sm leading-6">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="bg-hub-primary hover:bg-hub-primary-hover mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-hub-focus focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <ArrowLeft className="size-4" />
          Back to ConnectHub
        </Link>
      </div>
    </div>
  )
}
