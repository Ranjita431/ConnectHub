"use client"

import {
  useMemo,
  useState,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Search } from "lucide-react"
import { demoPeople, demoInterests } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"

type SearchResult = {
  label: string
  href: string
  description: string
  kind: string
  searchText: string
}

const destinations: SearchResult[] = [
  {
    label: "Explore",
    href: "/explore",
    description: "Discover people and interests",
    kind: "Page",
    searchText: "discover people interests",
  },
  {
    label: "Connections",
    href: "/connections",
    description: "People in your network",
    kind: "Page",
    searchText: "friends people network",
  },
  {
    label: "Messages",
    href: "/messages",
    description: "Your conversation previews",
    kind: "Page",
    searchText: "chat conversation",
  },
  {
    label: "Notifications",
    href: "/notifications",
    description: "Updates from your demo network",
    kind: "Page",
    searchText: "updates activity",
  },
  {
    label: "Moments",
    href: "/moments",
    description: "Watch short community stories",
    kind: "Page",
    searchText: "video short reel",
  },
  {
    label: "Settings",
    href: "/settings",
    description: "Profile and privacy preferences",
    kind: "Page",
    searchText: "preferences account",
  },
]

export function AppSearch() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { state } = useDemoPlatform()
  const normalizedQuery = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!normalizedQuery) return destinations.slice(0, 4)

    const communities: SearchResult[] = state.communities.map((community) => ({
      label: community.name,
      href: `/communities/${community.id}`,
      description: `Community · ${community.category}`,
      kind: "Community",
      searchText: `${community.name} ${community.category} ${community.description}`,
    }))
    const people: SearchResult[] = demoPeople.map((person) => ({
      label: person.name,
      href: `/profile/${person.id}`,
      description: `Person · ${person.role}`,
      kind: "Person",
      searchText: `${person.name} ${person.role} ${person.bio} ${person.interests.join(" ")}`,
    }))
    const interests = [
      ...new Set([
        ...demoInterests,
        ...demoPeople.flatMap((person) => person.interests),
      ]),
    ].map((interest): SearchResult => ({
      label: interest,
      href: `/explore?interest=${encodeURIComponent(interest)}`,
      description: "Interest · Browse people and communities",
      kind: "Interest",
      searchText: interest,
    }))

    return [...communities, ...people, ...interests, ...destinations]
      .filter((result) =>
        `${result.label} ${result.description} ${result.searchText}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 8)
  }, [normalizedQuery, state.communities])

  function navigateToFirstMatch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!results[0]) return

    router.push(results[0].href)
    setIsOpen(false)
    setQuery("")
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") setIsOpen(false)
  }

  function closeWhenFocusLeaves(event: FocusEvent<HTMLFormElement>) {
    const nextTarget = event.relatedTarget
    if (
      !(nextTarget instanceof Node) ||
      !event.currentTarget.contains(nextTarget)
    ) {
      setIsOpen(false)
    }
  }

  return (
    <form
      role="search"
      onSubmit={navigateToFirstMatch}
      onBlur={closeWhenFocusLeaves}
      className="relative w-full max-w-[520px] min-w-0"
    >
      <label htmlFor="app-search" className="sr-only">
        Search people, communities, and interests
      </label>
      <Search
        size={17}
        className="text-hub-subtle pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
        aria-hidden="true"
      />
      <input
        id="app-search"
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Find people, spaces, interests..."
        aria-label="Search people, communities, and interests"
        aria-controls="app-search-suggestions"
        autoComplete="off"
        className="border-hub-border-control bg-hub-input-surface text-hub-ink placeholder:text-hub-placeholder focus:border-hub-primary-light focus:ring-hub-accent/10 h-10 w-full rounded-xl border pr-4 pl-10 text-[12px] transition-colors outline-none hover:border-hub-primary-border focus:bg-hub-surface focus:ring-3 motion-reduce:transition-none sm:h-11 sm:text-[13px]"
      />

      {isOpen && (
        <div
          id="app-search-suggestions"
          aria-live="polite"
          className="border-hub-border-control absolute top-full left-0 z-50 mt-2 w-[min(88vw,32rem)] overflow-hidden rounded-xl border bg-white p-2 shadow-xl shadow-[#272238]/10 sm:w-full"
        >
          <p className="text-hub-subtle-alt px-2.5 py-2 text-[9px] font-semibold tracking-[0.14em] uppercase">
            {normalizedQuery ? "Matching demo data" : "Quick destinations"}
          </p>
          {results.length > 0 ? (
            <ul className="space-y-0.5">
              {results.map((result) => (
                <li key={`${result.kind}-${result.href}`}>
                  <Link
                    href={result.href}
                    onClick={() => {
                      setIsOpen(false)
                      setQuery("")
                    }}
                    className="hover:bg-hub-primary-wash focus-visible:outline-hub-accent flex items-center justify-between gap-3 rounded-lg px-2.5 py-2.5 transition-colors focus-visible:outline-2 motion-reduce:transition-none"
                  >
                    <span className="min-w-0">
                      <span className="text-hub-ink block truncate text-xs font-semibold">
                        {result.label}
                      </span>
                      <span className="text-hub-muted-strong mt-0.5 block truncate text-[10px]">
                        {result.description}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="text-hub-placeholder text-[9px]">
                        {result.kind}
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-hub-accent"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-hub-muted px-2.5 py-3 text-xs">
              No matches in the illustrative demo data.
            </p>
          )}
          <p className="border-hub-divider-soft text-hub-placeholder border-t px-2.5 pt-2.5 pb-1 text-[9px]">
            Demo search · No live users or server data is searched
          </p>
        </div>
      )}
    </form>
  )
}
