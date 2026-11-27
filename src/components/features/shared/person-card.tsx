"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import type { DemoPerson } from "@/lib/demo-platform"
import { ConnectionActionButton } from "./connection-action-button"

export function PersonCard({
  person,
  compact = false,
}: {
  person: DemoPerson
  compact?: boolean
}) {
  return (
    <article
      className={`flex min-w-0 items-center gap-3 ${
        compact
          ? "border-hub-divider border-b py-3 last:border-b-0"
          : "border-hub-border rounded-2xl border bg-white p-4"
      }`}
    >
      <Avatar
        name={person.name}
        size={compact ? "md" : "lg"}
        className={person.color}
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-hub-ink truncate text-sm font-semibold">
          <Link
            href={`/profile/${person.id}`}
            className="hover:text-hub-primary focus-visible:outline-hub-focus rounded-sm focus-visible:outline-2"
          >
            {person.name}
          </Link>
        </h3>
        <p className="text-hub-muted mt-0.5 truncate text-[11px]">
          {person.role}
        </p>
        {!compact && (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#6e6b73]">
            {person.bio}
          </p>
        )}
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {person.interests.slice(0, compact ? 2 : 3).map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-[#f2f0f7] px-2 py-1 text-[9px] font-medium text-[#686080]"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <ConnectionActionButton personId={person.id} />
        {compact && (
          <Link
            href={`/profile/${person.id}`}
            className="text-hub-muted hover:text-hub-primary inline-flex min-h-7 items-center gap-1 px-2 text-[10px] font-medium"
          >
            Profile
            <ArrowUpRight size={12} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  )
}
