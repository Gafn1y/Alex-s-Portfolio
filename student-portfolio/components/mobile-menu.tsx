"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="sm"
        className="border-purple-400/20 hover:bg-purple-800/30 text-teal-400 h-9 w-9 p-0 relative z-20"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 left-0 right-0 bg-darkPurple-950/95 backdrop-blur-md border-b border-purple-400/10 z-10"
          >
            <nav className="flex flex-col p-4 gap-3">
              <Link
                href="#about"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive p-2"
                onClick={closeMenu}
              >
                ABOUT
              </Link>
              <Link
                href="#skills"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive p-2"
                onClick={closeMenu}
              >
                SKILLS
              </Link>
              <Link
                href="#projects"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive p-2"
                onClick={closeMenu}
              >
                PROJECTS
              </Link>
              <Link
                href="#education"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive p-2"
                onClick={closeMenu}
              >
                EDUCATION
              </Link>
              <Link
                href="#game"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive p-2"
                onClick={closeMenu}
              >
                MINI-GAME
              </Link>
              <Link
                href="#contact"
                className="text-sm font-omori hover:text-teal-400 transition-colors nav-link-interactive p-2"
                onClick={closeMenu}
              >
                CONTACT
              </Link>
              <Button
                variant="outline"
                className="border-purple-400/20 hover:bg-purple-800/30 font-omori text-teal-400 btn-interactive w-full mt-2"
                asChild
              >
                <Link href="#contact" onClick={closeMenu}>
                  GET IN TOUCH
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
