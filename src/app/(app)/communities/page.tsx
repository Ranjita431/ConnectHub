import type { Metadata } from "next"
import { CommunitiesPage as CommunitiesExperience } from "@/components/features/communities/communities-page"

export const metadata: Metadata = {
  title: "Communities",
}

export default function CommunitiesPage() {
  return <CommunitiesExperience />
}
