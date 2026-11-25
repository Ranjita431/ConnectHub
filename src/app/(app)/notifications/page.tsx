import type { Metadata } from "next"
import { PagePlaceholder } from "@/components/layout/page-placeholder"

export const metadata: Metadata = {
  title: "Notifications",
}

export default function NotificationsPage() {
  return (
    <PagePlaceholder
      title="Notifications"
      description="Keep up with activity, updates, and interactions across ConnectHub."
      emptyTitle="You're all caught up"
      emptyDescription="When someone interacts with your profile or content, you'll see updates here."
    />
  )
}
