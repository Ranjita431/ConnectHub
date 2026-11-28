"use client"

import Link from "next/link"
import { UserRoundPlus } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { ConnectionActionButton } from "@/components/features/shared/connection-action-button"
import { demoPeople } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"

export function PeopleSuggestions() {
  const { state } = useDemoPlatform()
  const suggestions = demoPeople
    .filter(
      (person) =>
        !state.connectedPersonIds.includes(person.id) &&
        !state.receivedRequestIds.includes(person.id) &&
        !state.sentRequestIds.includes(person.id),
    )
    .slice(0, 3)

  return (
    <section
      aria-labelledby="people-title"
      className="border-hub-border rounded-2xl border bg-white p-4 sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.14em] uppercase">
            People to meet
          </p>
          <h2
            id="people-title"
            className="text-hub-title mt-1 text-lg font-semibold tracking-[-0.03em]"
          >
            Find your people
          </h2>
        </div>
        <UserRoundPlus
          size={17}
          className="mt-1 text-[#7667bc]"
          aria-hidden="true"
        />
      </div>
      <p className="text-hub-muted mt-1 text-[11px] leading-5">
        Sample profiles · requests stay in this demo.
      </p>

      <ul className="mt-4 space-y-4">
        {suggestions.map((person) => (
          <li key={person.id} className="flex items-center gap-2.5">
            <Link
              href={`/profile/${person.id}`}
              aria-label={`View ${person.name}'s profile`}
            >
              <Avatar name={person.name} size="md" className={person.color} />
            </Link>
            <div className="min-w-0 flex-1">
              <p className="text-hub-title truncate text-xs font-semibold">
                <Link
                  href={`/profile/${person.id}`}
                  className="hover:text-hub-primary"
                >
                  {person.name}
                </Link>
              </p>
              <p className="text-hub-muted mt-0.5 truncate text-[10px]">
                {person.role}
              </p>
              <p className="text-hub-primary-mid mt-1 truncate text-[9px] font-medium">
                {person.interests.join(" · ")}
              </p>
            </div>
            <ConnectionActionButton personId={person.id} />
          </li>
        ))}
      </ul>

      <Link
        href="/connections"
        className="border-hub-divider-strong text-hub-primary-strong hover:text-hub-primary-deep mt-4 block border-t pt-3 text-center text-[11px] font-semibold"
      >
        Explore connections
      </Link>
    </section>
  )
}
