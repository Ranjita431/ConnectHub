"use client"

import Link from "next/link"
import { ArrowRight, Check, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CommunityArt } from "@/components/features/shared/community-art"
import { useDemoPlatform } from "@/lib/demo-platform-state"

export function CommunityDiscovery() {
  const { state, actions } = useDemoPlatform()
  const communities = state.communities.slice(0, 3)

  return (
    <section aria-labelledby="community-picks-title">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.15em] uppercase">
            Places to start
          </p>
          <h2
            id="community-picks-title"
            className="text-hub-title mt-1 text-xl font-semibold tracking-[-0.035em]"
          >
            Find your corner
          </h2>
        </div>
        <Link
          href="/communities"
          className="text-hub-primary-strong hover:text-hub-primary-deep mb-0.5 inline-flex items-center gap-1 text-[11px] font-semibold"
        >
          All spaces
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>

      <p className="text-hub-muted mb-3 text-[11px] leading-5">
        Sample communities · Join buttons are a local demo.
      </p>

      <div className="space-y-3">
        {communities.map((community, index) => {
          const isJoined = state.joinedCommunityIds.includes(community.id)

          return (
            <article
              key={community.id}
              className={`group border-hub-border overflow-hidden rounded-2xl border bg-white ${index === 0 ? "" : "sm:ml-3"}`}
            >
              <Link
                href={`/communities/${community.id}`}
                aria-label={`Visit ${community.name}`}
                className="focus-visible:outline-inset focus-visible:outline-hub-focus relative block h-[82px] overflow-hidden focus-visible:outline-2"
              >
                <CommunityArt
                  community={community}
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
                <Badge
                  variant="outline"
                  className="absolute top-3 left-3 z-10 border-white/70 bg-white/75 text-[9px] tracking-[0.08em] text-[#4d4859] uppercase"
                >
                  {community.category}
                </Badge>
              </Link>

              <div className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-hub-title truncate text-sm font-semibold">
                      <Link
                        href={`/communities/${community.id}`}
                        className="hover:text-hub-primary"
                      >
                        {community.name}
                      </Link>
                    </h3>
                    <p className="text-hub-muted mt-1 text-[11px] leading-5">
                      {community.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-pressed={isJoined}
                    onClick={() =>
                      isJoined
                        ? actions.leaveCommunity(community.id)
                        : actions.joinCommunity(community.id)
                    }
                    className={`focus-visible:outline-hub-primary inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-[10px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none ${
                      isJoined
                        ? "text-hub-primary bg-[#e9e5fa]"
                        : "bg-hub-night-soft hover:bg-hub-primary text-white"
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
                <p className="border-hub-divider-soft text-hub-subtle mt-3 border-t pt-2.5 text-[10px]">
                  {community.memberCount.toLocaleString()} members
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
