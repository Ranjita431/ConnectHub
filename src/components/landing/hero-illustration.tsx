const interests = [
  { label: "MAKE & MEND", className: "nodeOne", symbol: "M" },
  { label: "FIELD NOTES", className: "nodeTwo", symbol: "F" },
  { label: "GOOD READS", className: "nodeThree", symbol: "R" },
  { label: "CREATIVE CODE", className: "nodeFour", symbol: "C" },
]

export function HeroIllustration() {
  return (
    <div
      className="heroArt"
      role="img"
      aria-label="An illustrated map of creative interests connected through a shared community"
    >
      <div className="artHalo" />
      <div className="artRing" />
      <svg
        className="network"
        viewBox="0 0 520 520"
        fill="none"
        aria-hidden="true"
      >
        <path d="M259 258C205 204 164 161 105 132" />
        <path d="M261 258C313 202 365 157 423 135" />
        <path d="M259 261C205 317 164 362 101 393" />
        <path d="M261 261C318 313 367 362 421 393" />
        <path d="M105 132C202 83 323 83 423 135" />
        <path d="M101 393C197 442 322 441 421 393" />
        <circle cx="105" cy="132" r="4" />
        <circle cx="423" cy="135" r="4" />
        <circle cx="101" cy="393" r="4" />
        <circle cx="421" cy="393" r="4" />
      </svg>

      <div className="centerNode">
        <span className="centerMark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="text-[10px] font-semibold tracking-[0.17em] text-white/70 uppercase">
          shared
        </span>
        <span className="mt-0.5 text-[19px] font-semibold tracking-[-0.04em] text-white">
          interests
        </span>
      </div>

      {interests.map((interest) => (
        <div
          className={`interestNode ${interest.className}`}
          key={interest.label}
        >
          <span className="interestSymbol">{interest.symbol}</span>
          <span className="text-[9px] font-semibold tracking-[0.12em] whitespace-nowrap text-[var(--landing-ink)]">
            {interest.label}
          </span>
        </div>
      ))}

      <span className="spark sparkOne" aria-hidden="true" />
      <span className="spark sparkTwo" aria-hidden="true" />
      <span className="spark sparkThree" aria-hidden="true" />
    </div>
  )
}
