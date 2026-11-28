import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

export function LandingCommunities() {
  return (
    <section
      id="communities"
      className="scroll-mt-24 py-20 sm:py-24 lg:py-28"
      aria-labelledby="communities-title"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-hub-primary text-[10px] font-semibold tracking-[0.18em] uppercase">
              Many interests, many ways in
            </p>
            <h2
              id="communities-title"
              className="mt-4 max-w-lg text-3xl leading-[1.08] font-medium tracking-[-0.055em] text-[var(--landing-ink)] sm:text-4xl lg:text-[3.25rem]"
            >
              There&apos;s a little corner for everyone.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--landing-muted)] sm:text-base">
              From making and reading to exploring the outdoors, shared
              interests make it easier to find common ground.
            </p>
            <Link
              href="/explore"
              className="group text-hub-primary focus-visible:outline-hub-primary mt-7 inline-flex items-center gap-2 rounded-full py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Explore community previews
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <p className="text-[10px] leading-5 font-medium tracking-[0.12em] text-[var(--landing-muted)] uppercase lg:justify-self-end">
            Illustrative community previews
            <br />
            No live member data
          </p>
        </div>

        <div className="mt-11 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-[1.12fr_0.88fr]">
          <Link
            href="/explore"
            className="group focus-visible:outline-hub-primary relative flex min-h-[310px] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[#dce4d5] p-6 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 sm:row-span-2 sm:min-h-[420px] sm:p-8"
          >
            <div className="relative z-10 flex items-start justify-between">
              <span className="text-hub-success rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase">
                OUTDOORS · SLOW LIVING
              </span>
              <ArrowUpRight
                size={18}
                className="text-hub-success transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>

            <div
              className="absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute -top-14 right-[-8%] size-64 rounded-full border border-[#71816b]/25 sm:size-80" />
              <div className="absolute top-12 right-[12%] size-40 rounded-full border border-[#71816b]/30 sm:size-52" />
              <div className="absolute top-[30%] right-[21%] size-24 rounded-full bg-[#bdcba8]/80 sm:size-32" />
              <div className="absolute right-[35%] bottom-[23%] h-28 w-px rotate-[30deg] bg-[#6b7b63]/40" />
              <div className="absolute right-[25%] bottom-[18%] h-20 w-px rotate-[-24deg] bg-[#6b7b63]/40" />
              <span className="bg-hub-primary absolute top-[46%] right-[19%] size-2 rounded-full" />
            </div>

            <div className="relative z-10 max-w-sm">
              <span className="text-hub-success text-[10px] font-semibold tracking-[0.15em] uppercase">
                A sample space
              </span>
              <h3 className="mt-2 text-3xl leading-tight font-medium tracking-[-0.05em] text-[#243025] sm:text-4xl">
                Weekend
                <br />
                Field Notes
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#52604f]">
                For the walks, small discoveries, and stories worth bringing
                back.
              </p>
            </div>
          </Link>

          <Link
            href="/explore"
            className="group focus-visible:outline-hub-primary relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[#eee1c8] p-6 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-7"
          >
            <div className="relative z-10 flex items-start justify-between">
              <span className="text-hub-avatar-ochre-ink rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase">
                BOOKS · BIG IDEAS
              </span>
              <ArrowUpRight
                size={18}
                className="text-hub-avatar-ochre-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
            <div
              className="absolute right-12 bottom-8 flex h-24 w-20 rotate-[8deg] items-center justify-center rounded-l-sm rounded-r-md bg-[#bf775a] shadow-lg shadow-[#78513d]/15 transition-transform duration-300 group-hover:rotate-[3deg] sm:right-16 sm:h-28 sm:w-24"
              aria-hidden="true"
            >
              <span className="h-16 w-px bg-white/35" />
              <span className="absolute inset-y-3 left-3 w-px bg-white/30" />
            </div>
            <div className="relative z-10 max-w-[65%]">
              <span className="text-hub-avatar-ochre-ink text-[10px] font-semibold tracking-[0.15em] uppercase">
                A sample space
              </span>
              <h3 className="mt-2 text-2xl font-medium tracking-[-0.045em] text-[#332a21]">
                The Margin Notes
              </h3>
              <p className="mt-1 text-[13px] leading-5 text-[#756550]">
                Read a little. Think a lot.
              </p>
            </div>
          </Link>

          <Link
            href="/explore"
            className="group focus-visible:outline-hub-primary relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[#ded9ed] p-6 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-7"
          >
            <div className="relative z-10 flex items-start justify-between">
              <span className="text-hub-avatar-plum-ink rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase">
                ART · MAKING
              </span>
              <ArrowUpRight
                size={18}
                className="text-hub-avatar-plum-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
            <div
              className="absolute right-7 bottom-8 flex -rotate-6 gap-1.5"
              aria-hidden="true"
            >
              <span className="size-10 rounded-full bg-[#ed9877]" />
              <span className="bg-hub-primary mt-4 size-10 rounded-full" />
              <span className="mt-1 size-10 rounded-full bg-[#a7b677]" />
            </div>
            <div className="relative z-10 max-w-[65%]">
              <span className="text-hub-avatar-plum-ink text-[10px] font-semibold tracking-[0.15em] uppercase">
                A sample space
              </span>
              <h3 className="mt-2 text-2xl font-medium tracking-[-0.045em] text-[#332b43]">
                The Open Studio
              </h3>
              <p className="mt-1 text-[13px] leading-5 text-[#716a80]">
                Make things. Share the in-between.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
