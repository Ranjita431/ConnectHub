"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Compass, Search, SlidersHorizontal, X } from "lucide-react"
import { EmptyState } from "@/components/feedback/empty-state"
import { CommunityCard } from "@/components/features/shared/community-card"
import { DemoNote } from "@/components/features/shared/demo-note"
import { PageHeader } from "@/components/features/shared/page-header"
import { PersonCard } from "@/components/features/shared/person-card"
import {
  SegmentedTabs,
  TabPanel,
} from "@/components/features/shared/segmented-tabs"
import { Badge } from "@/components/ui/badge"
import { demoInterests, demoPeople } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"

const exploreTabs = [
  { id: "all", label: "Everything" },
  { id: "communities", label: "Communities" },
  { id: "people", label: "People" },
]

export function ExplorePage() {
  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { state } = useDemoPlatform()
  const selectedInterest = searchParams.get("interest") ?? "All interests"
  const normalizedQuery = query.trim().toLowerCase()

  const interests = useMemo(
    () =>
      [
        ...new Set([
          ...demoInterests,
          ...demoPeople.flatMap((person) => person.interests),
        ]),
      ].sort((a, b) => a.localeCompare(b)),
    [],
  )

  const matchesInterest = (values: string[]) =>
    selectedInterest === "All interests" ||
    values.some((value) =>
      value.toLowerCase().includes(selectedInterest.toLowerCase()),
    )

  const communities = state.communities.filter((community) => {
    const communityText =
      `${community.name} ${community.description} ${community.category}`.toLowerCase()
    const matchingMembers = community.memberIds.some((id) => {
      const person = demoPeople.find((candidate) => candidate.id === id)
      return person
        ? matchesInterest(person.interests) &&
            (!normalizedQuery ||
              `${person.name} ${person.role} ${person.interests.join(" ")}`
                .toLowerCase()
                .includes(normalizedQuery))
        : false
    })

    return (
      (matchesInterest([community.category]) ||
        (selectedInterest !== "All interests" && matchingMembers)) &&
      (!normalizedQuery ||
        communityText.includes(normalizedQuery) ||
        matchingMembers)
    )
  })

  const people = demoPeople.filter((person) => {
    const personText =
      `${person.name} ${person.role} ${person.bio} ${person.interests.join(" ")}`.toLowerCase()
    const relationshipIsAvailable =
      !state.connectedPersonIds.includes(person.id) &&
      !state.receivedRequestIds.includes(person.id) &&
      !state.sentRequestIds.includes(person.id)

    return (
      relationshipIsAvailable &&
      matchesInterest(person.interests) &&
      (!normalizedQuery || personText.includes(normalizedQuery))
    )
  })

  function chooseInterest(interest: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (interest === "All interests") params.delete("interest")
    else params.set("interest", interest)
    const suffix = params.toString()
    router.replace(suffix ? `${pathname}?${suffix}` : pathname, {
      scroll: false,
    })
  }

  const tabs = exploreTabs.map((tab) => ({
    ...tab,
    count:
      tab.id === "communities"
        ? communities.length
        : tab.id === "people"
          ? people.length
          : communities.length + people.length,
  }))

  return (
    <div className="mx-auto w-full max-w-[1440px] space-y-7">
      <PageHeader
        eyebrow="Find your people"
        title="Explore the things that connect us."
        description="Follow a shared interest, find a new corner of the community, or meet someone with a different story."
        action={
          <Link
            href="/communities"
            className="bg-hub-night hover:bg-hub-primary focus-visible:outline-hub-primary inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
          >
            Browse all communities
            <Compass size={14} aria-hidden="true" />
          </Link>
        }
      />

      <section
        aria-label="Explore filters"
        className="border-hub-border space-y-4 rounded-2xl border bg-white p-4 sm:p-5"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block min-w-0 flex-1 md:max-w-xl">
            <span className="sr-only">Search people and communities</span>
            <Search
              size={16}
              className="text-hub-subtle pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search names, topics, or ideas..."
              className="border-hub-border-control bg-hub-input-surface text-hub-ink placeholder:text-hub-placeholder focus:border-hub-primary-light focus:ring-hub-accent/10 h-11 w-full rounded-xl border pr-10 pl-10 text-sm transition-colors outline-none focus:bg-white focus:ring-3 motion-reduce:transition-none"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="text-hub-subtle hover:text-hub-ink focus-visible:outline-hub-focus absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 hover:bg-[#eeece8] focus-visible:outline-2"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </label>
          <div className="text-hub-subtle flex items-center gap-2 text-[10px]">
            <SlidersHorizontal size={14} aria-hidden="true" />
            <span>{communities.length + people.length} demo matches</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-hub-muted mt-2 shrink-0 text-[10px] font-semibold tracking-[0.12em] uppercase">
            Interests
          </span>
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
            {["All interests", ...interests].map((interest) => {
              const isSelected = selectedInterest === interest
              return (
                <button
                  key={interest}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => chooseInterest(interest)}
                  className={`focus-visible:outline-hub-focus min-h-8 shrink-0 rounded-full border px-3 text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 motion-reduce:transition-none ${
                    isSelected
                      ? "border-hub-primary-border bg-hub-primary-soft text-hub-primary"
                      : "text-hub-muted hover:border-hub-primary-border hover:text-hub-primary border-[#e8e5de] bg-white"
                  }`}
                >
                  {interest}
                </button>
              )
            })}
          </div>
        </div>

        {selectedInterest !== "All interests" && (
          <div className="border-hub-divider-soft flex items-center gap-2 border-t pt-3">
            <Badge
              variant="secondary"
              className="bg-hub-primary-soft text-hub-primary"
            >
              {selectedInterest}
            </Badge>
            <button
              type="button"
              onClick={() => chooseInterest("All interests")}
              className="text-hub-muted hover:text-hub-primary text-[10px] font-semibold"
            >
              Clear filter
            </button>
          </div>
        )}
      </section>

      <SegmentedTabs
        ariaLabel="Explore results"
        idPrefix="explore"
        items={tabs}
        value={activeTab}
        onChange={setActiveTab}
      />

      <TabPanel idPrefix="explore" value={activeTab} className="space-y-8">
        {(activeTab === "all" || activeTab === "communities") && (
          <section aria-labelledby="explore-communities-title">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                  Shared interests, shared space
                </p>
                <h2
                  id="explore-communities-title"
                  className="text-hub-title mt-1 text-xl font-semibold tracking-[-0.035em]"
                >
                  Communities to step into
                </h2>
              </div>
              <Link
                href="/communities"
                className="text-hub-primary-strong hover:text-hub-primary-deep text-[11px] font-semibold"
              >
                All communities
              </Link>
            </div>
            {communities.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {communities.map((community, index) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    featured={index === 0 && communities.length > 2}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No communities match that yet"
                description="Try another search or clear the interest filter to see all of the demo spaces."
                action={
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("")
                      chooseInterest("All interests")
                    }}
                    className="text-hub-primary text-xs font-semibold hover:underline"
                  >
                    Clear filters
                  </button>
                }
              />
            )}
          </section>
        )}

        {(activeTab === "all" || activeTab === "people") && (
          <section aria-labelledby="explore-people-title">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                  Meet someone new
                </p>
                <h2
                  id="explore-people-title"
                  className="text-hub-title mt-1 text-xl font-semibold tracking-[-0.035em]"
                >
                  People with a point of connection
                </h2>
              </div>
              <Link
                href="/connections"
                className="text-hub-primary-strong hover:text-hub-primary-deep text-[11px] font-semibold"
              >
                Your network
              </Link>
            </div>
            {people.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {people.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No people match those filters"
                description="Try a different search or interest to discover more sample profiles."
                action={
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("")
                      chooseInterest("All interests")
                    }}
                    className="text-hub-primary text-xs font-semibold hover:underline"
                  >
                    Clear filters
                  </button>
                }
              />
            )}
          </section>
        )}
      </TabPanel>

      <DemoNote>
        Profiles and communities are illustrative. Connection and join actions
        update this in-memory demo only.
      </DemoNote>
    </div>
  )
}
