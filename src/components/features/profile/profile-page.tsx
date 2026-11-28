"use client"

import Link from "next/link"
import {
  ArrowUpRight,
  MessageCircle,
  UserRoundPlus,
  UsersRound,
} from "lucide-react"
import { CommunityArt } from "@/components/features/shared/community-art"
import { DemoNote } from "@/components/features/shared/demo-note"
import { Avatar } from "@/components/ui/avatar"
import { demoPeople } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"

type ProfilePageProps = {
  personId: string
}

export function ProfilePage({ personId }: ProfilePageProps) {
  const { state, actions } = useDemoPlatform()
  const isCurrentUser = personId === "alex" || personId === "demo"
  const person = demoPeople.find((candidate) => candidate.id === personId)
  const profile = isCurrentUser ? state.profile : person

  if (!profile) return null

  const connected = state.connectedPersonIds.includes(personId)
  const requestReceived = state.receivedRequestIds.includes(personId)
  const requestSent = state.sentRequestIds.includes(personId)
  const communities = state.communities.filter((community) =>
    isCurrentUser
      ? state.joinedCommunityIds.includes(community.id)
      : community.memberIds.includes(personId),
  )
  const activityCount = state.posts.filter((post) =>
    isCurrentUser ? post.authorId === "alex" : post.authorId === personId,
  ).length

  return (
    <div className="mx-auto w-full max-w-[1080px] space-y-6">
      <section className="border-hub-border relative overflow-hidden rounded-2xl border bg-hub-surface">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 overflow-hidden bg-hub-lavender-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1600&q=85"
            alt=""
            className="size-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#342e3b]/10 via-transparent to-white/30" />
        </div>
        <div className="relative px-5 pt-20 pb-6 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 items-end gap-4">
              <Avatar
                name={profile.name}
                size="xl"
                className="size-[76px] border-4 border-white bg-[#e7e2f5] text-2xl text-[#57499a] shadow-sm"
              />
              <div className="min-w-0 pb-1">
                <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.16em] uppercase">
                  {isCurrentUser ? "Your corner of ConnectHub" : person?.role}
                </p>
                <h1                 className="editorial-heading text-hub-title mt-1 truncate text-2xl sm:text-[2rem]">
                  {profile.name}
                </h1>
              </div>
            </div>
            {!isCurrentUser && (
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {connected ? (
                  <Link
                    href={`/messages?person=${personId}`}
                    className="bg-hub-primary hover:bg-hub-primary-hover focus-visible:outline-hub-primary inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                  >
                    <MessageCircle size={14} aria-hidden="true" />
                    Message
                  </Link>
                ) : requestReceived ? (
                  <Link
                    href="/connections"
                    className="bg-hub-primary hover:bg-hub-primary-hover focus-visible:outline-hub-primary inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                  >
                    Review request
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                ) : requestSent ? (
                  <button
                    type="button"
                    onClick={() => actions.cancelConnectionRequest(personId)}
                    className="text-hub-primary hover:bg-hub-primary-wash focus-visible:outline-hub-primary inline-flex min-h-10 items-center gap-2 rounded-full border border-[#ded9ef] px-4 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    Request sent · Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => actions.requestConnection(personId)}
                    className="bg-hub-primary hover:bg-hub-primary-hover focus-visible:outline-hub-primary inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                  >
                    <UserRoundPlus size={14} aria-hidden="true" />
                    Connect
                  </button>
                )}
              </div>
            )}
            {isCurrentUser && (
              <Link
                href="/settings"
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-hub-border-control bg-white px-4 text-xs font-semibold text-hub-primary transition-colors hover:bg-hub-primary-wash"
              >
                Edit profile
              </Link>
            )}
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-[#68656e]">
            {profile.bio}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <Link
                key={interest}
                href="/explore"
                className="text-hub-primary-strong rounded-full bg-[#f1effb] px-3 py-1.5 text-[10px] font-medium transition-colors hover:bg-[#e8e4f8]"
              >
                {interest}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_300px]">
        <section className="border-hub-border rounded-2xl border bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                Shared spaces
              </p>
              <h2 className="text-hub-ink mt-1 text-lg font-semibold tracking-[-0.03em]">
                Communities
              </h2>
            </div>
            <Link
              href="/communities"
              className="text-hub-primary inline-flex items-center gap-1 text-[10px] font-semibold hover:underline"
            >
              Explore
              <ArrowUpRight size={12} aria-hidden="true" />
            </Link>
          </div>
          {communities.length > 0 ? (
            <ul className="divide-hub-divider mt-4 divide-y">
              {communities.map((community) => (
                <li key={community.id} className="flex items-center gap-3 py-3">
                  <CommunityArt
                    community={community}
                    className="size-12 shrink-0 rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/communities/${community.id}`}
                      className="text-hub-heading hover:text-hub-primary block truncate text-xs font-semibold"
                    >
                      {community.name}
                    </Link>
                    <p className="text-hub-muted-strong mt-1 truncate text-[10px]">
                      {community.category}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-[#aaa6af]"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="bg-hub-surface-warm text-hub-muted-strong mt-4 rounded-xl p-4 text-xs leading-5">
              {profile.name.split(" ")[0]} hasn&apos;t joined a sample community
              yet.
            </p>
          )}
        </section>

        <aside className="space-y-5">
          <section className="border-hub-border rounded-2xl border bg-white p-5">
            <h2 className="text-hub-ink text-sm font-semibold">
              A little about
            </h2>
            <p className="text-hub-muted mt-3 text-xs leading-6">
              {isCurrentUser
                ? "Your profile is a small introduction to the things you care about and the communities you call home."
                : person?.bio}
            </p>
          </section>
          <section className="divide-hub-border border-hub-border grid grid-cols-2 divide-x rounded-2xl border bg-white p-5">
            <div className="pr-4">
              <p className="text-hub-ink text-2xl font-semibold tracking-[-0.05em]">
                {communities.length}
              </p>
              <p className="text-hub-muted-strong mt-1 text-[10px]">
                Communities
              </p>
            </div>
            <div className="pl-4">
              <p className="text-hub-ink text-2xl font-semibold tracking-[-0.05em]">
                {activityCount}
              </p>
              <p className="text-hub-muted-strong mt-1 text-[10px]">
                Contributions
              </p>
            </div>
          </section>
          <Link
            href="/connections"
            className="border-hub-border hover:bg-hub-primary-soft flex items-center gap-3 rounded-2xl border bg-[#f7f5fc] p-4 transition-colors"
          >
            <span className="text-hub-primary-mid flex size-9 items-center justify-center rounded-full bg-white">
              <UsersRound size={16} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-hub-heading block text-xs font-semibold">
                {isCurrentUser ? "Your connections" : "Find your people"}
              </span>
              <span className="text-hub-muted-strong mt-1 block text-[10px]">
                {state.connectedPersonIds.length} in your demo network
              </span>
            </span>
            <ArrowUpRight
              size={14}
              className="text-hub-primary-mid"
              aria-hidden="true"
            />
          </Link>
        </aside>
      </div>

      <DemoNote>
        {isCurrentUser
          ? "Your profile is a local demo preview and is not visible to other users."
          : "This sample profile is illustrative and does not represent a real person."}
      </DemoNote>
    </div>
  )
}
