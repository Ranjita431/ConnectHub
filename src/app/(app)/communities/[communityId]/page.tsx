import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CommunityDetail } from "@/components/features/communities/community-detail"
import { demoCommunities } from "@/lib/demo-platform"

type CommunityPageProps = {
  params: Promise<{
    communityId: string
  }>
}

export function generateStaticParams() {
  return demoCommunities.map((community) => ({
    communityId: community.id,
  }))
}

export async function generateMetadata({
  params,
}: CommunityPageProps): Promise<Metadata> {
  const { communityId } = await params
  const community = demoCommunities.find((item) => item.id === communityId)
  return { title: community?.name ?? "Community" }
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { communityId } = await params
  if (!demoCommunities.some((community) => community.id === communityId)) {
    notFound()
  }
  return <CommunityDetail communityId={communityId} />
}
