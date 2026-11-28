import { LandingCommunities } from "./landing-communities"
import { LandingCta } from "./landing-cta"
import { LandingFeatures } from "./landing-features"
import { LandingFooter } from "./landing-footer"
import { LandingHeader } from "./landing-header"
import { LandingHero } from "./landing-hero"
import { LandingHowItWorks } from "./landing-how-it-works"
import "./landing.css"

export function LandingPage() {
  return (
    <div className="landing-page">
      <a
        href="#main-content"
        className="focus:text-hub-night-soft sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to content
      </a>
      <LandingHeader />
      <main id="main-content">
        <LandingHero />
        <LandingFeatures />
        <LandingCommunities />
        <LandingHowItWorks />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  )
}
