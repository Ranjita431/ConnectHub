"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { useDemoPlatform } from "@/lib/demo-platform-state"

export function ProfileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const { state } = useDemoPlatform()
  const profileName = state.profile.name

  useEffect(() => {
    if (!isOpen) return

    function closeOnOutsideClick(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [isOpen])

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${isOpen ? "Close" : "Open"} ${profileName} profile menu`}
        aria-expanded={isOpen}
        aria-controls="profile-menu"
        onClick={() => setIsOpen((open) => !open)}
        className="hover:bg-hub-primary-wash focus-visible:outline-hub-accent flex min-h-10 items-center gap-2 rounded-xl p-1.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
      >
        <Avatar
          name={profileName}
          size="sm"
          className="text-hub-brand-mark bg-hub-avatar-lavender"
        />
        <span className="hidden text-[12px] font-semibold text-[#383541] md:block">
          {profileName}
        </span>
        <ChevronDown
          size={14}
          className={`text-hub-subtle hidden transition-transform motion-reduce:transition-none md:block ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id="profile-menu"
          className="border-hub-border-control bg-hub-surface absolute top-full right-0 z-50 mt-2 w-56 rounded-xl border p-2 shadow-xl shadow-[#272238]/10"
        >
          <div className="border-hub-divider-soft border-b px-3 py-2.5">
            <p className="text-hub-ink text-xs font-semibold">{profileName}</p>
            <p className="text-hub-muted-strong mt-0.5 text-[10px]">
              Demo account
            </p>
          </div>
          <nav aria-label="Profile shortcuts" className="pt-1">
            <Link
              href="/profile/demo"
              onClick={closeMenu}
              aria-current={
                pathname.startsWith("/profile") ? "page" : undefined
              }
              className="hover:bg-hub-primary-wash hover:text-hub-primary flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium text-[#514e58] transition-colors motion-reduce:transition-none"
            >
              <UserRound size={15} aria-hidden="true" />
              View profile
            </Link>
            <Link
              href="/settings"
              onClick={closeMenu}
              aria-current={pathname === "/settings" ? "page" : undefined}
              className="hover:bg-hub-primary-wash hover:text-hub-primary flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium text-[#514e58] transition-colors motion-reduce:transition-none"
            >
              <Settings size={15} aria-hidden="true" />
              Settings
            </Link>
            <Link
              href="/sign-in"
              onClick={closeMenu}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-medium text-[#7b5961] transition-colors hover:bg-[#fbf2f2] motion-reduce:transition-none"
            >
              <LogOut size={15} aria-hidden="true" />
              Demo sign out
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
