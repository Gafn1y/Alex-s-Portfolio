import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/custom-cursor"
import FloatingPlanets from "@/components/floating-planets"

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
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FloatingPlanets />
          {children}
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  )
}
