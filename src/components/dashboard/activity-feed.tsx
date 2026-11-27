"use client"

import Link from "next/link"
import { ArrowUpRight, Heart, MessageCircle } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { demoPeople } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"

export function ActivityFeed() {
  const { state, actions } = useDemoPlatform()
  const activities = state.posts.flatMap((post) => {
    const community = state.communities.find(
      (item) => item.id === post.communityId,
    )
    const person = demoPeople.find((item) => item.id === post.authorId)
    const authorName =
      post.authorId === "alex" ? state.profile.name : person?.name
    if (!community || !authorName) return []
    return [
      {
        post,
        community,
        authorName,
        authorColor:
          person?.color ??
          "bg-hub-avatar-lavender text-hub-avatar-lavender-ink",
      },
    ]
  })

  return (
    <section aria-labelledby="activity-title" className="min-w-0">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.15em] uppercase">
            Around the hub
          </p>
          <h2
            id="activity-title"
            className="text-hub-title mt-1 text-xl font-semibold tracking-[-0.035em]"
          >
            A little conversation
          </h2>
        </div>
        <Badge
          variant="outline"
          className="text-hub-primary-strong shrink-0 border-[#ddd7f3] bg-[#f3f0ff] text-[10px]"
        >
          Sample feed
        </Badge>
      </div>

      <div className="border-hub-border overflow-hidden rounded-2xl border bg-white">
        {activities.map(
          ({ post, community, authorName, authorColor }, index) => (
            <article
              key={post.id}
              className={`p-4 sm:p-5 ${index > 0 ? "border-hub-divider-strong border-t" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Avatar name={authorName} size="md" className={authorColor} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-hub-title text-sm font-semibold">
                      {authorName}
                    </p>
                    <span className="text-hub-subtle-alt text-xs">in</span>
                    <Link
                      href={`/communities/${community.id}`}
                      className="text-hub-primary-strong text-xs font-semibold hover:underline"
                    >
                      {community.name}
                    </Link>
                    <span className="text-hub-subtle-alt ml-auto text-[11px]">
                      {post.createdAt}
                    </span>
                  </div>

                  {post.prompt && (
                    <p className="text-hub-caption mt-3 text-[10px] font-semibold tracking-[0.1em] uppercase">
                      {post.prompt}
                    </p>
                  )}
                  <p className="text-hub-body mt-2 text-[13px] leading-6">
                    {post.message}
                  </p>

                  <div className="border-hub-divider-soft mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                    <span className="text-hub-muted-strong inline-flex items-center gap-1.5 text-[11px]">
                      <MessageCircle size={14} aria-hidden="true" />
                      Community discussion preview
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-pressed={post.likedByMe}
                        aria-label={`${post.likedByMe ? "Unlike" : "Appreciate"} post by ${authorName}`}
                        onClick={() => actions.togglePostLike(post.id)}
                        className={`inline-flex min-h-8 items-center gap-1.5 rounded-full px-2 text-[10px] font-semibold transition-colors motion-reduce:transition-none ${
                          post.likedByMe
                            ? "bg-hub-danger-soft text-hub-danger"
                            : "text-hub-muted hover:bg-hub-surface-soft hover:text-hub-danger"
                        }`}
                      >
                        <Heart
                          size={13}
                          fill={post.likedByMe ? "currentColor" : "none"}
                          aria-hidden="true"
                        />
                        {post.likeCount}
                      </button>
                      <Link
                        href={`/communities/${community.id}`}
                        className="text-hub-primary-strong hover:text-hub-primary-deep inline-flex items-center gap-1 text-[11px] font-semibold"
                      >
                        Visit community
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  )
}
