import type { Metadata } from "next"
import { Suspense } from "react"
import { notFound } from "next/navigation"
import { ProfilePage as ProfileExperience } from "@/components/features/profile/profile-page"
import { demoPeople } from "@/lib/demo-platform"

type ProfilePageProps = {
  params: Promise<{
    userId: string
  }>
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { userId } = await params
  const person = demoPeople.find((item) => item.id === userId)

  return {
    title:
      userId === "alex" || userId === "demo"
        ? "My profile"
        : person
          ? `${person.name}'s profile`
          : "Profile",
  }
}

async function ProfileContent({ params }: ProfilePageProps) {
  const { userId } = await params

  if (
    userId !== "alex" &&
    userId !== "demo" &&
    !demoPeople.some((person) => person.id === userId)
  ) {
    notFound()
  }

  return <ProfileExperience personId={userId} />
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <Suspense
      fallback={<div className="animate-pulse rounded-2xl bg-slate-100 p-12" />}
    >
      <ProfileContent params={params} />
    </Suspense>
  )
}
