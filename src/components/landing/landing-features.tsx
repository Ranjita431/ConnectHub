import Link from "next/link"
import { ArrowUpRight, Compass, UsersRound } from "lucide-react"

export function LandingFeatures() {
  return (
    <section
      id="features"
      className="scroll-mt-24 bg-[#f0ede7] py-20 sm:py-24 lg:py-28"
      aria-labelledby="features-title"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-end md:gap-12">
          <div>
            <p className="text-hub-primary text-[10px] font-semibold tracking-[0.18em] uppercase">
              A good place to begin
            </p>
            <h2
              id="features-title"
              className="editorial-heading mt-4 max-w-md text-3xl leading-[1.08] text-[var(--landing-ink)] sm:text-4xl lg:text-[3.25rem]"
            >
              The things you love can bring you closer.
            </h2>
          </div>
          <p className="max-w-lg pb-1 text-sm leading-7 text-[var(--landing-muted)] sm:text-base">
            ConnectHub is built around shared interests: a starting point for
            finding people, discovering communities, and feeling at home in a
            new conversation.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-[1.12fr_0.88fr]">
          <Link
            href="/explore"
            className="group focus-visible:outline-hub-primary relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl bg-[#eee7f0] p-7 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-[410px] sm:p-10"
          >
            <span className="text-hub-primary text-[10px] font-semibold tracking-[0.16em] uppercase">
              01 / Find a thread
            </span>
            <h3 className="editorial-heading mt-5 max-w-sm text-2xl leading-tight text-[#3d3544] sm:text-3xl">
              Start with what sparks your curiosity.
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#625a66]">
              Explore people and interests that could lead somewhere unexpected.
            </p>

            <div
              className="relative mt-auto flex min-h-[118px] items-end gap-2 overflow-hidden pt-8"
              aria-hidden="true"
            >
              <span className="border-hub-primary/25 absolute top-2 left-[13%] size-16 rounded-full border" />
              <span className="bg-hub-primary absolute top-7 left-[24%] size-3 rounded-full" />
              <span className="absolute top-0 left-[47%] size-2 rounded-full bg-[#ed8d6b]" />
              <span className="border-hub-primary/30 absolute top-8 right-[21%] size-12 rounded-full border" />
              <span className="absolute top-5 right-[9%] size-3 rounded-full bg-[#b3c76c]" />
              <span className="bg-hub-primary/30 absolute bottom-0 left-[16%] h-px w-[65%] rotate-[-12deg]" />
              <span className="text-hub-primary rounded-full bg-white/70 px-4 py-2 text-[11px] font-medium">
                Photography
              </span>
              <span className="text-hub-primary rounded-full bg-white/70 px-4 py-2 text-[11px] font-medium">
                Making
              </span>
              <span className="text-hub-primary hidden rounded-full bg-white/70 px-4 py-2 text-[11px] font-medium sm:inline-flex">
                New ideas
              </span>
            </div>
            <span className="bg-hub-primary absolute right-7 bottom-7 flex size-10 items-center justify-center rounded-full text-white transition-transform duration-200 group-hover:rotate-45 sm:right-9 sm:bottom-9">
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Link
              href="/communities"
              className="group focus-visible:outline-hub-primary flex min-h-[190px] flex-col justify-between rounded-2xl bg-[#faf7f1] p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-[198px] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="bg-hub-primary-soft text-hub-primary flex size-10 items-center justify-center rounded-full">
                  <UsersRound size={18} aria-hidden="true" />
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-[#85837d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-[-0.025em] text-[var(--landing-ink)]">
                  Find a community
                </h3>
                <p className="mt-1.5 max-w-sm text-[13px] leading-5 text-[var(--landing-muted)]">
                  Explore spaces shaped around the things you enjoy and want to
                  learn.
                </p>
              </div>
            </Link>

            <Link
              href="/connections"
              className="group focus-visible:outline-hub-primary flex min-h-[190px] flex-col justify-between rounded-2xl bg-[#f1e5e3] p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-[198px] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex size-10 items-center justify-center rounded-full bg-white/70 text-[#8e5c61]">
                  <Compass size={18} aria-hidden="true" />
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-[#85837d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-[-0.025em] text-[var(--landing-ink)]">
                  Let connection grow
                </h3>
                <p className="mt-1.5 max-w-sm text-[13px] leading-5 text-[var(--landing-muted)]">
                  Make room for shared ideas, new perspectives, and the people
                  behind them.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
