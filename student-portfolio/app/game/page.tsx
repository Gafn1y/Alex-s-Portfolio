"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, ArrowLeft, Star } from "lucide-react"
import Link from "next/link"
import PlanetMiniGame from "@/components/planet-mini-game"
import ScrollReveal from "@/components/scroll-reveal"

export default function GamePage() {
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
        <div className="star-small" style={{ top: "80%", left: "80%" }}></div>
        <div className="star-tiny" style={{ top: "40%", left: "20%" }}></div>
        <div className="star-tiny" style={{ top: "30%", left: "70%" }}></div>
        <div className="star-small" style={{ top: "70%", left: "40%" }}></div>
        <div className="star-medium" style={{ top: "20%", left: "30%" }}></div>
        <div className="star-tiny" style={{ top: "50%", left: "90%" }}></div>
        <div className="star-large" style={{ top: "85%", left: "60%" }}></div>
      </div>

      {/* Glitch overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
        <div className="absolute inset-0 bg-[url('/noise.png')] mix-blend-overlay"></div>
      </div>

      <header className="sticky top-0 z-10 bg-darkPurple-950/80 backdrop-blur-sm border-b border-purple-400/10">
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="font-omori text-xl">
            <span className="text-teal-400">Dev</span>Portfolio
          </Link>
          <Button
            variant="outline"
            className="border-purple-400/20 hover:bg-purple-800/30 font-omori text-teal-400 btn-interactive"
            asChild
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">BACK TO HOME</span>
              <span className="sm:hidden">BACK</span>
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 relative z-1 py-8 md:py-12">
        <div className="container">
          <div className="absolute top-10 right-10 animate-float-slow">
            <Star className="h-6 w-6 text-yellow-300 icon-interactive" />
          </div>
          <div className="absolute bottom-10 left-10 animate-float">
            <Star className="h-4 w-4 text-teal-400 icon-interactive" />
          </div>

          <ScrollReveal>
            <h1 className="text-2xl md:text-3xl font-omori mb-8 md:mb-12 text-center flex items-center justify-center gap-2 text-teal-400 text-glitch-hover">
              <Gamepad2 className="h-5 w-5 md:h-6 md:w-6 icon-interactive" />
              PLANET COLLECTOR MINI-GAME
            </h1>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card">
                <CardHeader>
                  <CardTitle className="font-omori text-teal-400">PLANET COLLECTOR</CardTitle>
                  <CardDescription className="text-purple-200">
                    Collect planets, avoid obstacles, and unlock power-ups in this cosmic mini-game!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[500px]">
                    <PlanetMiniGame />
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 space-y-4 bg-darkPurple-900/50 p-4 rounded-lg border border-purple-400/30">
                <h2 className="text-xl font-omori text-teal-400">How to Play</h2>
                <div className="space-y-2 text-purple-200">
                  <p>• Click or tap on planets to collect them and earn points</p>
                  <p>• Different planets are worth different point values</p>
                  <p>• Collect planets quickly to build up combos for bonus points</p>
                  <p>• Watch out for special planets:</p>
                  <ul className="ml-6 space-y-1">
                    <li>
                      🔵 <span className="text-blue-400">Blue glowing planets</span>: Power-ups (shield, time boost,
                      point multiplier)
                    </li>
                    <li>
                      🟡 <span className="text-yellow-400">Yellow bouncing planets</span>: Bonus points
                    </li>
                    <li>
                      🔴 <span className="text-pink-400">Pink spinning planets</span>: Danger! Will cost you a life
                    </li>
                  </ul>
                  <p>• In Medium and Hard difficulties, avoid the red obstacles</p>
                  <p>• Level up by earning points to get time bonuses</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <footer className="border-t border-purple-400/10 py-6 bg-darkPurple-950">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-purple-300">
            © {new Date().getFullYear()} Sukovatitsyn Alexey. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-purple-300 hover:text-white transition-colors nav-link-interactive">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-purple-300 hover:text-white transition-colors nav-link-interactive">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
