"use client"

import Link from "next/link"
import { Check, UserRoundPlus } from "lucide-react"
import { useDemoPlatform, getConnectionStatus } from "@/lib/demo-platform-state"

export function ConnectionActionButton({ personId }: { personId: string }) {
  const { state, actions } = useDemoPlatform()
  const status = getConnectionStatus(state, personId)

  if (status === "connected") {
    return (
      <Link
        href="/connections"
        className="bg-hub-primary-faint text-hub-primary hover:bg-hub-primary-hover-wash inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold"
      >
        <Check size={13} aria-hidden="true" />
        Connected
      </Link>
    )
  }

  if (status === "received") {
    return (
      <Link
        href="/connections"
        className="bg-hub-primary hover:bg-hub-primary-hover inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold text-white"
      >
        Respond
      </Link>
    )
  }

  if (status === "sent") {
    return (
      <button
        type="button"
        aria-pressed="true"
        onClick={() => actions.cancelConnectionRequest(personId)}
        className="text-hub-primary-muted hover:bg-hub-surface-soft inline-flex min-h-9 items-center gap-1.5 rounded-full border border-[#e1dcef] px-3 text-[11px] font-semibold"
      >
        Pending
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-pressed="false"
      onClick={() => actions.requestConnection(personId)}
      className="bg-hub-primary hover:bg-hub-primary-hover focus-visible:outline-hub-primary inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
    >
      <UserRoundPlus size={13} aria-hidden="true" />
      Connect
    </button>
  )
}
