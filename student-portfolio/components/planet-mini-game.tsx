"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Planet from "@/components/planet"
import { Star, Trophy, RefreshCw } from "lucide-react"

interface GamePlanet {
  id: number
  type: "purple" | "teal" | "pink" | "yellow" | "blue"
  size: "tiny" | "small" | "medium"
  position: { x: number; y: number }
  collected: boolean
}

export default function PlanetMiniGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [planets, setPlanets] = useState<GamePlanet[]>([])
  const [highScore, setHighScore] = useState(0)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem("planetGameHighScore")
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore))
    }
  }, [])

  // Save high score to localStorage when it changes
  useEffect(() => {
    if (highScore > 0) {
      localStorage.setItem("planetGameHighScore", highScore.toString())
    }
  }, [highScore])

  // Game timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameStarted) {
      endGame()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [gameStarted, timeLeft])

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(30)
    generatePlanets()
  }

  const endGame = () => {
    setGameStarted(false)
    if (score > highScore) {
      setHighScore(score)
    }
  }

  // Update the game area to be more responsive on mobile
  const collectPlanet = (id: number) => {
    setPlanets((prev) =>
      prev.map((planet) => {
        if (planet.id === id && !planet.collected) {
          setScore((prevScore) => prevScore + 1)
          return { ...planet, collected: true }
        }
        return planet
      }),
    )

    // If all planets are collected, generate new ones
    const allCollected = planets.every((planet) => planet.id === id || planet.collected)
    if (allCollected) {
      setTimeout(generatePlanets, 500)
    }
  }

  // Update the generatePlanets function to be more mobile-friendly
  const generatePlanets = () => {
    if (!gameAreaRef.current) return

    const { width, height } = gameAreaRef.current.getBoundingClientRect()
    const newPlanets: GamePlanet[] = []

    // Generate fewer planets on smaller screens
    const isMobileView = width < 500
    const planetCount = isMobileView
      ? Math.floor(Math.random() * 2) + 3
      : // 3-4 planets on mobile
        Math.floor(Math.random() * 4) + 5 // 5-8 planets on desktop

    const planetTypes = ["purple", "teal", "pink", "yellow", "blue"] as const
    const planetSizes = isMobileView
      ? (["tiny", "small"] as const)
      : // Only tiny and small on mobile
        (["tiny", "small", "medium"] as const)

    for (let i = 0; i < planetCount; i++) {
      // Ensure planets aren't too close to edges on mobile
      const margin = isMobileView ? 40 : 60
      newPlanets.push({
        id: i,
        type: planetTypes[Math.floor(Math.random() * planetTypes.length)],
        size: planetSizes[Math.floor(Math.random() * planetSizes.length)],
        position: {
          x: Math.random() * (width - margin),
          y: Math.random() * (height - margin),
        },
        collected: false,
      })
    }

    setPlanets(newPlanets)
  }

  // Update the return JSX to be more mobile-friendly
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-2 md:mb-4">
        <div className="flex items-center gap-1 md:gap-2">
          <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
          <span className="font-omori text-sm md:text-lg">Score: {score}</span>
        </div>
        <div className="font-omori text-sm md:text-lg">Time: {timeLeft}s</div>
        <div className="flex items-center gap-1 md:gap-2">
          <Trophy className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
          <span className="font-omori text-sm md:text-lg">Best: {highScore}</span>
        </div>
      </div>

      <div
        ref={gameAreaRef}
        className="flex-1 relative border-2 border-purple-400/50 rounded-lg bg-darkPurple-900/30 overflow-hidden"
      >
        {!gameStarted ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <h3 className="text-xl md:text-2xl font-omori text-teal-400 mb-2 md:mb-4">Planet Collector</h3>
            <p className="text-sm md:text-base text-purple-200 mb-4 md:mb-6">
              Click on the planets to collect them before time runs out! How many can you collect in 30 seconds?
            </p>
            <Button
              onClick={startGame}
              className="bg-teal-500 hover:bg-teal-600 text-purple-950 font-omori btn-interactive text-sm md:text-base"
            >
              Start Game
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            {planets.map(
              (planet) =>
                !planet.collected && (
                  <motion.div
                    key={planet.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute cursor-pointer touch-none"
                    style={{ left: planet.position.x, top: planet.position.y }}
                    onClick={() => collectPlanet(planet.id)}
                  >
                    <Planet type={planet.type} size={planet.size} interactive={true} />
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        )}

        {timeLeft === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-darkPurple-900/80 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-omori text-teal-400 mb-2">Game Over!</h3>
            <p className="text-lg md:text-xl font-omori text-purple-200 mb-3 md:mb-4">Your score: {score}</p>
            {score >= highScore && score > 0 && (
              <p className="text-base md:text-lg font-omori text-yellow-400 mb-4 md:mb-6">New High Score!</p>
            )}
            <Button
              onClick={startGame}
              className="bg-teal-500 hover:bg-teal-600 text-purple-950 font-omori btn-interactive text-sm md:text-base"
            >
              <RefreshCw className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
