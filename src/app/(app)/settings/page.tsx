import type { Metadata } from "next"
import { PagePlaceholder } from "@/components/layout/page-placeholder"

export const metadata: Metadata = {
  title: "Settings",
}

export default function SettingsPage() {
  return (
    <PagePlaceholder
      title="Settings"
      description="Manage your account preferences and personalize your ConnectHub experience."
      emptyTitle="Your settings"
      emptyDescription="Profile preferences, privacy controls, and account settings will be available here."
    />
  )
}
