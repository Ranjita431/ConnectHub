import type { Metadata } from "next"
import { Suspense } from "react"
import { Skeleton } from "@/components/feedback/skeleton"
import { MessagesPage as MessagesExperience } from "@/components/features/messages/messages-page"

export const metadata: Metadata = {
  title: "Messages",
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-16 w-2/3" />
          <Skeleton className="h-[520px] w-full" />
        </div>
      }
    >
      <MessagesExperience />
    </Suspense>
  )
}
