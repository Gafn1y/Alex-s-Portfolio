"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import MobileMenu from "@/components/mobile-menu"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-darkPurple-950/80 backdrop-blur-md border-b border-purple-400/10">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <Link href="/" className="text-xl font-omori text-teal-400 hover:text-teal-300 transition-colors">
            <span className="text-teal-400">Dev</span>Portfolio
          </Link>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex items-center space-x-6">
              <Link
                href="#about"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive"
              >
                ABOUT
              </Link>
              <Link
                href="#skills"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive"
              >
                SKILLS
              </Link>
              <Link
                href="#projects"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive"
              >
                PROJECTS
              </Link>
              <Link
                href="#education"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive"
              >
                EDUCATION
              </Link>
              <Link
                href="#contact"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive"
              >
                CONTACT
              </Link>
              <Link
                href="/game"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive"
              >
                GAME
              </Link>
            </nav>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle - visible on all screen sizes */}
            <ThemeToggle />

            {/* Contact Button - only visible on desktop */}
            <Button
              variant="outline"
              className="border-purple-400/20 hover:bg-purple-800/30 font-omori text-teal-400 btn-interactive hidden md:flex text-sm"
              asChild
            >
              <Link href="#contact">GET IN TOUCH</Link>
            </Button>

            {/* Mobile Menu - only visible on mobile */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
