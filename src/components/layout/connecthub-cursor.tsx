"use client"

import { useEffect, useRef, useState } from "react"

export function ConnectHubCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateEnabled = () => setEnabled(pointerQuery.matches && !motionQuery.matches)

    updateEnabled()
    pointerQuery.addEventListener("change", updateEnabled)
    motionQuery.addEventListener("change", updateEnabled)

    return () => {
      pointerQuery.removeEventListener("change", updateEnabled)
      motionQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return
    const activeDot: HTMLSpanElement = dot
    const activeRing: HTMLSpanElement = ring

    const root = document.documentElement
    let targetX = 0
    let targetY = 0
    let ringX = 0
    let ringY = 0
    let animationFrame = 0
    let hasPosition = false

    root.dataset.connecthubCursor = "active"

    function updateTarget(target: EventTarget | null) {
      if (!(target instanceof Element)) return

      const interactive = target.closest(
        'a, button, [role="button"], [role="link"], [data-cursor-target]',
      )
      const card = target.closest("article")
      const actionableCard =
        card?.querySelector('a, button, [role="button"], [data-cursor-target]') ??
        null
      const nativeTarget = target.closest(
        'input, textarea, select, [contenteditable="true"], [data-cursor-native], p, h1, h2, h3, h4, h5, h6, blockquote, li, label, dd, dt, td, th',
      )
      const useNativeCursor = Boolean(nativeTarget && !interactive)

      if (useNativeCursor) {
        root.dataset.cursorNative = "true"
      } else {
        delete root.dataset.cursorNative
      }

      if (interactive || actionableCard) {
        root.dataset.cursorHover = "true"
      } else {
        delete root.dataset.cursorHover
      }
    }

    function animateRing() {
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18
      activeRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`

      if (Math.abs(targetX - ringX) + Math.abs(targetY - ringY) > 0.2) {
        animationFrame = window.requestAnimationFrame(animateRing)
      } else {
        animationFrame = 0
      }
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return
      targetX = event.clientX + 12
      targetY = event.clientY + 12
      activeDot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
      updateTarget(event.target)
      if (!hasPosition) {
        ringX = targetX
        ringY = targetY
        activeRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
        hasPosition = true
      }
      root.dataset.cursorVisible = "true"
      if (!animationFrame) animationFrame = window.requestAnimationFrame(animateRing)
    }

    function handlePointerOver(event: PointerEvent) {
      if (event.pointerType === "mouse") updateTarget(event.target)
    }

    function handlePointerOut(event: PointerEvent) {
      if (event.pointerType === "mouse") updateTarget(event.relatedTarget)
    }

    function handlePointerLeave() {
      delete root.dataset.cursorVisible
      delete root.dataset.cursorHover
      delete root.dataset.cursorNative
    }

    function handlePointerDown() {
      root.dataset.cursorPressed = "true"
    }

    function handlePointerUp() {
      delete root.dataset.cursorPressed
    }

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    })
    document.addEventListener("pointerover", handlePointerOver, {
      passive: true,
    })
    document.addEventListener("pointerout", handlePointerOut, {
      passive: true,
    })
    document.addEventListener("pointerdown", handlePointerDown, {
      passive: true,
    })
    document.addEventListener("pointerup", handlePointerUp, { passive: true })
    document.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      document.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("pointerover", handlePointerOver)
      document.removeEventListener("pointerout", handlePointerOut)
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("pointerup", handlePointerUp)
      document.removeEventListener("pointerleave", handlePointerLeave)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      delete root.dataset.connecthubCursor
      delete root.dataset.cursorVisible
      delete root.dataset.cursorHover
      delete root.dataset.cursorNative
      delete root.dataset.cursorPressed
    }
  }, [enabled])

  return (
    <span aria-hidden="true" className="connecthub-cursor">
      <span ref={ringRef} className="connecthub-cursor__ring" />
      <span ref={dotRef} className="connecthub-cursor__dot" />
    </span>
  )
}
