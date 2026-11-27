"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, Compass, Users, MessageCircle, UsersRound } from "lucide-react"

const navigation = [
  { label: "Home", href: "/home", icon: House },
  { label: "Explore", href: "/explore", icon: Compass },
  { label: "Connections", href: "/connections", icon: UsersRound },
  { label: "Communities", href: "/communities", icon: Users },
  { label: "Messages", href: "/messages", icon: MessageCircle },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Mobile navigation"
      className="border-hub-border-subtle fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 px-1.5 pt-1.5 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-0.5 py-2 text-[9px] font-medium transition-colors motion-reduce:transition-none sm:text-[10px] ${
                isActive
                  ? "text-hub-primary"
                  : "hover:text-hub-primary text-[#92909a]"
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
