import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { HeroIllustration } from "./hero-illustration"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="mx-auto grid min-h-[640px] max-w-[1320px] items-center gap-6 px-5 py-14 sm:px-8 sm:py-16 lg:min-h-[690px] lg:grid-cols-[1.02fr_0.98fr] lg:gap-4 lg:px-10 lg:py-14">
        <div className="relative z-10 max-w-[640px]">
          <p className="text-hub-primary mb-6 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.17em] uppercase sm:text-xs">
            <span
              className="size-2 rounded-full bg-[#ec8d6b]"
              aria-hidden="true"
            />
            A community for what moves you
          </p>
          <h1
            id="hero-title"
            className="max-w-[650px] text-[clamp(3.1rem,7.2vw,6.35rem)] leading-[0.96] font-medium tracking-[-0.075em] text-[var(--landing-ink)]"
          >
            Find your
            <br />
            people. Make
            <br />
            <span className="serifAccent">room for more.</span>
          </h1>
          <p className="mt-7 max-w-[460px] text-[15px] leading-7 text-[var(--landing-muted)] sm:text-base sm:leading-8">
            The best connections start with something in common. Discover
            communities, meet people with your kind of curiosity, and see where
            an idea takes you.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
            <Link
              href="/sign-up"
              className="group bg-hub-primary focus-visible:outline-hub-primary inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#4031b8] focus-visible:outline-2 focus-visible:outline-offset-3"
            >
              Find your place
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <a
              href="#communities"
              className="hover:text-hub-primary focus-visible:outline-hub-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--landing-ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-3"
            >
              Take a look
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
          <p className="mt-7 text-xs leading-5 text-[var(--landing-muted)]">
            A welcoming space for people, ideas, and shared interests.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[570px] lg:-mr-2">
          <HeroIllustration />
        </div>
      </div>
      <div className="mx-auto flex max-w-[1320px] items-center gap-4 px-5 pb-7 sm:px-8 lg:px-10">
        <span className="bg-hub-primary/40 h-px w-10" aria-hidden="true" />
        <span className="text-[10px] font-semibold tracking-[0.16em] text-[var(--landing-muted)] uppercase">
          Curiosity brings us together
        </span>
      </div>
    </section>
  )
}
