import type { Metadata } from "next"
import { ConnectionsPage as ConnectionsExperience } from "@/components/features/connections/connections-page"

export const metadata: Metadata = {
  title: "Connections",
}

export default function ConnectionsPage() {
  return <ConnectionsExperience />
}
