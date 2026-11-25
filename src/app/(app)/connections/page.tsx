import type { Metadata } from "next"
import { PagePlaceholder } from "@/components/layout/page-placeholder"

export const metadata: Metadata = {
  title: "Connections",
}

export default function ConnectionsPage() {
  return (
    <PagePlaceholder
      title="Your Connections"
      description="Build meaningful relationships with people who share your interests."
      emptyTitle="Your network starts here"
      emptyDescription="People you connect with will appear here. Start exploring to discover new connections."
    />
  )
}
