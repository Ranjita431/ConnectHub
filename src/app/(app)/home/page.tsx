import Link from "next/link"
import { UsersRound, Compass, Bell, MessageCircle } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          Connect<span className="text-indigo-600">Hub</span>
        </Link>

        <Link
          href="/sign-in"
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Demo logout
        </Link>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <span className="rounded-full bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600">
          DEMO SESSION
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950">
          Welcome to ConnectHub!
        </h1>

        <p className="mt-3 max-w-xl text-slate-500">
          Your people. Your interests. Your community. Discover people, explore
          communities and build meaningful connections.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Explore", icon: Compass, href: "/explore" },
            { name: "Connections", icon: UsersRound, href: "/connections" },
            { name: "Messages", icon: MessageCircle, href: "/messages" },
            { name: "Notifications", icon: Bell, href: "/notifications" },
          ].map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50"
              >
                <Icon className="text-indigo-600" size={25} />
                <h2 className="mt-5 font-semibold text-slate-900">
                  {item.name}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Explore {item.name.toLowerCase()}.
                </p>
              </Link>
            )
          })}
        </div>

        <p className="mt-10 text-xs text-slate-400">
          This is a frontend demonstration. No real authentication or account
          session has been established.
        </p>
      </section>
    </main>
  )
}
