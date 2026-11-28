"use client"

import { ArrowRight, Compass, MessageCircle, UsersRound } from "lucide-react"
import Link from "next/link"
import { ActivityFeed } from "./activity-feed"
import { CommunityDiscovery } from "./community-discovery"
import { PeopleSuggestions } from "./people-suggestions"
import { useDemoPlatform } from "@/lib/demo-platform-state"

const quickLinks = [
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Connections", href: "/connections", icon: UsersRound },
  { label: "Messages", href: "/messages", icon: MessageCircle },
]

function WelcomePanel({ firstName }: { firstName: string }) {
  return (
    <section
      aria-labelledby="dashboard-title"
      className="bg-hub-night relative isolate overflow-hidden rounded-2xl px-5 py-7 text-white sm:px-8 sm:py-9"
    >
      <div className="relative z-10 max-w-2xl">
        <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] text-[#cbc1f0] uppercase">
          <span className="size-1.5 rounded-full bg-[#d8b8c2]" aria-hidden="true" />
          Your ConnectHub space
        </p>
        <h1
          id="dashboard-title"
          className="editorial-heading mt-3 text-[1.85rem] leading-tight text-white sm:text-[2.25rem]"
        >
          Good to see you, {firstName}.
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
          Find a fresh idea, drop into a community, or meet someone who gets
          what you&apos;re into.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            href="/explore"
            className="bg-hub-night-foreground text-hub-night-ink inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
          >
            Explore your interests
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link
            href="/connections"
            className="inline-flex min-h-10 items-center rounded-full border border-white/25 px-4 text-xs font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
          >
            Find people
          </Link>
        </div>
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-5 hidden h-[170px] w-[280px] -translate-y-1/2 opacity-70 lg:block"
        viewBox="0 0 280 170"
        fill="none"
      >
        <path
          d="M32 43C88 14 166 20 244 55M30 43C75 94 131 118 218 126M244 55C235 82 227 103 218 126"
          stroke="#d8cbdc"
          strokeOpacity=".42"
          strokeDasharray="3 7"
        />
        <circle cx="32" cy="43" r="13" fill="#d8cbdc" fillOpacity=".2" />
        <circle cx="32" cy="43" r="4" fill="#d9d2fa" />
        <circle cx="244" cy="55" r="19" fill="#d9c8dc" fillOpacity=".16" />
        <circle cx="244" cy="55" r="5" fill="#e2d4e5" />
        <circle cx="218" cy="126" r="14" fill="#c9959f" fillOpacity=".18" />
        <circle cx="218" cy="126" r="4" fill="#d6adb5" />
        <circle cx="132" cy="78" r="3" fill="#d6adb5" />
      </svg>
    </section>
  )
}

function QuickAccess() {
  return (
    <nav
      aria-label="Quick access"
      className="border-hub-border flex flex-wrap items-center gap-x-2 gap-y-2 border-b pb-5"
    >
      <span className="text-hub-muted mr-1 text-[10px] font-semibold tracking-[0.14em] uppercase">
        Jump into
      </span>
      {quickLinks.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="text-hub-primary focus-visible:outline-hub-primary inline-flex min-h-9 items-center gap-2 rounded-full border border-[#e6e2d9] bg-white/70 px-3 text-xs font-medium transition-colors hover:border-[#c9c0f1] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
        >
          <Icon size={14} aria-hidden="true" />
          {label}
        </Link>
      ))}
    </nav>
  )
}

export function DashboardHome() {
  const { state } = useDemoPlatform()
  const firstName = state.profile.name.trim().split(/\s+/)[0] || "friend"

  return (
    <div className="bg-hub-canvas -mx-4 -my-6 min-h-full px-4 py-6 sm:-mx-8 sm:px-8 sm:py-7 lg:pb-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-5">
        <WelcomePanel firstName={firstName} />
        <QuickAccess />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(270px,0.8fr)]">
          <ActivityFeed />
          <aside
            aria-label="Discover people and communities"
            className="min-w-0 space-y-6"
          >
            <CommunityDiscovery />
            <PeopleSuggestions />
          </aside>
        </div>
        <p className="text-hub-muted pb-2 text-center text-[10px] leading-5">
          Demo workspace · Sample activity and profiles are illustrative;
          nothing is saved.
        </p>
      </div>
    </div>
  )
}
