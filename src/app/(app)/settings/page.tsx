import type { Metadata } from "next"
import { SettingsPage as SettingsExperience } from "@/components/features/settings/settings-page"

export const metadata: Metadata = {
  title: "Settings",
}

export default function SettingsPage() {
  return <SettingsExperience />
}
