import type { Metadata } from "next"
import { LandingPage } from "@/components/landing/landing-page"

export const metadata: Metadata = {
  title: "Find your people",
  description:
    "Discover people and communities around the things you love. Find your place on ConnectHub.",
}

export default function Home() {
  return <LandingPage />
}
