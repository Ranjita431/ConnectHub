"use client"

import { useRef, type KeyboardEvent } from "react"

export type TabItem = {
  id: string
  label: string
  count?: number
}

type SegmentedTabsProps = {
  ariaLabel: string
  idPrefix: string
  items: TabItem[]
  value: string
  onChange: (value: string) => void
}

export function SegmentedTabs({
  ariaLabel,
  idPrefix,
  items,
  value,
  onChange,
}: SegmentedTabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | undefined
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % items.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + items.length) % items.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = items.length - 1
    }

    if (nextIndex === undefined) return
    event.preventDefault()
    const nextItem = items[nextIndex]
    refs.current[nextIndex]?.focus()
    onChange(nextItem.id)
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex max-w-full gap-1 overflow-x-auto rounded-xl border border-hub-border-subtle bg-hub-surface-warm p-1"
    >
      {items.map((item, index) => {
        const isSelected = item.id === value
        return (
          <button
            key={item.id}
            ref={(element) => {
              refs.current[index] = element
            }}
            id={`${idPrefix}-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={`${idPrefix}-panel`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`focus-visible:outline-hub-focus inline-flex min-h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 motion-reduce:transition-none ${
              isSelected
                ? "text-hub-primary-hover bg-hub-surface shadow-sm shadow-[#413247]/5"
                : "text-hub-muted hover:text-hub-ink"
            }`}
          >
            {item.label}
            {item.count !== undefined && (
              <span
                className={`text-[10px] ${isSelected ? "text-hub-primary-mid" : "text-hub-placeholder"}`}
              >
                {item.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export function TabPanel({
  idPrefix,
  value,
  children,
  className = "",
}: {
  idPrefix: string
  value: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      id={`${idPrefix}-panel`}
      role="tabpanel"
      aria-labelledby={`${idPrefix}-tab-${value}`}
      tabIndex={0}
      className={className}
    >
      {children}
    </div>
  )
}
