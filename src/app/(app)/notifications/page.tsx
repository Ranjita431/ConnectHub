import type { Metadata } from "next"
import { NotificationsPage as NotificationsExperience } from "@/components/features/notifications/notifications-page"

export const metadata: Metadata = {
  title: "Notifications",
}

export default function NotificationsPage() {
  return <NotificationsExperience />
}
