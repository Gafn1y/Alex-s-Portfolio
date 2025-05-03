"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setPosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-darkPurple-950 text-white font-omori dark-gradient">
      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-darkPurple-950 to-darkPurple-900 opacity-80"></div>
        <div className="absolute inset-0 stars-bg"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-1">
        <div className="star-small" style={{ top: "15%", left: "10%" }}></div>
        <div className="star-medium" style={{ top: "25%", left: "85%" }}></div>
        <div className="star-large" style={{ top: "65%", left: "15%" }}></div>
        <div className="absolute top-40 right-20 animate-float-reverse">
          <Sparkles className="h-5 w-5 text-teal-400 icon-interactive" />
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse-slow">
          <div className="star-custom bg-pink-400 icon-interactive"></div>
        </div>
      </div>

      {/* Glitch overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
        <div className="absolute inset-0 bg-[url('/noise.png')] mix-blend-overlay"></div>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 text-center p-4">
        <h1
          className="text-8xl font-omori text-pink-400 mb-6 text-glitch"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            textShadow: `${position.x * 0.5}px ${position.y * 0.5}px 10px rgba(192, 132, 252, 0.5)`,
          }}
        >
          404
        </h1>
        <div
          className="omori-dialogue p-6 border-2 border-purple-400/70 relative bg-darkPurple-900/80 max-w-md omori-dialogue-interactive"
          style={{ transform: `translate(${-position.x * 0.2}px, ${-position.y * 0.2}px)` }}
        >
          <h2 className="text-2xl font-omori mb-4 text-teal-400 text-glitch-hover">PAGE NOT FOUND</h2>
          <p className="text-lg text-purple-200 mb-6">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-teal-500 hover:bg-teal-600 text-purple-950 font-omori btn-interactive" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                RETURN HOME
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-purple-400 hover:bg-purple-800/30 text-purple-200 font-omori btn-interactive"
              asChild
            >
              <Link href="javascript:history.back()">
                <ArrowLeft className="mr-2 h-4 w-4" />
                GO BACK
              </Link>
            </Button>
          </div>
        </div>

        {/* Interactive stars that follow cursor */}
        <div
          className="absolute w-6 h-6 text-yellow-300"
          style={{
            top: `calc(30% + ${position.y * 2}px)`,
            left: `calc(30% + ${position.x * 2}px)`,
            transition: "all 0.1s ease-out",
          }}
        >
          <Star className="h-full w-full animate-pulse icon-interactive" />
        </div>
        <div
          className="absolute w-4 h-4 text-teal-400"
          style={{
            bottom: `calc(30% + ${-position.y * 1.5}px)`,
            right: `calc(30% + ${-position.x * 1.5}px)`,
            transition: "all 0.2s ease-out",
          }}
        >
          <Star className="h-full w-full animate-float icon-interactive" />
        </div>
      </div>
    </div>
  )
}
