"use client"

import Link from "next/link"
import { ArrowUpRight, Check, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CommunityArt } from "./community-art"
import { useDemoPlatform } from "@/lib/demo-platform-state"
import type { DemoCommunity } from "@/lib/demo-platform"

export function CommunityCard({
  community,
  featured = false,
}: {
  community: DemoCommunity
  featured?: boolean
}) {
  const { state, actions } = useDemoPlatform()
  const isJoined = state.joinedCommunityIds.includes(community.id)

  return (
    <article
      className={`group border-hub-border overflow-hidden rounded-2xl border bg-white ${
        featured ? "md:row-span-2" : ""
      }`}
    >
      <Link
        href={`/communities/${community.id}`}
        aria-label={`View ${community.name}`}
        className="focus-visible:outline-hub-focus block focus-visible:outline-2 focus-visible:outline-offset-[-3px]"
      >
        <CommunityArt
          community={community}
          className={featured ? "h-40 sm:h-48" : "h-28"}
        />
      </Link>
      <div className={featured ? "p-5" : "p-4"}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Badge
              variant="outline"
              className="bg-hub-surface-soft text-hub-primary-muted mb-2 border-[#e4dfef] text-[9px]"
            >
              {community.category}
            </Badge>
            <h3 className="text-hub-ink text-sm font-semibold">
              <Link
                href={`/communities/${community.id}`}
                className="hover:text-hub-primary focus-visible:outline-hub-focus rounded-sm focus-visible:outline-2"
              >
                {community.name}
              </Link>
            </h3>
            <p className="text-hub-muted mt-1.5 line-clamp-2 text-xs leading-5">
              {community.description}
            </p>
          </div>
          <span className="text-hub-subtle mt-1 shrink-0 text-[10px]">
            {community.memberCount.toLocaleString()} members
          </span>
        </div>
        <div className="border-hub-divider-soft mt-4 flex items-center justify-between gap-3 border-t pt-3">
          <Link
            href={`/communities/${community.id}`}
            className="text-hub-primary-strong hover:text-hub-primary-deep inline-flex items-center gap-1 text-[11px] font-semibold"
          >
            View space
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
          <button
            type="button"
            aria-pressed={isJoined}
            onClick={() =>
              isJoined
                ? actions.leaveCommunity(community.id)
                : actions.joinCommunity(community.id)
            }
            className={`focus-visible:outline-hub-primary inline-flex min-h-8 items-center gap-1.5 rounded-full px-3 text-[10px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none ${
              isJoined
                ? "bg-hub-primary-faint text-hub-primary hover:bg-hub-primary-hover-wash"
                : "bg-hub-ink hover:bg-hub-primary text-white"
            }`}
          >
            {isJoined ? (
              <Check size={12} aria-hidden="true" />
            ) : (
              <Plus size={12} aria-hidden="true" />
            )}
            {isJoined ? "Joined" : "Join"}
          </button>
        </div>
      </div>
    </article>
  )
}
