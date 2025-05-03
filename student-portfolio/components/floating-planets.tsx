"use client"

import { useEffect, useState, useRef } from "react"
import Planet from "./planet"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { JSX } from "react"

export default function FloatingPlanets() {
  const [planets, setPlanets] = useState<JSX.Element[]>([])
  const isMobile = useMediaQuery("(max-width: 768px)")
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Create random planets - fewer on mobile
    const types = ["purple", "teal", "pink", "yellow", "blue"] as const
    const sizes = ["tiny", "small"] as const
    const count = isMobile ? 4 : 8

    const newPlanets = Array.from({ length: count }, (_, i) => {
      const type = types[Math.floor(Math.random() * types.length)]
      const size = sizes[Math.floor(Math.random() * sizes.length)]
      const hasRing = Math.random() > 0.7
      const top = `${Math.random() * 90}%`
      const left = `${Math.random() * 90}%`
      const animationDelay = `${Math.random() * 5}s`
      const animationDuration = `${15 + Math.random() * 20}s`

      return (
        <div
          key={i}
          className="absolute z-10 pointer-events-auto"
          style={{
            top,
            left,
            animationDelay,
            animationDuration,
            animation: `float-slow ${animationDuration} ease-in-out infinite`,
          }}
        >
          <Planet
            type={type}
            size={size}
            hasRing={hasRing}
            hasFace={true}
            interactive={!isMobile} // Disable interactivity on mobile for better performance
          />
        </div>
      )
    })

    setPlanets(newPlanets)
  }, [isMobile])

  return <div className="fixed inset-0 pointer-events-none">{planets}</div>
}
