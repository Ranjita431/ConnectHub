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
            className="group focus-visible:outline-hub-primary relative flex min-h-[310px] flex-col justify-between overflow-hidden rounded-2xl bg-[#dce4d5] p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 sm:row-span-2 sm:min-h-[420px] sm:p-8"
          >
            <div className="relative z-10 flex items-start justify-between">
              <span className="rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#584c57] uppercase">
                OUTDOORS · SLOW LIVING
              </span>
              <ArrowUpRight
                size={18}
                className="text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>

            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85"
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#251f2b]/75 via-[#251f2b]/18 to-[#251f2b]/10" />
            </div>

            <div className="relative z-10 max-w-sm">
              <span className="text-white/75 text-[10px] font-semibold tracking-[0.15em] uppercase">
                A sample space
              </span>
              <h3 className="editorial-heading mt-2 text-3xl leading-tight text-white drop-shadow-sm sm:text-4xl">
                Weekend
                <br />
                Field Notes
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-white/85">
                For the walks, small discoveries, and stories worth bringing
                back.
              </p>
            </div>
          </Link>

          <Link
            href="/explore"
            className="group focus-visible:outline-hub-primary relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl bg-[#eee1c8] p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-7"
          >
            <div className="relative z-10 flex items-start justify-between">
              <span className="rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#5b4b42] uppercase">
                BOOKS · BIG IDEAS
              </span>
              <ArrowUpRight
                size={18}
                className="text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1000&q=85"
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
              />
              <span className="absolute inset-0 bg-gradient-to-r from-[#28232d]/82 via-[#28232d]/48 to-transparent" />
            </div>
            <div className="relative z-10 max-w-[65%]">
              <span className="text-white/75 text-[10px] font-semibold tracking-[0.15em] uppercase">
                A sample space
              </span>
              <h3 className="editorial-heading mt-2 text-2xl text-white drop-shadow-sm">
                The Margin Notes
              </h3>
              <p className="mt-1 text-[13px] leading-5 text-white/85">
                Read a little. Think a lot.
              </p>
            </div>
          </Link>

          <Link
            href="/explore"
            className="group focus-visible:outline-hub-primary relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-2xl bg-[#ded9ed] p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-7"
          >
            <div className="relative z-10 flex items-start justify-between">
              <span className="rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#544459] uppercase">
                ART · MAKING
              </span>
              <ArrowUpRight
                size={18}
                className="text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </div>
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85"
                alt=""
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
              />
              <span className="absolute inset-0 bg-gradient-to-r from-[#28232d]/82 via-[#28232d]/48 to-transparent" />
            </div>
            <div className="relative z-10 max-w-[65%]">
              <span className="text-white/75 text-[10px] font-semibold tracking-[0.15em] uppercase">
                A sample space
              </span>
              <h3 className="editorial-heading mt-2 text-2xl text-white drop-shadow-sm">
                The Open Studio
              </h3>
              <p className="mt-1 text-[13px] leading-5 text-white/85">
                Make things. Share the in-between.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
