import type { Metadata } from "next"
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

export default async function ProfilePage({ params }: ProfilePageProps) {
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
