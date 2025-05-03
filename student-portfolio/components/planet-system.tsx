"use client"

import { useRef, useEffect, useState } from "react"
import Planet from "./planet"
import { motion } from "framer-motion"
import { useMediaQuery } from "@/hooks/use-media-query"

interface PlanetSystemProps {
  className?: string
}

export default function PlanetSystem({ className = "" }: PlanetSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const container = containerRef.current
    if (!container || isMobile) return

    // Throttle function to limit execution rate
    const throttle = (callback: Function, delay: number) => {
      let lastCall = 0
      return (...args: any[]) => {
        const now = new Date().getTime()
        if (now - lastCall < delay) return
        lastCall = now
        return callback(...args)
      }
    }

    const handleMouseMove = throttle((e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      setPosition({ x, y })
    }, 50) // Throttle to 50ms

    container.addEventListener("mousemove", handleMouseMove as any)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove as any)
    }
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      className={`relative ${className} h-64 overflow-hidden rounded-lg border-2 border-purple-400/70 bg-darkPurple-900/30`}
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>

      <motion.div
        className="absolute top-1/4 left-1/4"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          x: isMobile ? 0 : position.x * 20 * 0.8,
          y: isMobile ? 0 : position.y * 20 * 0.8,
        }}
        transition={{
          delay: 0.2,
          x: { type: "spring", stiffness: 100, damping: 20 },
          y: { type: "spring", stiffness: 100, damping: 20 },
        }}
      >
        <Planet type="purple" size="large" hasRing={true} />
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/4"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          x: isMobile ? 0 : position.x * 20 * 0.6,
          y: isMobile ? 0 : position.y * 20 * 0.6,
        }}
        transition={{
          delay: 0.4,
          x: { type: "spring", stiffness: 100, damping: 20 },
          y: { type: "spring", stiffness: 100, damping: 20 },
        }}
      >
        <Planet type="teal" size="medium" hasOrbit={true} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/3"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          x: isMobile ? 0 : position.x * 20 * 0.4,
          y: isMobile ? 0 : position.y * 20 * 0.4,
        }}
        transition={{
          delay: 0.6,
          x: { type: "spring", stiffness: 100, damping: 20 },
          y: { type: "spring", stiffness: 100, damping: 20 },
        }}
      >
        <Planet type="pink" size="small" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/3"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          x: isMobile ? 0 : position.x * 20 * 0.2,
          y: isMobile ? 0 : position.y * 20 * 0.2,
        }}
        transition={{
          delay: 0.8,
          x: { type: "spring", stiffness: 100, damping: 20 },
          y: { type: "spring", stiffness: 100, damping: 20 },
        }}
      >
        <Planet type="yellow" size="tiny" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="star-small" style={{ top: "15%", left: "10%" }}></div>
        <div className="star-medium" style={{ top: "65%", left: "85%" }}></div>
        <div className="star-tiny" style={{ top: "40%", left: "70%" }}></div>
        <div className="star-large" style={{ top: "75%", left: "25%" }}></div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-white font-omori text-sm">
        <span className="bg-purple-900/70 px-2 py-1 rounded">Explore the cosmic wonders!</span>
      </div>
    </div>
  )
}
