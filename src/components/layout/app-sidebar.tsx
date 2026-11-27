"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  House,
  Compass,
  UsersRound,
  Users,
  MessageCircle,
  Bell,
  Settings,
  Sparkles,
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { useDemoPlatform } from "@/lib/demo-platform-state"

const navigation = [
  { label: "Home", href: "/home", icon: House },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Connections", href: "/connections", icon: UsersRound },
  { label: "Communities", href: "/communities", icon: Users },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Notifications", href: "/notifications", icon: Bell },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useDemoPlatform()

  return (
    <aside className="border-hub-border-subtle sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r bg-[#fcfbf8] px-4 py-6 lg:flex">
      <Link
        href="/"
        aria-label="ConnectHub home"
        className="focus-visible:outline-hub-accent flex items-center gap-2.5 rounded-lg px-2 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#5948d1] text-white">
          <Sparkles size={19} aria-hidden="true" />
        </div>
        <span className="text-hub-ink text-lg font-bold tracking-[-0.045em]">
          Connect<span className="text-indigo-600">Hub</span>
        </span>
      </Link>

      <nav aria-label="Primary navigation" className="mt-10 flex-1">
        <p className="text-hub-caption-muted mb-3 px-3 text-[9px] font-semibold tracking-[0.16em] uppercase">
          Your space
        </p>
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-medium transition-colors ${
                    isActive
                      ? "bg-hub-primary-faint text-hub-primary before:bg-hub-focus before:absolute before:top-2.5 before:bottom-2.5 before:left-0 before:w-[3px] before:rounded-full"
                      : "hover:bg-hub-lavender-surface hover:text-hub-ink text-[#68656f]"
                  } focus-visible:outline-hub-accent focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none`}
                >
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    aria-hidden="true"
                  />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="border-hub-divider-strong mt-5 border-t pt-4">
          <Link
            href="/settings"
            aria-current={pathname === "/settings" ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
              pathname === "/settings"
                ? "bg-hub-primary-faint text-hub-primary"
                : "hover:bg-hub-lavender-surface hover:text-hub-ink text-[#68656f]"
            } focus-visible:outline-hub-accent focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none`}
          >
            <Settings size={18} strokeWidth={1.8} aria-hidden="true" />
            Settings
          </Link>
        </div>
      </nav>

      <div className="border-hub-border-subtle border-t pt-4">
        <Link
          href="/profile/demo"
          aria-current={pathname.startsWith("/profile") ? "page" : undefined}
          className="hover:bg-hub-lavender-surface focus-visible:outline-hub-accent flex items-center gap-3 rounded-xl p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
        >
          <Avatar
            name={state.profile.name}
            size="md"
            className="text-hub-brand-mark bg-[#e8e3f7]"
          />
          <div className="min-w-0 flex-1">
            <p className="text-hub-ink truncate text-xs font-semibold">
              {state.profile.name}
            </p>
            <p className="text-hub-subtle mt-0.5 truncate text-[10px]">
              Demo profile
            </p>
          </div>
        </Link>
      </div>
    </aside>
  )
}
