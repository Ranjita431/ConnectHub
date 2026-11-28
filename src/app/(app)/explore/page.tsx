import type { Metadata } from "next"
import { Suspense } from "react"
import { Skeleton } from "@/components/feedback/skeleton"
import { ExplorePage as ExplorePageContent } from "@/components/features/explore/explore-page"

export const metadata: Metadata = {
  title: "Explore",
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-5">
          <Skeleton className="h-20 w-2/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      }
    >
      <ExplorePageContent />
    </Suspense>
  )
}
