"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Planet from "@/components/planet"
import { Star, Trophy, RefreshCw, Shield, Zap, Clock, Heart } from "lucide-react"

// Define game planet types with different point values
interface GamePlanet {
  id: number
  type: "purple" | "teal" | "pink" | "yellow" | "blue"
  size: "tiny" | "small" | "medium"
  position: { x: number; y: number }
  collected: boolean
  points: number
  special?: "powerup" | "bonus" | "danger" | null
  speed?: number
}

// Define obstacle type
interface Obstacle {
  id: number
  position: { x: number; y: number }
  size: number
  active: boolean
}

// Define power-up types
type PowerUpType = "shield" | "timeBoost" | "pointMultiplier" | "extraLife"

interface PowerUp {
  type: PowerUpType
  active: boolean
  duration: number
  startTime?: number
}

// Game difficulty levels
type DifficultyLevel = "easy" | "medium" | "hard"

export default function PlanetMiniGame() {
  // Game state
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [planets, setPlanets] = useState<GamePlanet[]>([])
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [highScore, setHighScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [lastCollectTime, setLastCollectTime] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("easy")
  const [level, setLevel] = useState(1)
  const [powerUps, setPowerUps] = useState<{ [key in PowerUpType]: PowerUp }>({
    shield: { type: "shield", active: false, duration: 5000 },
    timeBoost: { type: "timeBoost", active: false, duration: 5000 },
    pointMultiplier: { type: "pointMultiplier", active: false, duration: 5000 },
    extraLife: { type: "extraLife", active: false, duration: 0 },
  })
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  // Refs
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const obstacleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const powerUpTimerRef = useRef<NodeJS.Timeout | null>(null)
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null)

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
    if (gameStarted && timeLeft > 0 && !gameOver) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if ((timeLeft === 0 || lives === 0) && gameStarted) {
      endGame()
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [gameStarted, timeLeft, lives, gameOver])

  // Obstacle movement
  useEffect(() => {
    if (gameStarted && !gameOver && difficulty !== "easy") {
      obstacleTimerRef.current = setInterval(() => {
        moveObstacles()
      }, 50)
    }

    return () => {
      if (obstacleTimerRef.current) clearInterval(obstacleTimerRef.current)
    }
  }, [gameStarted, obstacles, gameOver, difficulty])

  // Power-up timer
  useEffect(() => {
    if (gameStarted && !gameOver) {
      powerUpTimerRef.current = setInterval(() => {
        checkPowerUps()
      }, 1000)
    }

    return () => {
      if (powerUpTimerRef.current) clearInterval(powerUpTimerRef.current)
    }
  }, [gameStarted, powerUps, gameOver])

  // Combo timer
  useEffect(() => {
    if (combo > 0) {
      comboTimerRef.current = setTimeout(() => {
        setCombo(0)
      }, 2000)
    }

    return () => {
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current)
    }
  }, [combo, lastCollectTime])

  // Message display timer
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showMessage])

  // Start game with selected difficulty
  const startGame = (selectedDifficulty: DifficultyLevel = "easy") => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(30)
    setLives(3)
    setCombo(0)
    setGameOver(false)
    setDifficulty(selectedDifficulty)
    setLevel(1)
    setPowerUps({
      shield: { type: "shield", active: false, duration: 5000 },
      timeBoost: { type: "timeBoost", active: false, duration: 5000 },
      pointMultiplier: { type: "pointMultiplier", active: false, duration: 5000 },
      extraLife: { type: "extraLife", active: false, duration: 0 },
    })
    generatePlanets()

    if (selectedDifficulty !== "easy") {
      generateObstacles()
    } else {
      setObstacles([])
    }
  }

  // End game
  const endGame = () => {
    setGameStarted(false)
    setGameOver(true)
    if (score > highScore) {
      setHighScore(score)
      displayMessage("New High Score!", "success")
    }
  }

  // Display message
  const displayMessage = (text: string, type: "success" | "warning" | "info" = "info") => {
    setMessage(text)
    setShowMessage(true)
  }

  // Move obstacles
  const moveObstacles = () => {
    if (!gameAreaRef.current) return

    const { width, height } = gameAreaRef.current.getBoundingClientRect()

    setObstacles((prev) =>
      prev.map((obstacle) => {
        // Move in a random direction
        const newX = obstacle.position.x + (Math.random() * 4 - 2)
        const newY = obstacle.position.y + (Math.random() * 4 - 2)

        // Keep within bounds
        const boundedX = Math.max(0, Math.min(width - obstacle.size, newX))
        const boundedY = Math.max(0, Math.min(height - obstacle.size, newY))

        return {
          ...obstacle,
          position: { x: boundedX, y: boundedY },
        }
      }),
    )

    // Check for collisions with planets
    checkObstacleCollisions()
  }

  // Check for obstacle collisions with player
  const checkObstacleCollisions = () => {
    // Only check if shield is not active
    if (powerUps.shield.active) return

    // Get cursor position (simplified - would need actual tracking in a real game)
    const cursor = { x: 0, y: 0 } // Placeholder

    obstacles.forEach((obstacle) => {
      if (!obstacle.active) return

      // Simple collision detection (would be more sophisticated in a real game)
      planets.forEach((planet) => {
        if (planet.collected) return

        const dx = planet.position.x - obstacle.position.x
        const dy = planet.position.y - obstacle.position.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < obstacle.size / 2 + 20) {
          // Assuming planet size is around 20px
          // Mark planet as collected (destroyed)
          setPlanets((prev) => prev.map((p) => (p.id === planet.id ? { ...p, collected: true } : p)))

          // Lose a life if it's a normal planet
          if (!planet.special && lives > 0) {
            setLives((prev) => prev - 1)
            displayMessage("Lost a life!", "warning")
          }
        }
      })
    })
  }

  // Check and update power-ups
  const checkPowerUps = () => {
    const now = Date.now()
    let updated = false

    const updatedPowerUps = { ...powerUps }

    Object.keys(powerUps).forEach((key) => {
      const powerUpKey = key as PowerUpType
      const powerUp = powerUps[powerUpKey]

      if (powerUp.active && powerUp.startTime && powerUp.duration > 0) {
        const elapsed = now - powerUp.startTime

        if (elapsed >= powerUp.duration) {
          updatedPowerUps[powerUpKey] = { ...powerUp, active: false }
          updated = true

          // Special handling for time boost ending
          if (powerUpKey === "timeBoost") {
            // No additional action needed, just deactivate
          }
        }
      }
    })

    if (updated) {
      setPowerUps(updatedPowerUps)
    }
  }

  // Activate a power-up
  const activatePowerUp = (type: PowerUpType) => {
    const now = Date.now()

    setPowerUps((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        active: true,
        startTime: now,
      },
    }))

    // Handle specific power-up effects
    switch (type) {
      case "timeBoost":
        setTimeLeft((prev) => prev + 5)
        displayMessage("+5 seconds!", "success")
        break
      case "extraLife":
        setLives((prev) => Math.min(prev + 1, 5)) // Max 5 lives
        displayMessage("+1 life!", "success")
        break
      case "shield":
        displayMessage("Shield activated!", "success")
        break
      case "pointMultiplier":
        displayMessage("2x Points!", "success")
        break
    }
  }

  // Collect a planet
  const collectPlanet = (id: number) => {
    const planet = planets.find((p) => p.id === id)
    if (!planet || planet.collected) return

    // Update combo
    const now = Date.now()
    if (now - lastCollectTime < 1000) {
      setCombo((prev) => prev + 1)
    } else {
      setCombo(1)
    }
    setLastCollectTime(now)

    // Calculate points with combo and multiplier
    let pointsToAdd = planet.points * (1 + combo * 0.1) // 10% bonus per combo level

    // Apply point multiplier if active
    if (powerUps.pointMultiplier.active) {
      pointsToAdd *= 2
    }

    // Handle special planets
    if (planet.special) {
      switch (planet.special) {
        case "powerup":
          // Randomly select a power-up
          const powerUpTypes: PowerUpType[] = ["shield", "timeBoost", "pointMultiplier", "extraLife"]
          const randomPowerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)]
          activatePowerUp(randomPowerUp)
          break
        case "bonus":
          // Bonus points
          pointsToAdd *= 2
          displayMessage("Bonus points!", "success")
          break
        case "danger":
          // Lose a life if shield is not active
          if (!powerUps.shield.active && lives > 0) {
            setLives((prev) => prev - 1)
            displayMessage("Danger planet! Lost a life!", "warning")
          } else if (powerUps.shield.active) {
            displayMessage("Shield protected you!", "info")
          }
          break
      }
    }

    // Update score
    setScore((prev) => Math.floor(prev + pointsToAdd))

    // Mark planet as collected
    setPlanets((prev) =>
      prev.map((planet) => {
        if (planet.id === id) {
          return { ...planet, collected: true }
        }
        return planet
      }),
    )

    // Check if level up is needed
    checkLevelUp()

    // If all planets are collected, generate new ones
    const allCollected = planets.every((planet) => planet.id === id || planet.collected)
    if (allCollected) {
      setTimeout(() => {
        generatePlanets()
        if (difficulty !== "easy") {
          generateObstacles()
        }
      }, 500)
    }
  }

  // Check if player should level up
  const checkLevelUp = () => {
    // Level up every 100 points
    const newLevel = Math.floor(score / 100) + 1
    if (newLevel > level) {
      setLevel(newLevel)
      displayMessage(`Level ${newLevel}!`, "success")

      // Add time bonus for leveling up
      setTimeLeft((prev) => prev + 10)
      displayMessage("+10 seconds for level up!", "success")
    }
  }

  // Generate obstacles based on difficulty
  const generateObstacles = () => {
    if (!gameAreaRef.current) return

    const { width, height } = gameAreaRef.current.getBoundingClientRect()
    const newObstacles: Obstacle[] = []

    // Number of obstacles based on difficulty
    const obstacleCount = difficulty === "medium" ? 2 : 4

    for (let i = 0; i < obstacleCount; i++) {
      newObstacles.push({
        id: i,
        position: {
          x: Math.random() * (width - 30),
          y: Math.random() * (height - 30),
        },
        size: Math.random() * 10 + 20, // 20-30px
        active: true,
      })
    }

    setObstacles(newObstacles)
  }

  // Generate planets with different types and special properties
  const generatePlanets = () => {
    if (!gameAreaRef.current) return

    const { width, height } = gameAreaRef.current.getBoundingClientRect()
    const newPlanets: GamePlanet[] = []

    // Generate fewer planets on smaller screens
    const isMobileView = width < 500
    const basePlanetCount = isMobileView
      ? Math.floor(Math.random() * 2) + 3 // 3-4 planets on mobile
      : Math.floor(Math.random() * 4) + 5 // 5-8 planets on desktop

    // Add more planets based on level and difficulty
    const levelBonus = Math.floor(level / 3)
    const difficultyMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 1.2 : 1.5
    const planetCount = Math.floor((basePlanetCount + levelBonus) * difficultyMultiplier)

    const planetTypes = ["purple", "teal", "pink", "yellow", "blue"] as const
    const planetSizes = isMobileView
      ? (["tiny", "small"] as const) // Only tiny and small on mobile
      : (["tiny", "small", "medium"] as const)

    // Special planet chance increases with level and difficulty
    const specialChance = 0.1 + level * 0.02 + (difficulty === "easy" ? 0 : difficulty === "medium" ? 0.05 : 0.1)

    for (let i = 0; i < planetCount; i++) {
      // Ensure planets aren't too close to edges on mobile
      const margin = isMobileView ? 40 : 60
      const planetType = planetTypes[Math.floor(Math.random() * planetTypes.length)]
      const planetSize = planetSizes[Math.floor(Math.random() * planetSizes.length)]

      // Determine points based on size and type
      let points = 10 // Base points

      // Size modifier
      if (planetSize === "tiny") points = 15
      else if (planetSize === "small") points = 10
      else if (planetSize === "medium") points = 5

      // Type modifier
      if (planetType === "purple") points *= 1.5 // Rare type bonus

      // Determine if this is a special planet
      let special: GamePlanet["special"] = null
      if (Math.random() < specialChance) {
        const specialTypes: GamePlanet["special"][] = ["powerup", "bonus", "danger"]
        special = specialTypes[Math.floor(Math.random() * specialTypes.length)]
      }

      // Add movement for higher difficulties
      const speed = difficulty === "easy" ? 0 : difficulty === "medium" ? 0.5 : 1

      newPlanets.push({
        id: i,
        type: planetType,
        size: planetSize,
        position: {
          x: Math.random() * (width - margin),
          y: Math.random() * (height - margin),
        },
        collected: false,
        points: Math.floor(points),
        special,
        speed,
      })
    }

    setPlanets(newPlanets)
  }

  // Render the game UI
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

      {/* Lives and power-ups display */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: lives }).map((_, i) => (
            <Heart key={i} className="h-4 w-4 text-pink-400" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {powerUps.shield.active && <Shield className="h-4 w-4 text-blue-400" />}
          {powerUps.timeBoost.active && <Clock className="h-4 w-4 text-green-400" />}
          {powerUps.pointMultiplier.active && <Zap className="h-4 w-4 text-yellow-400" />}
        </div>
        <div className="text-xs font-omori">{combo > 1 && <span className="text-teal-400">Combo x{combo}!</span>}</div>
      </div>

      {/* Level display */}
      <div className="text-center mb-2">
        <span className="text-xs font-omori text-purple-200">Level {level}</span>
      </div>

      <div
        ref={gameAreaRef}
        className="flex-1 relative border-2 border-purple-400/50 rounded-lg bg-darkPurple-900/30 overflow-hidden"
      >
        {/* Message display */}
        {showMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-darkPurple-800/80 px-3 py-1 rounded-md text-teal-400 font-omori text-sm">
            {message}
          </div>
        )}

        {!gameStarted && !gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <h3 className="text-xl md:text-2xl font-omori text-teal-400 mb-2 md:mb-4">Planet Collector</h3>
            <p className="text-sm md:text-base text-purple-200 mb-4 md:mb-6">
              Collect planets to earn points! Watch out for special planets and obstacles.
            </p>
            <div className="flex flex-col gap-2 mb-4">
              <p className="text-xs text-purple-200">Select difficulty:</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => startGame("easy")}
                  className="bg-green-500 hover:bg-green-600 text-purple-950 font-omori btn-interactive text-xs"
                >
                  Easy
                </Button>
                <Button
                  onClick={() => startGame("medium")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-purple-950 font-omori btn-interactive text-xs"
                >
                  Medium
                </Button>
                <Button
                  onClick={() => startGame("hard")}
                  className="bg-red-500 hover:bg-red-600 text-purple-950 font-omori btn-interactive text-xs"
                >
                  Hard
                </Button>
              </div>
            </div>
            <div className="text-xs text-purple-200 mb-4">
              <p className="mb-1">🟣 Purple planets: 15 points</p>
              <p className="mb-1">🔵 Blue planets: 10 points</p>
              <p className="mb-1">⭐ Special planets: Power-ups & bonuses</p>
              <p className="mb-1">⚡ Combo: Collect quickly for bonus points</p>
            </div>
          </div>
        ) : gameOver ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-darkPurple-900/80 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-omori text-teal-400 mb-2">Game Over!</h3>
            <p className="text-lg md:text-xl font-omori text-purple-200 mb-3 md:mb-4">Your score: {score}</p>
            {score >= highScore && score > 0 && (
              <p className="text-base md:text-lg font-omori text-yellow-400 mb-4 md:mb-6">New High Score!</p>
            )}
            <p className="text-sm text-purple-200 mb-4">You reached level {level}!</p>
            <Button
              onClick={() => startGame(difficulty)}
              className="bg-teal-500 hover:bg-teal-600 text-purple-950 font-omori btn-interactive text-sm md:text-base mb-2"
            >
              <RefreshCw className="mr-2 h-3 w-3 md:h-4 md:w-4" />
              Play Again
            </Button>
            <Button
              onClick={() => setGameStarted(false)}
              variant="outline"
              className="text-purple-200 font-omori btn-interactive text-xs"
            >
              Change Difficulty
            </Button>
          </div>
        ) : (
          <>
            {/* Render obstacles */}
            {obstacles.map((obstacle) => (
              <motion.div
                key={`obstacle-${obstacle.id}`}
                className="absolute bg-red-500/50 rounded-full"
                style={{
                  left: obstacle.position.x,
                  top: obstacle.position.y,
                  width: obstacle.size,
                  height: obstacle.size,
                }}
              />
            ))}

            {/* Render planets */}
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
                      className={`absolute cursor-pointer touch-none ${
                        planet.special === "powerup"
                          ? "animate-pulse"
                          : planet.special === "bonus"
                            ? "animate-bounce"
                            : planet.special === "danger"
                              ? "animate-spin-slow"
                              : ""
                      }`}
                      style={{
                        left: planet.position.x,
                        top: planet.position.y,
                        filter:
                          planet.special === "powerup"
                            ? "drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))"
                            : planet.special === "bonus"
                              ? "drop-shadow(0 0 8px rgba(255, 255, 0, 0.8))"
                              : planet.special === "danger"
                                ? "drop-shadow(0 0 8px rgba(255, 0, 0, 0.8))"
                                : "none",
                      }}
                      onClick={() => collectPlanet(planet.id)}
                    >
                      <Planet
                        type={
                          planet.special === "powerup"
                            ? "blue"
                            : planet.special === "bonus"
                              ? "yellow"
                              : planet.special === "danger"
                                ? "pink"
                                : planet.type
                        }
                        size={planet.size}
                        interactive={true}
                        hasRing={planet.special === "powerup" || planet.special === "bonus"}
                      />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}
