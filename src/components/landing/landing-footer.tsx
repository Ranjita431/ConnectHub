import Link from "next/link"
import { BrandMark } from "./brand-mark"

const footerLinks = [
  { label: "The idea", href: "#features" },
  { label: "Communities", href: "#communities" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Explore", href: "/explore" },
]

export function LandingFooter() {
  return (
    <footer className="bg-[var(--landing-paper)]">
      <div className="mx-auto max-w-[1320px] px-5 pt-10 pb-7 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 border-b border-[var(--landing-line)] pb-9 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Link
              href="/"
              className="focus-visible:outline-hub-primary inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
              aria-label="ConnectHub home"
            >
              <BrandMark />
              <span className="text-lg font-bold tracking-[-0.045em] text-[var(--landing-ink)]">
                Connect<span className="text-hub-primary">Hub</span>
              </span>
            </Link>
            <p className="mt-4 text-[13px] leading-6 text-[var(--landing-muted)]">
              A place to find your people, follow your curiosity, and feel a
              little more connected.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 md:pt-3">
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-hub-primary focus-visible:outline-hub-primary text-[13px] font-medium text-[var(--landing-muted)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/sign-in"
              className="hover:text-hub-primary focus-visible:outline-hub-primary text-[13px] font-medium text-[var(--landing-muted)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="hover:text-hub-primary focus-visible:outline-hub-primary text-[13px] font-medium text-[var(--landing-muted)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Create account
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-5 text-[11px] leading-5 text-[var(--landing-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ConnectHub. Built around what brings us together.</p>
          <p>Frontend prototype · Some destinations are previews.</p>
        </div>
      </div>
    </footer>
  )
}
