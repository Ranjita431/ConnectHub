import type { Metadata } from "next"
import { Suspense } from "react"
import { PagePlaceholder } from "@/components/layout/page-placeholder"

type ProfilePageProps = {
  params: Promise<{
    userId: string
  }>
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { userId } = await params

  return {
    title: `Profile ${userId}`,
  }
}

async function ProfileContent({ params }: ProfilePageProps) {
  const { userId } = await params

  return (
    <PagePlaceholder
      title="User Profile"
      description={`Viewing profile: ${userId}`}
      emptyTitle="Profile preview"
      emptyDescription="User profile information, interests, and shared activity will appear here."
    />
  )
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
