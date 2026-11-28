import Link from "next/link"
import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Make an account",
    description:
      "Create your ConnectHub profile and bring a little of yourself along.",
    href: "/sign-up",
    link: "Get started",
  },
  {
    number: "02",
    title: "Follow your curiosity",
    description:
      "Browse the people, interests, and community previews that catch your eye.",
    href: "/explore",
    link: "Explore",
  },
  {
    number: "03",
    title: "Find your place",
    description:
      "Discover shared interests and start making room for new connections.",
    href: "/communities",
    link: "See communities",
  },
]

export function LandingHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-[#f0ede7] py-20 sm:py-24 lg:py-28"
      aria-labelledby="how-title"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-xl">
          <p className="text-hub-primary text-[10px] font-semibold tracking-[0.18em] uppercase">
            A simple way in
          </p>
          <h2
            id="how-title"
            className="editorial-heading mt-4 text-3xl leading-[1.08] text-[var(--landing-ink)] sm:text-4xl lg:text-[3.25rem]"
          >
            Start with a hello to yourself.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--landing-muted)] sm:text-base">
            No big plan needed. Just a little curiosity and somewhere to begin.
          </p>
        </div>

        <ol className="steps mt-12 grid gap-9 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <li className="step" key={step.number}>
              <span className="stepNumber">{step.number}</span>
              <h3 className="mt-5 text-xl font-medium tracking-[-0.035em] text-[var(--landing-ink)] sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--landing-muted)]">
                {step.description}
              </p>
              <Link
                href={step.href}
                className="group text-hub-primary focus-visible:outline-hub-primary mt-4 inline-flex items-center gap-2 text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {step.link}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
