"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Check,
  CheckCheck,
  MessagesSquare,
  UsersRound,
  X,
} from "lucide-react"
import { EmptyState } from "@/components/feedback/empty-state"
import { DemoNote } from "@/components/features/shared/demo-note"
import { PageHeader } from "@/components/features/shared/page-header"
import {
  SegmentedTabs,
  TabPanel,
} from "@/components/features/shared/segmented-tabs"
import { Avatar } from "@/components/ui/avatar"
import { demoPeople } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"
import type { DemoPlatformState } from "@/lib/demo-platform"

const typeNames = {
  connection: "Connections",
  community: "Communities",
  message: "Messages",
  platform: "ConnectHub",
} as const

const typeIcons = {
  connection: UsersRound,
  community: Bell,
  message: MessagesSquare,
  platform: Check,
} as const

const tabDefinitions = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "connection", label: "Connections" },
  { id: "community", label: "Communities" },
  { id: "message", label: "Messages" },
]

function filterNotifications(state: DemoPlatformState, activeTab: string) {
  return state.notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    return notification.type === activeTab
  })
}

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { state, actions } = useDemoPlatform()
  const unreadCount = state.notifications.filter(
    (notification) => !notification.isRead,
  ).length
  const filteredNotifications = filterNotifications(state, activeTab)
  const tabs = tabDefinitions.map((tab) => ({
    ...tab,
    count:
      tab.id === "all"
        ? state.notifications.length
        : tab.id === "unread"
          ? unreadCount
          : state.notifications.filter(
              (notification) => notification.type === tab.id,
            ).length,
  }))

  return (
    <div className="mx-auto w-full max-w-[1080px] space-y-6">
      <PageHeader
        eyebrow="A little activity"
        title="Notifications"
        description="A quiet place to catch the things happening around your ConnectHub demo."
        action={
          <button
            type="button"
            disabled={unreadCount === 0}
            onClick={actions.markAllNotificationsRead}
            className="border-hub-border text-hub-primary-strong hover:bg-hub-primary-wash inline-flex min-h-9 items-center gap-2 rounded-full border bg-white px-3 text-[11px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
          >
            <CheckCheck size={14} aria-hidden="true" />
            Mark all read
          </button>
        }
      />

      <SegmentedTabs
        ariaLabel="Notification filters"
        idPrefix="notifications"
        items={tabs}
        value={activeTab}
        onChange={setActiveTab}
      />

      <TabPanel
        idPrefix="notifications"
        value={activeTab}
        className="border-hub-border overflow-hidden rounded-2xl border bg-white"
      >
        {filteredNotifications.length > 0 ? (
          <ul>
            {filteredNotifications.map((notification) => {
              const actor = notification.actorId
                ? demoPeople.find(
                    (person) => person.id === notification.actorId,
                  )
                : undefined
              const Icon = typeIcons[notification.type]
              return (
                <li
                  key={notification.id}
                  className={`border-hub-divider flex items-start gap-3 border-b p-4 last:border-b-0 sm:gap-4 sm:p-5 ${
                    notification.isRead ? "" : "bg-[#f8f6ff]"
                  }`}
                >
                  {actor ? (
                    <Avatar
                      name={actor.name}
                      size="md"
                      className={actor.color}
                    />
                  ) : (
                    <span className="bg-hub-primary-soft text-hub-primary-mid flex size-10 shrink-0 items-center justify-center rounded-full">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                  )}
                  <Link
                    href={notification.href}
                    onClick={() =>
                      actions.markNotificationRead(notification.id)
                    }
                    className="focus-visible:outline-hub-focus min-w-0 flex-1 rounded-sm focus-visible:outline-2"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-hub-ink text-sm font-semibold">
                        {notification.title}
                      </span>
                      {!notification.isRead && (
                        <span className="bg-hub-focus size-1.5 rounded-full" />
                      )}
                    </span>
                    <span className="text-hub-muted mt-1 block text-xs leading-5">
                      {notification.description}
                    </span>
                    <span className="text-hub-placeholder mt-2 flex items-center gap-2 text-[9px]">
                      {typeNames[notification.type]}
                      <span aria-hidden="true">·</span>
                      {notification.createdAt}
                    </span>
                  </Link>
                  <div className="flex shrink-0 items-center gap-1">
                    {!notification.isRead && (
                      <button
                        type="button"
                        aria-label={`Mark “${notification.title}” as read`}
                        onClick={() =>
                          actions.markNotificationRead(notification.id)
                        }
                        className="text-hub-muted hover:text-hub-primary flex size-8 items-center justify-center rounded-full hover:bg-[#eeece8]"
                      >
                        <Check size={14} aria-hidden="true" />
                      </button>
                    )}
                    <button
                      type="button"
                      aria-label={`Dismiss “${notification.title}”`}
                      onClick={() =>
                        actions.dismissNotification(notification.id)
                      }
                      className="text-hub-subtle hover:bg-hub-danger-soft flex size-8 items-center justify-center rounded-full hover:text-[#9b3e50]"
                    >
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="p-5">
            <EmptyState
              title={
                activeTab === "unread"
                  ? "You're all caught up"
                  : "Nothing in this filter"
              }
              description={
                activeTab === "unread"
                  ? "There are no unread demo notifications right now."
                  : "Try another filter to see more activity."
              }
              action={
                activeTab === "unread" ? undefined : (
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className="text-hub-primary text-xs font-semibold hover:underline"
                  >
                    View all notifications
                  </button>
                )
              }
            />
          </div>
        )}
      </TabPanel>

      <DemoNote>
        These sample notifications do not come from real user activity.
      </DemoNote>
    </div>
  )
}
