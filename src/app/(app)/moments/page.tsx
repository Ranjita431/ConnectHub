import type { Metadata } from "next"
import { MomentsPage } from "@/components/features/moments/moments-page"

export const metadata: Metadata = {
  title: "Moments",
}

export default function MomentsRoute() {
  return <MomentsPage />
}
