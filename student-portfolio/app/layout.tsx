import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/custom-cursor"
import FloatingPlanets from "@/components/floating-planets"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata = {
  title: "Sukovatitsyn Alexey | Developer Portfolio",
  description: "Personal portfolio for Sukovatitsyn Alexey, a software engineer and developer from Kazakhstan",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          <div className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500">
            <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
          </div>
          <FloatingPlanets />
          {children}
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
