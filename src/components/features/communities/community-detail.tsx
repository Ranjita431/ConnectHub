"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Heart, Plus, UsersRound } from "lucide-react"
import { EmptyState } from "@/components/feedback/empty-state"
import { CommunityArt } from "@/components/features/shared/community-art"
import { DemoNote } from "@/components/features/shared/demo-note"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { demoPeople } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"

export function CommunityDetail({ communityId }: { communityId: string }) {
  const [message, setMessage] = useState("")
  const { state, actions } = useDemoPlatform()
  const community = state.communities.find((item) => item.id === communityId)
  const isJoined = state.joinedCommunityIds.includes(communityId)

  if (!community) {
    return (
      <EmptyState
        title="This community is unavailable"
        description="This sample space could not be found in the current demo."
        action={
          <Link
            href="/communities"
            className="text-hub-primary text-xs font-semibold hover:underline"
          >
            Back to communities
          </Link>
        }
      />
    )
  }

  const posts = state.posts.filter((post) => post.communityId === community.id)
  const members = community.memberIds.flatMap((id) => {
    const person = demoPeople.find((candidate) => candidate.id === id)
    return person ? [person] : []
  })

  function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!message.trim()) return
    actions.createPost(communityId, message)
    setMessage("")
  }

  return (
    <div className="mx-auto w-full max-w-[1240px] space-y-6">
      <Link
        href="/communities"
        className="text-hub-muted hover:text-hub-primary inline-flex min-h-8 items-center gap-2 text-xs font-semibold"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        All communities
      </Link>

      <section className="border-hub-border overflow-hidden rounded-[1.4rem] border bg-white">
        <CommunityArt community={community} className="h-36 sm:h-48" />
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-7">
          <div className="min-w-0">
            <Badge
              variant="outline"
              className="bg-hub-surface-soft text-hub-primary-muted border-[#e4dfef] text-[10px]"
            >
              {community.category}
            </Badge>
            <h1 className="text-hub-title mt-3 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
              {community.name}
            </h1>
            <p className="text-hub-muted mt-2 max-w-2xl text-sm leading-6">
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
            className={`focus-visible:outline-hub-primary inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none ${
              isJoined
                ? "bg-hub-primary-faint text-hub-primary hover:bg-hub-primary-hover-wash"
                : "bg-hub-primary hover:bg-hub-primary-hover text-white"
            }`}
          >
            {isJoined ? (
              <Check size={14} aria-hidden="true" />
            ) : (
              <Plus size={14} aria-hidden="true" />
            )}
            {isJoined ? "Joined" : "Join community"}
          </button>
        </div>
        <div className="border-hub-divider text-hub-muted flex flex-wrap items-center gap-x-5 gap-y-3 border-t px-5 py-4 text-xs sm:px-7">
          <span className="inline-flex items-center gap-2">
            <UsersRound size={15} aria-hidden="true" />
            {community.memberCount.toLocaleString()} members
          </span>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {members.slice(0, 4).map((person) => (
                <Avatar
                  key={person.id}
                  name={person.name}
                  size="sm"
                  className={`ring-2 ring-white ${person.color}`}
                />
              ))}
            </div>
            <span>Some of the people here</span>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.75fr)]">
        <section aria-labelledby="community-discussions-heading">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                From the community
              </p>
              <h2
                id="community-discussions-heading"
                className="text-hub-title mt-1 text-xl font-semibold tracking-[-0.035em]"
              >
                Conversations
              </h2>
            </div>
            <Badge
              variant="secondary"
              className="bg-hub-primary-soft text-hub-primary"
            >
              Demo posts
            </Badge>
          </div>

          {isJoined && (
            <form
              onSubmit={submitPost}
              className="border-hub-border mb-4 rounded-2xl border bg-white p-4 sm:p-5"
            >
              <label
                htmlFor="community-post"
                className="text-hub-ink text-xs font-semibold"
              >
                Add a thought to the conversation
              </label>
              <Textarea
                id="community-post"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={280}
                placeholder={`Share something with ${community.name}...`}
                className="border-hub-border-control bg-hub-input-surface focus-visible:border-hub-primary-light focus-visible:ring-hub-accent/10 mt-3 min-h-24 resize-y text-sm shadow-none"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-hub-subtle text-[10px]">
                  {message.length}/280 · Local demo post
                </span>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="bg-hub-primary hover:bg-hub-primary-hover min-h-9 rounded-full px-4 text-[11px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
                >
                  Share thought
                </button>
              </div>
            </form>
          )}

          {posts.length > 0 ? (
            <div className="border-hub-border overflow-hidden rounded-2xl border bg-white">
              {posts.map((post, index) => {
                const author = demoPeople.find(
                  (person) => person.id === post.authorId,
                )
                const authorName =
                  post.authorId === "alex"
                    ? state.profile.name
                    : (author?.name ?? "ConnectHub member")
                const authorColor =
                  author?.color ??
                  "bg-hub-avatar-lavender text-hub-avatar-lavender-ink"

                return (
                  <article
                    key={post.id}
                    className={`p-4 sm:p-5 ${index > 0 ? "border-hub-divider border-t" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        name={authorName}
                        size="md"
                        className={authorColor}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-hub-ink text-sm font-semibold">
                            {authorName}
                          </span>
                          <span className="text-hub-subtle text-[10px]">
                            {post.createdAt}
                          </span>
                        </div>
                        {post.prompt && (
                          <p className="text-hub-caption mt-3 text-[10px] font-semibold tracking-[0.1em] uppercase">
                            {post.prompt}
                          </p>
                        )}
                        <p className="text-hub-body mt-2 text-sm leading-6">
                          {post.message}
                        </p>
                        <button
                          type="button"
                          aria-pressed={post.likedByMe}
                          aria-label={`${post.likedByMe ? "Unlike" : "Like"} post by ${authorName}`}
                          onClick={() => actions.togglePostLike(post.id)}
                          className={`mt-4 inline-flex min-h-8 items-center gap-1.5 rounded-full px-2.5 text-[10px] font-semibold transition-colors motion-reduce:transition-none ${
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
                          {post.likeCount} appreciations
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <EmptyState
              title="Start the first conversation"
              description="A question, a small discovery, or a work in progress can get things going."
            />
          )}
        </section>

        <aside className="space-y-4">
          <section className="border-hub-border rounded-2xl border bg-white p-5">
            <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
              A little about this space
            </p>
            <h2 className="text-hub-ink mt-1 text-lg font-semibold">
              {community.name}
            </h2>
            <p className="text-hub-muted mt-2 text-xs leading-5">
              {community.description}
            </p>
            <div className="border-hub-divider mt-4 border-t pt-4">
              <span className="text-hub-subtle text-[10px] font-semibold tracking-[0.12em] uppercase">
                Topic
              </span>
              <p className="text-hub-primary mt-1 text-xs font-medium">
                {community.category}
              </p>
            </div>
            <div className="border-hub-divider mt-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <span className="text-hub-subtle text-[10px] font-semibold tracking-[0.12em] uppercase">
                  Familiar faces
                </span>
                <Link
                  href="/explore"
                  className="text-hub-primary text-[10px] font-semibold hover:underline"
                >
                  Meet more
                </Link>
              </div>
              <div className="mt-3 space-y-3">
                {members.slice(0, 3).map((person) => (
                  <Link
                    key={person.id}
                    href={`/profile/${person.id}`}
                    className="focus-visible:outline-hub-focus flex items-center gap-2.5 rounded-lg focus-visible:outline-2"
                  >
                    <Avatar
                      name={person.name}
                      size="sm"
                      className={person.color}
                    />
                    <span className="min-w-0">
                      <span className="text-hub-ink block truncate text-xs font-semibold">
                        {person.name}
                      </span>
                      <span className="text-hub-subtle mt-0.5 block truncate text-[10px]">
                        {person.role}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          {!isJoined && (
            <div className="bg-hub-night rounded-2xl p-5 text-white">
              <h2 className="text-sm font-semibold">
                This feels like your kind of place?
              </h2>
              <p className="mt-1 text-xs leading-5 text-white/70">
                Join to share a thought in this sample community.
              </p>
              <button
                type="button"
                onClick={() => actions.joinCommunity(community.id)}
                className="bg-hub-night-foreground text-hub-night-ink mt-4 min-h-9 rounded-full px-4 text-[11px] font-semibold hover:bg-white"
              >
                Join {community.name}
              </button>
            </div>
          )}
        </aside>
      </div>

      <DemoNote>
        Posts and membership are illustrative and only updated in this browser
        session. Nothing is published or sent to real members.
      </DemoNote>
    </div>
  )
}
