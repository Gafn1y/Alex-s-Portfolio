"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="border-purple-400/20 bg-transparent w-10 h-10 rounded-full">
        <span className="sr-only">Toggle theme</span>
        <div className="h-4 w-4 opacity-50"></div>
      </Button>
    )
  }

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="border-purple-400/30 hover:bg-purple-800/30 text-foreground w-10 h-10 rounded-full bg-darkPurple-900/50 backdrop-blur-sm transition-all duration-300 btn-interactive relative overflow-hidden"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={false}
          animate={{
            backgroundColor: theme === "dark" ? "rgba(45, 212, 191, 0.1)" : "rgba(192, 132, 252, 0.1)",
          }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          initial={false}
          animate={{ rotate: theme === "dark" ? 0 : 180 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
          className="relative z-10"
        >
          {theme === "dark" ? (
            <Moon className="h-[1.2rem] w-[1.2rem] text-purple-200" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
          )}
        </motion.div>

        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
