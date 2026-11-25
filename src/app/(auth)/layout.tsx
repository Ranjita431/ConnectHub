
import Link from "next/link"
import { UsersRound } from "lucide-react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-[500px] rounded-full bg-indigo-100/70 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-[500px] rounded-full bg-violet-100/70 blur-[100px]" />

      {/* Brand */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-6 py-7 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <UsersRound size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Connect<span className="text-indigo-600">Hub</span>
          </span>
        </Link>
      </header>

      {/* Authentication content */}
      <section className="relative z-10 flex flex-1 items-center justify-center px-5 pb-12 pt-4">
        {children}
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 text-center text-xs text-slate-400">
        © 2026 ConnectHub. Built to bring people together.
      </footer>
    </main>
  )
}
