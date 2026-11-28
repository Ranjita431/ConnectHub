"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Check, MessageCircle, Search, UserRoundX, X } from "lucide-react"
import { EmptyState } from "@/components/feedback/empty-state"
import { DemoNote } from "@/components/features/shared/demo-note"
import { PageHeader } from "@/components/features/shared/page-header"
import { PersonCard } from "@/components/features/shared/person-card"
import {
  SegmentedTabs,
  TabPanel,
} from "@/components/features/shared/segmented-tabs"
import { Avatar } from "@/components/ui/avatar"
import { demoPeople } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"

const tabDefinitions = [
  { id: "connections", label: "Connections" },
  { id: "received", label: "Received" },
  { id: "sent", label: "Sent" },
  { id: "suggestions", label: "Suggestions" },
]

function findPeople(ids: string[]) {
  return ids.flatMap((id) => {
    const person = demoPeople.find((candidate) => candidate.id === id)
    return person ? [person] : []
  })
}

export function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState("connections")
  const [query, setQuery] = useState("")
  const [confirmRemovalId, setConfirmRemovalId] = useState<string | null>(null)
  const { state, actions } = useDemoPlatform()
  const normalizedQuery = query.trim().toLowerCase()

  const connectedPeople = useMemo(
    () => findPeople(state.connectedPersonIds),
    [state.connectedPersonIds],
  )
  const receivedPeople = useMemo(
    () => findPeople(state.receivedRequestIds),
    [state.receivedRequestIds],
  )
  const sentPeople = useMemo(
    () => findPeople(state.sentRequestIds),
    [state.sentRequestIds],
  )
  const suggestions = demoPeople.filter(
    (person) =>
      !state.connectedPersonIds.includes(person.id) &&
      !state.receivedRequestIds.includes(person.id) &&
      !state.sentRequestIds.includes(person.id),
  )

  const matches = (person: (typeof demoPeople)[number]) =>
    `${person.name} ${person.role} ${person.interests.join(" ")}`
      .toLowerCase()
      .includes(normalizedQuery)

  const visibleConnected = connectedPeople.filter(matches)
  const visibleReceived = receivedPeople.filter(matches)
  const visibleSent = sentPeople.filter(matches)
  const visibleSuggestions = suggestions.filter(matches)
  const tabs = tabDefinitions.map((tab) => ({
    ...tab,
    count:
      tab.id === "connections"
        ? connectedPeople.length
        : tab.id === "received"
          ? receivedPeople.length
          : tab.id === "sent"
            ? sentPeople.length
            : suggestions.length,
  }))

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6">
      <PageHeader
        eyebrow="Your people"
        title="Connections, with room to grow."
        description="Keep up with the people you know, respond to invitations, and find new points of connection."
        action={
          <Link
            href="/explore"
            className="bg-hub-night hover:bg-hub-primary focus-visible:outline-hub-primary inline-flex min-h-10 items-center rounded-full px-4 text-xs font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
          >
            Discover people
          </Link>
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SegmentedTabs
          ariaLabel="Connection lists"
          idPrefix="connections"
          items={tabs}
          value={activeTab}
          onChange={(value) => {
            setActiveTab(value)
            setConfirmRemovalId(null)
          }}
        />
        <label className="relative block w-full lg:max-w-xs">
          <span className="sr-only">Search connections</span>
          <Search
            size={15}
            className="text-hub-subtle pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search people..."
            className="border-hub-border-control placeholder:text-hub-placeholder focus:border-hub-primary-light focus:ring-hub-accent/10 h-10 w-full rounded-xl border bg-white pr-4 pl-10 text-xs transition-colors outline-none focus:ring-3 motion-reduce:transition-none"
          />
        </label>
      </div>

      <TabPanel
        idPrefix="connections"
        value={activeTab}
        className="border-hub-border min-h-64 rounded-2xl border bg-white p-4 sm:p-6"
      >
        {activeTab === "connections" && (
          <section aria-label="Your connections">
            <div className="mb-4">
              <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                Good to stay in touch
              </p>
              <h2 className="text-hub-ink mt-1 text-lg font-semibold">
                Your network
              </h2>
            </div>
            {visibleConnected.length ? (
              <ul className="divide-hub-divider divide-y">
                {visibleConnected.map((person) => (
                  <li
                    key={person.id}
                    className="flex flex-wrap items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <Avatar
                      name={person.name}
                      size="md"
                      className={person.color}
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/profile/${person.id}`}
                        className="text-hub-ink hover:text-hub-primary text-sm font-semibold"
                      >
                        {person.name}
                      </Link>
                      <p className="text-hub-muted mt-0.5 truncate text-xs">
                        {person.role} ·{" "}
                        {person.interests.slice(0, 2).join(", ")}
                      </p>
                    </div>
                    {confirmRemovalId === person.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-hub-muted text-[10px]">
                          Remove this connection?
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            actions.removeConnection(person.id)
                            setConfirmRemovalId(null)
                          }}
                          className="bg-hub-danger-soft min-h-9 rounded-full px-3 text-[10px] font-semibold text-[#9b3e50] hover:bg-[#f7dce0]"
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          aria-label="Cancel removing connection"
                          onClick={() => setConfirmRemovalId(null)}
                          className="text-hub-muted hover:bg-hub-neutral-hover flex size-9 items-center justify-center rounded-full"
                        >
                          <X size={14} aria-hidden="true" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/messages?person=${person.id}`}
                          className="bg-hub-primary-soft text-hub-primary hover:bg-hub-primary-hover-wash inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[10px] font-semibold"
                        >
                          <MessageCircle size={13} aria-hidden="true" />
                          Message
                        </Link>
                        <button
                          type="button"
                          aria-label={`Remove ${person.name} from connections`}
                          onClick={() => setConfirmRemovalId(person.id)}
                          className="text-hub-subtle hover:bg-hub-neutral-hover flex size-9 items-center justify-center rounded-full hover:text-[#8e4653]"
                        >
                          <UserRoundX size={15} aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="Your network is ready to grow"
                description="Connect with people who share an interest or a good conversation."
                action={
                  <Link
                    href="/explore"
                    className="text-hub-primary text-xs font-semibold hover:underline"
                  >
                    Explore people
                  </Link>
                }
              />
            )}
          </section>
        )}

        {activeTab === "received" && (
          <section aria-label="Received connection requests">
            <div className="mb-4">
              <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                Your next conversation
              </p>
              <h2 className="text-hub-ink mt-1 text-lg font-semibold">
                Requests for you
              </h2>
            </div>
            {visibleReceived.length ? (
              <ul className="space-y-3">
                {visibleReceived.map((person) => (
                  <li
                    key={person.id}
                    className="border-hub-divider flex flex-wrap items-center gap-3 rounded-xl border p-3 sm:p-4"
                  >
                    <Avatar
                      name={person.name}
                      size="md"
                      className={person.color}
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/profile/${person.id}`}
                        className="text-hub-ink hover:text-hub-primary text-sm font-semibold"
                      >
                        {person.name}
                      </Link>
                      <p className="text-hub-muted mt-0.5 text-xs">
                        {person.role}
                      </p>
                      <p className="text-hub-primary-mid mt-1 text-[10px]">
                        {person.interests.slice(0, 3).join(" · ")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => actions.declineConnection(person.id)}
                        className="border-hub-border text-hub-muted hover:bg-hub-canvas min-h-9 rounded-full border px-3 text-[10px] font-semibold"
                      >
                        Decline
                      </button>
                      <button
                        type="button"
                        onClick={() => actions.acceptConnection(person.id)}
                        className="bg-hub-primary hover:bg-hub-primary-hover inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[10px] font-semibold text-white"
                      >
                        <Check size={13} aria-hidden="true" />
                        Accept
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="No new requests"
                description="When someone asks to connect, you can review it here."
              />
            )}
          </section>
        )}

        {activeTab === "sent" && (
          <section aria-label="Sent connection requests">
            <div className="mb-4">
              <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                No rush
              </p>
              <h2 className="text-hub-ink mt-1 text-lg font-semibold">
                Requests you sent
              </h2>
            </div>
            {visibleSent.length ? (
              <div className="divide-hub-divider divide-y">
                {visibleSent.map((person) => (
                  <PersonCard key={person.id} person={person} compact />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No pending requests"
                description="Requests you send will stay here until they are accepted or cancelled."
              />
            )}
          </section>
        )}

        {activeTab === "suggestions" && (
          <section aria-label="People suggestions">
            <div className="mb-4">
              <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
                A few new faces
              </p>
              <h2 className="text-hub-ink mt-1 text-lg font-semibold">
                People you may connect with
              </h2>
            </div>
            {visibleSuggestions.length ? (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {visibleSuggestions.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No suggestions match"
                description="Clear your search or visit Explore to discover more sample profiles."
                action={
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="text-hub-primary text-xs font-semibold hover:underline"
                  >
                    Clear search
                  </button>
                }
              />
            )}
          </section>
        )}
      </TabPanel>

      <DemoNote>
        Connection requests and relationship changes are local examples only.
      </DemoNote>
    </div>
  )
}
