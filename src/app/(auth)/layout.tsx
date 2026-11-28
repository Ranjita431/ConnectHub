import Link from "next/link"
import { UsersRound } from "lucide-react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-hub-canvas">
      {/* Brand */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-7 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="bg-hub-primary flex size-10 items-center justify-center rounded-xl text-white shadow-md shadow-[#413247]/10">
            <UsersRound size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight text-hub-ink">
            Connect<span className="text-hub-primary-mid">Hub</span>
          </span>
        </Link>
      </header>

      {/* Authentication content */}
      <section className="relative z-10 flex flex-1 items-center justify-center px-5 pt-4 pb-12">
        {children}
      </section>

      {/* Footer */}
      <footer className="text-hub-muted-strong relative z-10 px-6 py-6 text-center text-xs">
        © 2026 ConnectHub. Built to bring people together.
      </footer>
    </main>
  )
}
