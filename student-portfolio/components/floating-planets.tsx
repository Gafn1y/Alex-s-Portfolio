"use client"

import { useEffect, useState, useRef } from "react"
import Planet from "./planet"
import { useMediaQuery } from "@/hooks/use-media-query"
import type { JSX } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingPlanets() {
  const [planets, setPlanets] = useState<JSX.Element[]>([])
  const isMobile = useMediaQuery("(max-width: 768px)")
  const initialized = useRef(false)
  const { theme } = useTheme()

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
        <motion.div
          key={i}
          className="absolute z-10 pointer-events-auto"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: i * 0.2 }}
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
        </motion.div>
      )
    })

    setPlanets(newPlanets)
  }, [isMobile])

  return (
    <div className="fixed inset-0 pointer-events-none transition-opacity duration-500">
      <AnimatePresence>
        {planets.map((planet, index) => (
          <motion.div key={index} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.5 }}>
            {planet}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
