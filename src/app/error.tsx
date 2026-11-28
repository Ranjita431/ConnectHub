"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("ConnectHub application error:", error)
  }, [error])

  return (
    <div className="bg-hub-canvas flex min-h-screen items-center justify-center px-4">
      <div className="border-hub-border bg-hub-surface w-full max-w-md rounded-2xl border p-8 text-center shadow-sm">
        <div className="bg-hub-danger-soft text-hub-danger mx-auto flex size-14 items-center justify-center rounded-2xl">
          <AlertTriangle className="size-7" />
        </div>

        <h1 className="editorial-heading text-hub-title mt-5 text-2xl">
          Something went wrong
        </h1>

        <p className="text-hub-muted mt-2 text-sm leading-6">
          We encountered an unexpected problem. Please try again.
        </p>

        <Button type="button" onClick={reset} className="mt-6 gap-2">
          <RefreshCw className="size-4" />
          Try again
        </Button>
      </div>
    </div>
  )
}
