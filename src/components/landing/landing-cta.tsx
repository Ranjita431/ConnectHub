import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LandingCta() {
  return (
    <section
      id="about"
      className="bg-hub-night-soft relative isolate overflow-hidden text-white"
      aria-labelledby="cta-title"
    >
      <div className="mx-auto grid min-h-[390px] max-w-[1320px] items-center gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-24">
        <div className="relative z-10 max-w-2xl">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[#e0d5e5] uppercase">
            Your next chapter can start small
          </p>
          <h2
            id="cta-title"
            className="editorial-heading mt-4 text-3xl leading-[1.05] sm:text-4xl lg:text-[3.5rem]"
          >
            There&apos;s more out there.
            <br />
            <span className="ctaAccent">Find it together.</span>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/70 sm:text-base">
            Bring the things you love. See who you meet along the way.
          </p>
        </div>
        <Link
          href="/sign-up"
          className="group text-hub-night-soft relative z-10 inline-flex min-h-12 w-fit items-center justify-center gap-3 rounded-full bg-[#eeeaff] px-6 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Join ConnectHub
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
      <div className="ctaOrbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  )
}
