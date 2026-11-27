"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { useDemoPlatform } from "@/lib/demo-platform-state"
import { AppSearch } from "./app-search"
import { ProfileMenu } from "./profile-menu"

export function AppHeader() {
  const { state } = useDemoPlatform()
  const unreadNotifications = state.notifications.filter(
    (notification) => !notification.isRead,
  ).length

  return (
    <header className="border-hub-border-subtle sticky top-0 z-30 flex h-[68px] items-center justify-between gap-3 border-b bg-white/95 px-3 backdrop-blur-md sm:px-6 lg:px-8">
      <AppSearch />
      <div className="ml-1 flex shrink-0 items-center gap-1.5 sm:ml-4 sm:gap-3">
        <Link
          href="/notifications"
          aria-label={
            unreadNotifications > 0
              ? `Notifications, ${unreadNotifications} unread`
              : "Notifications"
          }
          title="Notifications preview"
          className="hover:bg-hub-primary-wash hover:text-hub-brand-mark focus-visible:outline-hub-accent relative flex size-9 items-center justify-center rounded-xl text-[#77747f] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none sm:size-10"
        >
          <Bell size={18} aria-hidden="true" />
          {unreadNotifications > 0 && (
            <span className="bg-hub-focus absolute top-2 right-2 size-2 rounded-full ring-2 ring-white" />
          )}
        </Link>
        <div className="bg-hub-border-subtle hidden h-7 w-px sm:block" />
        <ProfileMenu />
      </div>
    </header>
  )
}
