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

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white px-5 py-6 lg:flex">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 px-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <Sparkles size={22} />
        </div>

        <span className="text-xl font-bold tracking-tight text-slate-900">
          Connect<span className="text-indigo-600">Hub</span>
        </span>
      </Link>

      {/* Navigation */}
      <nav className="mt-10 flex-1 space-y-2">
        <p className="mb-4 px-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Menu
        </p>

        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          )
        })}

        <div className="pt-5">
          <Link
            href="/settings"
            className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
              pathname === "/settings"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Settings size={20} />
            Settings
          </Link>
        </div>
      </nav>

      {/* Profile */}
      <div className="border-t border-slate-100 pt-5">
        <Link
          href="/profile/demo"
          className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"
        >
          <div className="flex size-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
            A
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              Alex Morgan
            </p>
            <p className="truncate text-xs text-slate-500">View your profile</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}
