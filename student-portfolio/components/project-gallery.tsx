"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ZoomIn, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
  link?: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Telegram-Discord Bot",
    description: "A connecting bridge between Discord and Telegram",
    image: "/project-images/telegram-discord.png",
    link: "/projects/telegram-discord-bot",
  },
  {
    id: 2,
    title: "Meteo Clock",
    description: "A smart meteorological station on Arduino",
    image: "/project-images/meteo-clock.png",
    link: "/projects/meteo-clock",
  },
  {
    id: 3,
    title: "Auto-Aiming Fan",
    description: "Arduino-based smart fan project",
    image: "/project-images/auto-fan.png",
    link: "/projects/auto-aiming-fan",
  },
]

export default function ProjectGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  return (
    <>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            className="gallery-item card-interactive"
            whileHover={{ y: -5 }}
            onClick={() => setSelectedItem(item)}
          >
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent z-10"></div>
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={400}
                height={225}
                className="object-cover w-full h-full transition-transform duration-500"
              />
              <div className="gallery-overlay">
                <div>
                  <h3 className="text-white font-omori text-lg">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>
              <div className="absolute top-2 right-2 z-20">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedItem(item)
                  }}
                >
                  <ZoomIn className="h-4 w-4 text-white" />
                  <span className="sr-only">View</span>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-darkPurple-900 rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-black/20 hover:bg-black/40"
                onClick={() => setSelectedItem(null)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>

              <div className="aspect-video relative">
                <Image
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.title}
                  width={800}
                  height={450}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-omori text-teal-400 mb-2">{selectedItem.title}</h2>
                <p className="text-purple-200 mb-4">{selectedItem.description}</p>

                {selectedItem.link && (
                  <Button className="bg-teal-500 hover:bg-teal-600 text-purple-950 font-omori btn-interactive" asChild>
                    <Link href={selectedItem.link}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Project
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
