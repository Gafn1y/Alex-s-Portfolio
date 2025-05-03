"use client"

import { useState, useCallback } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

type PlanetType = "purple" | "teal" | "pink" | "yellow" | "blue"
type PlanetSize = "tiny" | "small" | "medium" | "large"

interface PlanetProps {
  type: PlanetType
  size: PlanetSize
  className?: string
  hasRing?: boolean
  hasFace?: boolean
  hasOrbit?: boolean
  interactive?: boolean
}

export default function Planet({
  type = "purple",
  size = "medium",
  className = "",
  hasRing = false,
  hasFace = true,
  hasOrbit = false,
  interactive = true,
}: PlanetProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const controls = useAnimation()

  const sizeMap = {
    tiny: "w-6 h-6 sm:w-8 sm:h-8",
    small: "w-10 h-10 sm:w-12 sm:h-12",
    medium: "w-14 h-14 sm:w-16 sm:h-16",
    large: "w-20 h-20 sm:w-24 sm:h-24",
  }

  const colorMap = {
    purple: "bg-purple-500",
    teal: "bg-teal-400",
    pink: "bg-pink-400",
    yellow: "bg-yellow-300",
    blue: "bg-blue-400",
  }

  const ringColorMap = {
    purple: "border-purple-300",
    teal: "border-teal-200",
    pink: "border-pink-200",
    yellow: "border-yellow-200",
    blue: "border-blue-200",
  }

  const handleClick = useCallback(() => {
    if (!interactive) return

    setIsClicked(true)
    controls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 },
    })

    setTimeout(() => setIsClicked(false), 500)
  }, [controls, interactive])

  const handleHoverStart = useCallback(() => {
    if (!interactive) return
    setIsHovered(true)
  }, [interactive])

  const handleHoverEnd = useCallback(() => {
    if (!interactive) return
    setIsHovered(false)
  }, [interactive])

  return (
    <div className={`relative inline-block ${className}`}>
      {hasOrbit && (
        <motion.div
          className={`absolute inset-0 rounded-full border-2 border-dashed ${ringColorMap[type]} opacity-50`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{ transform: "scale(1.5)" }}
        ></motion.div>
      )}

      <motion.div
        className={`${sizeMap[size]} rounded-full ${colorMap[type]} relative ${interactive ? "cursor-pointer" : ""}`}
        animate={controls}
        whileHover={interactive ? { y: -5, scale: 1.1 } : {}}
        whileTap={interactive ? { scale: 0.9 } : {}}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={handleClick}
        initial={false}
      >
        {/* Planet craters/details */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-white opacity-20"></div>

        {/* Planet ring if enabled */}
        {hasRing && (
          <motion.div
            className={`absolute left-1/2 top-1/2 w-full h-1/2 border-2 rounded-full ${ringColorMap[type]}`}
            style={{ transformOrigin: "center" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            initial={{ rotate: -12, translateX: "-50%", translateY: "-50%", scale: 1.4 }}
          ></motion.div>
        )}

        {/* Planet face if enabled */}
        {hasFace && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-1/2 h-1/2">
              {/* Eyes */}
              <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-purple-900"></div>
              <div className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full bg-purple-900"></div>

              {/* Mouth - changes with hover/click state */}
              <AnimatePresence mode="wait">
                {isClicked ? (
                  <motion.div
                    key="clicked"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-b-2 border-purple-900 transform rotate-180"
                  ></motion.div>
                ) : isHovered ? (
                  <motion.div
                    key="hovered"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-900"
                  ></motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-2 h-1 border-b-2 border-purple-900"
                  ></motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </motion.div>

      {/* Tooltip that appears on hover */}
      <AnimatePresence>
        {isHovered && interactive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-purple-900/80 px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-purple-400 z-10"
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Planet
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
