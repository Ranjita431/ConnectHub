"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { EmptyState } from "@/components/feedback/empty-state"
import { CommunityCard } from "@/components/features/shared/community-card"
import { DemoNote } from "@/components/features/shared/demo-note"
import { PageHeader } from "@/components/features/shared/page-header"
import {
  SegmentedTabs,
  TabPanel,
} from "@/components/features/shared/segmented-tabs"
import { useDemoPlatform } from "@/lib/demo-platform-state"

const tabDefinitions = [
  { id: "joined", label: "My communities" },
  { id: "discover", label: "Discover" },
  { id: "categories", label: "Categories" },
]

export function CommunitiesPage() {
  const [activeTab, setActiveTab] = useState("joined")
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All categories")
  const { state } = useDemoPlatform()
  const categories = useMemo(
    () =>
      [...new Set(state.communities.map((item) => item.category))].sort(
        (a, b) => a.localeCompare(b),
      ),
    [state.communities],
  )
  const normalizedQuery = query.trim().toLowerCase()

  const filtered = state.communities.filter((community) => {
    const matchesText =
      !normalizedQuery ||
      `${community.name} ${community.description} ${community.category}`
        .toLowerCase()
        .includes(normalizedQuery)
    const matchesCategory =
      selectedCategory === "All categories" ||
      community.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesText && matchesCategory
  })
  const joined = filtered.filter((community) =>
    state.joinedCommunityIds.includes(community.id),
  )
  const discover = filtered.filter(
    (community) => !state.joinedCommunityIds.includes(community.id),
  )
  const tabs = tabDefinitions.map((tab) => ({
    ...tab,
    count:
      tab.id === "joined"
        ? state.joinedCommunityIds.length
        : tab.id === "discover"
          ? state.communities.length - state.joinedCommunityIds.length
          : categories.length,
  }))

  return (
    <div className="mx-auto w-full max-w-[1320px] space-y-6">
      <PageHeader
        eyebrow="Find your corner"
        title="Communities make the world feel smaller."
        description="A good community starts with a shared interest and grows through the people who show up."
        action={
          <Link
            href="/explore"
            className="bg-hub-night hover:bg-hub-primary focus-visible:outline-hub-primary inline-flex min-h-10 items-center rounded-full px-4 text-xs font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
          >
            Explore all interests
          </Link>
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SegmentedTabs
          ariaLabel="Community views"
          idPrefix="communities"
          items={tabs}
          value={activeTab}
          onChange={setActiveTab}
        />
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Search communities</span>
          <Search
            size={15}
            className="text-hub-subtle pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search communities..."
            className="border-hub-border-control placeholder:text-hub-placeholder focus:border-hub-primary-light focus:ring-hub-accent/10 h-10 w-full rounded-xl border bg-white pr-4 pl-10 text-xs transition-colors outline-none focus:ring-3 motion-reduce:transition-none"
          />
        </label>
      </div>

      <TabPanel idPrefix="communities" value={activeTab} className="space-y-5">
        {(activeTab === "discover" || activeTab === "categories") && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {["All categories", ...categories].map((category) => {
              const isSelected = selectedCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`focus-visible:outline-hub-focus min-h-8 shrink-0 rounded-full border px-3 text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 motion-reduce:transition-none ${
                    isSelected
                      ? "border-hub-primary-border bg-hub-primary-soft text-hub-primary"
                      : "text-hub-muted hover:border-hub-primary-border hover:text-hub-primary border-[#e8e5de] bg-white"
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        )}

        {activeTab === "joined" && (
          <section aria-labelledby="joined-community-heading">
            <div className="mb-4">
              <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                Familiar places
              </p>
              <h2
                id="joined-community-heading"
                className="text-hub-ink mt-1 text-lg font-semibold"
              >
                Your communities
              </h2>
            </div>
            {joined.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {joined.map((community, index) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    featured={index === 0 && joined.length > 2}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Your next community is waiting"
                description="Explore a few spaces and join one that feels like your kind of place."
                action={
                  <button
                    type="button"
                    onClick={() => setActiveTab("discover")}
                    className="text-hub-primary text-xs font-semibold hover:underline"
                  >
                    Discover communities
                  </button>
                }
              />
            )}
          </section>
        )}

        {activeTab === "discover" && (
          <section aria-labelledby="discover-community-heading">
            <div className="mb-4">
              <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                A place to begin
              </p>
              <h2
                id="discover-community-heading"
                className="text-hub-ink mt-1 text-lg font-semibold"
              >
                Spaces to discover
              </h2>
            </div>
            {discover.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {discover.map((community, index) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    featured={index === 0 && discover.length > 2}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No spaces match those filters"
                description="Try another category or search term to find a community."
                action={
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("")
                      setSelectedCategory("All categories")
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

        {activeTab === "categories" && (
          <section aria-label="Community categories" className="space-y-7">
            {categories
              .filter(
                (category) =>
                  selectedCategory === "All categories" ||
                  category === selectedCategory,
              )
              .map((category) => {
                const categoryCommunities = filtered.filter((community) =>
                  community.category
                    .toLowerCase()
                    .includes(category.toLowerCase()),
                )
                if (!categoryCommunities.length) return null
                return (
                  <div key={category}>
                    <div className="mb-3 flex items-baseline justify-between gap-3">
                      <h2 className="text-hub-ink text-lg font-semibold">
                        {category}
                      </h2>
                      <span className="text-hub-subtle text-[10px]">
                        {categoryCommunities.length}{" "}
                        {categoryCommunities.length === 1
                          ? "community"
                          : "communities"}
                      </span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {categoryCommunities.map((community) => (
                        <CommunityCard
                          key={community.id}
                          community={community}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            {filtered.length === 0 && (
              <EmptyState
                title="No communities in that category"
                description="Clear the filters to see all available community previews."
                action={
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("")
                      setSelectedCategory("All categories")
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
        Community names, memberships, and counts are sample data. Join and leave
        changes are only kept in this running demo.
      </DemoNote>
    </div>
  )
}
