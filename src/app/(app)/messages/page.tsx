import type { Metadata } from "next"
import { PagePlaceholder } from "@/components/layout/page-placeholder"

export const metadata: Metadata = {
  title: "Messages",
}

export default function MessagesPage() {
  return (
    <PagePlaceholder
      title="Messages"
      description="Stay in touch and have meaningful conversations with your connections."
      emptyTitle="Your conversations start here"
      emptyDescription="Your private conversations will appear here when messaging becomes available."
    />
  )
}
