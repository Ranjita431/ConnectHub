"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu, X } from "lucide-react"
import { BrandMark } from "./brand-mark"

const sectionLinks = [
  { label: "The idea", href: "#features" },
  { label: "Communities", href: "#communities" },
  { label: "How it works", href: "#how-it-works" },
]

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false)
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--landing-line)] bg-[var(--landing-paper)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-3 px-4 sm:px-7 lg:px-10">
        <Link
          href="/"
          className="focus-visible:outline-hub-primary flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="ConnectHub home"
        >
          <BrandMark />
          <span className="text-[17px] font-bold tracking-[-0.045em] text-[var(--landing-ink)] sm:text-lg">
            Connect<span className="text-hub-primary">Hub</span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {sectionLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-[var(--landing-muted)] transition-colors hover:text-[var(--landing-ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/sign-in"
            className="hover:text-hub-primary hidden rounded-full px-3 py-2 text-[13px] font-semibold text-[var(--landing-ink)] transition-colors sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="bg-hub-night-soft hover:bg-hub-primary focus-visible:outline-hub-primary inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-[12px] font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-5 sm:text-[13px]"
          >
            <span className="sm:hidden">Join</span>
            <span className="hidden sm:inline">Get started</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="focus-visible:outline-hub-primary inline-flex size-10 items-center justify-center rounded-full text-[var(--landing-ink)] transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-b border-[var(--landing-line)] bg-[var(--landing-paper)] px-5 py-4 shadow-lg shadow-black/5 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="mx-auto max-w-lg">
            <div className="flex flex-col">
              {sectionLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="focus-visible:outline-hub-primary rounded-lg px-3 py-3 text-sm font-medium text-[var(--landing-ink)] transition-colors hover:bg-black/5 focus-visible:outline-2"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <Link
              href="/sign-in"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-between border-t border-[var(--landing-line)] px-3 py-4 text-sm font-semibold text-[var(--landing-ink)]"
            >
              Already a member? Sign in
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
