"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, Compass, Users, MessageCircle, UserRound } from "lucide-react"

const navigation = [
  { label: "Home", href: "/home", icon: House },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Communities", href: "/communities", icon: Users },
  { label: "Messages", href: "/messages", icon: MessageCircle },
  { label: "Profile", href: "/profile/demo", icon: UserRound },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pt-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href === "/profile/demo" && pathname.startsWith("/profile"))

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-1 py-2 text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-indigo-600"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
