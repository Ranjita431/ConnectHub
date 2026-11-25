import Link from "next/link"
import {
  ArrowRight,
  Bell,
  Bookmark,
  Compass,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Search,
  Send,
  Sparkles,
  Users,
  UsersRound,
} from "lucide-react"

const communities = [
  {
    name: "Creative Minds",
    category: "Art & Design",
    members: "2.4k",
    color: "bg-violet-100 text-violet-700",
    icon: "✦",
  },
  {
    name: "Tech Explorers",
    category: "Technology",
    members: "1.8k",
    color: "bg-blue-100 text-blue-700",
    icon: "⌘",
  },
  {
    name: "The Book Club",
    category: "Books & Learning",
    members: "960",
    color: "bg-amber-100 text-amber-700",
    icon: "▤",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fc] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <UsersRound size={21} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Connect<span className="text-indigo-600">Hub</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-indigo-600">
              Features
            </a>
            <a href="#communities" className="transition hover:text-indigo-600">
              Communities
            </a>
            <a href="#about" className="transition hover:text-indigo-600">
              About
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/sign-in"
              className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 sm:px-5"
            >
              Join ConnectHub <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-48 right-0 size-[600px] rounded-full bg-indigo-100/60 blur-[120px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm">
              <Sparkles size={15} /> A community built around you
            </div>

            <h1 className="max-w-xl text-4xl leading-[1.12] font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Find your people.
              <br />
              Share your world.
              <br />
              <span className="text-indigo-600">Feel connected.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-500 sm:text-lg">
              Discover people who share your interests, join inspiring
              communities, and make meaningful connections. Your next
              conversation starts here.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Create your account <ArrowRight size={17} />
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <Compass size={17} /> Explore communities
              </Link>
            </div>

            <div className="mt-9 flex items-center gap-3 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {["R", "A", "M", "S"].map((letter, i) => (
                  <div
                    key={letter}
                    className={`flex size-9 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${["bg-indigo-500", "bg-violet-500", "bg-sky-500", "bg-fuchsia-500"][i]}`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span>Built for shared interests and real connections.</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[510px]">
            <div className="absolute -inset-5 rounded-[32px] bg-indigo-100/70 blur-2xl" />
            <div className="relative rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/70 sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="font-bold text-slate-900">Your social space</p>
                  <p className="mt-1 text-xs text-slate-400">
                    A little inspiration for today
                  </p>
                </div>
                <button
                  aria-label="Notifications"
                  className="relative flex size-10 items-center justify-center rounded-full bg-slate-50 text-slate-600"
                >
                  <Bell size={19} />
                  <span className="absolute top-2 right-2 size-2 rounded-full bg-indigo-600" />
                </button>
              </div>

              <div className="my-4 flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <Search size={17} className="text-slate-400" />
                <span className="text-sm text-slate-400">
                  Search people, topics and communities
                </span>
              </div>

              <article className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                    A
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      Alex Morgan
                    </p>
                    <p className="text-xs text-slate-400">
                      Design enthusiast · 2 hours ago
                    </p>
                  </div>
                  <button
                    aria-label="More post options"
                    className="text-slate-400"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-700">
                  A reminder that the best ideas often happen when different
                  perspectives come together. Keep creating and keep sharing. ✨
                </p>

                <div className="mt-4 flex min-h-40 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-6 text-center text-white">
                  <div>
                    <Sparkles size={28} className="mx-auto mb-3" />
                    <p className="text-xl font-bold">
                      Ideas grow when we connect.
                    </p>
                    <p className="mt-2 text-xs text-white/80">
                      Create · Share · Discover
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-b border-slate-100 pb-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Heart size={15} className="text-rose-500" /> 128 likes
                  </span>
                  <span>24 comments</span>
                </div>
                <div className="flex items-center justify-between pt-3 text-slate-500">
                  <span className="flex items-center gap-1.5 text-xs font-medium">
                    <Heart size={17} /> Like
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium">
                    <MessageCircle size={17} /> Comment
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium">
                    <Send size={16} /> Share
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium">
                    <Bookmark size={16} /> Save
                  </span>
                </div>
              </article>

              <div className="mt-4 flex items-center gap-3 rounded-xl bg-indigo-50/80 p-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Users size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Creative Minds
                  </p>
                  <p className="text-xs text-slate-500">
                    A community for creative people
                  </p>
                </div>
                <ArrowRight size={17} className="text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-y border-slate-200/70 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.18em] text-indigo-600 uppercase">
              Everything in one place
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A better way to stay connected.
            </h2>
            <p className="mt-4 leading-7 text-slate-500">
              Discover, share and build relationships around the things that
              matter to you.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: UsersRound,
                title: "Meaningful connections",
                description:
                  "Meet people with shared interests, ideas and ambitions.",
              },
              {
                icon: Compass,
                title: "Discover communities",
                description:
                  "Explore new topics and find spaces where you belong.",
              },
              {
                icon: MessageCircle,
                title: "Conversations that matter",
                description:
                  "Share perspectives and take part in engaging discussions.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={23} />
                </div>
                <h3 className="mt-5 font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="communities" className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-indigo-600 uppercase">
              Find your community
            </p>
            <h2 className="mt-4 max-w-lg text-3xl leading-tight font-bold tracking-tight text-slate-950 sm:text-4xl">
              Your interests can bring you closer.
            </h2>
            <p className="mt-5 max-w-lg leading-8 text-slate-500">
              From technology and photography to books and travel, discover
              groups where people exchange ideas, learn together and inspire one
              another.
            </p>
            <Link
              href="/explore"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:gap-3"
            >
              Discover communities <ArrowRight size={17} />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">
                  Popular communities
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Explore what people are talking about
                </p>
              </div>
              <Compass size={21} className="text-indigo-600" />
            </div>
            <div className="mt-5 space-y-3">
              {communities.map((community) => (
                <div
                  key={community.name}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-indigo-100 hover:bg-slate-50"
                >
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl text-lg font-bold ${community.color}`}
                  >
                    {community.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {community.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {community.category} · {community.members} members
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div
          id="about"
          className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 to-violet-700 px-6 py-16 text-center text-white sm:px-12"
        >
          <Sparkles size={28} className="mx-auto mb-5 text-indigo-200" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your next connection starts here.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base">
            Join ConnectHub to discover communities, share your interests and
            meet people who inspire you.
          </p>
          <Link
            href="/sign-up"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
          >
            Get started <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <UsersRound size={17} />
            </div>
            <span className="font-bold">
              Connect<span className="text-indigo-600">Hub</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400">
            © 2026 ConnectHub. Built to bring people together.
          </p>
          <div className="flex gap-5 text-sm text-slate-500">
            <Link href="/sign-in" className="hover:text-indigo-600">
              Sign in
            </Link>
            <Link href="/sign-up" className="hover:text-indigo-600">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
