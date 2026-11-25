import type { Metadata } from "next"
import { PagePlaceholder } from "@/components/layout/page-placeholder"

export const metadata: Metadata = {
  title: "Explore",
}

export default function ExplorePage() {
  return (
    <PagePlaceholder
      title="Explore"
      description="Discover people, interests, and communities that inspire you."
      emptyTitle="Discover something new"
      emptyDescription="Your personalized discovery experience will appear here as ConnectHub grows."
    />
  )
}
