import type { Metadata } from "next"
import { PagePlaceholder } from "@/components/layout/page-placeholder"

export const metadata: Metadata = {
  title: "Communities",
}

export default function CommunitiesPage() {
  return (
    <PagePlaceholder
      title="Communities"
      description="Find your community, share ideas, and connect through common interests."
      emptyTitle="Find your community"
      emptyDescription="Communities based on your interests will appear here. Discover spaces where you belong."
    />
  )
}
