import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  BookOpen,
  Briefcase,
  User,
  ChevronRight,
  Download,
  Phone,
  Star,
  Coffee,
  Gamepad2,
} from "lucide-react"
import Link from "next/link"
import ScrollReveal from "@/components/scroll-reveal"
import Planet from "@/components/planet"
import EducationTimeline from "@/components/education-timeline"
import PlanetMiniGame from "@/components/planet-mini-game"
import Header from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-darkPurple-950 text-foreground font-omori dark:dark-gradient light:light-gradient theme-transition">
      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-darkPurple-950 to-darkPurple-900 opacity-80 dark:opacity-80 light:opacity-40 theme-transition"></div>
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
        <div className="absolute inset-0 bg-noise"></div>
      </div>

      <Header />

      <main className="flex-1 relative z-1">
        {/* Hero Section */}
        <section className="py-10 md:py-16 lg:py-24 container px-4 sm:px-6 relative">
          <div className="absolute top-20 right-10 animate-float-slow">
            <Star className="h-6 w-6 text-yellow-300 icon-interactive" />
          </div>
          <div className="absolute bottom-20 left-10 animate-float">
            <Star className="h-4 w-4 text-teal-400 icon-interactive" />
          </div>

          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="mb-6 md:mb-10 relative">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 mx-auto bg-purple-900 border-4 border-dashed border-teal-400 rounded-full flex items-center justify-center relative pixel-shift-hover">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-darkPurple-800 rounded-full flex items-center justify-center">
                    <span className="text-3xl md:text-6xl font-omori text-teal-400 text-glitch-hover">A</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-300 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-6 sm:h-6 bg-pink-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="omori-dialogue mb-6 md:mb-8 p-4 sm:p-6 border-2 border-purple-400 relative bg-darkPurple-900/80 omori-dialogue-interactive">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-omori tracking-tight mb-3 md:mb-5 text-glitch-hover">
                  Hi, I'm <span className="text-teal-400">ALEXEY</span>
                  <div className="inline-block ml-2 md:ml-4">
                    <Planet type="teal" size="small" hasRing={true} />
                  </div>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-purple-200 mb-4 md:mb-6">
                  Software Engineer and Developer based in Kazakhstan with experience in Python, C++, and JavaScript.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                <Button
                  className="bg-teal-500 hover:bg-teal-600 text-purple-950 font-omori btn-interactive text-sm sm:text-base"
                  size="default"
                  asChild
                >
                  <Link href="#projects">
                    VIEW MY WORK <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-400 hover:bg-purple-800/30 text-purple-200 font-omori btn-interactive text-sm sm:text-base"
                  size="default"
                  asChild
                >
                  <Link href="#about">ABOUT ME</Link>
                </Button>
              </div>
              <div className="flex justify-center gap-4 mt-6 md:mt-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-400/50 hover:bg-purple-800/30 text-purple-200 icon-interactive"
                  asChild
                >
                  <Link href="https://github.com/Gafn1y" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-400/50 hover:bg-purple-800/30 text-purple-200 icon-interactive"
                  asChild
                >
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-400/50 hover:bg-purple-800/30 text-purple-200 icon-interactive"
                  asChild
                >
                  <Link href="mailto:alexey.sukovatitsyn@gmail.com">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-purple-400/50 hover:bg-purple-800/30 text-purple-200 icon-interactive"
                  asChild
                >
                  <Link href="tel:+7015068034">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Phone</span>
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-16 bg-darkPurple-900/20 theme-transition">
          <div className="container px-4 sm:px-6">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <div className="omori-dialogue p-4 sm:p-6 border-2 border-purple-400 relative bg-darkPurple-900/80 omori-dialogue-interactive">
                  <h2 className="text-2xl md:text-3xl font-omori mb-4 md:mb-6 flex items-center gap-2 text-teal-400 text-glitch-hover">
                    <User className="h-5 w-5 md:h-6 md:w-6 icon-interactive" />
                    ABOUT ME
                  </h2>
                  <p className="text-base md:text-lg text-purple-200 mb-4">
                    I'm an enthusiastic student developer fascinated by web development, mobile app creation, and the
                    potential of artificial intelligence. My programming journey began at age 10, sparking a passion
                    that continues to drive me forward.
                  </p>

                  <p className="text-base md:text-lg text-purple-200 mb-6">
                    As I embark on my Computer Science studies at university, I'm eager to deepen my technical knowledge
                    and collaborate with fellow innovators. I thrive on tackling complex challenges and crafting
                    elegant, impactful solutions that make a difference.
                  </p>
                  <div className="flex justify-center sm:justify-start">
                    <Button
                      className="bg-teal-500 hover:bg-teal-600 text-purple-950 font-omori btn-interactive"
                      asChild
                    >
                      <Link href="/resume.pdf" download>
                        <Download className="mr-2 h-4 w-4" />
                        DOWNLOAD RESUME
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 md:py-16 container px-4 sm:px-6 relative">
          <ScrollReveal>
            <h2 className="text-xl md:text-3xl font-omori mb-6 md:mb-10 text-center flex items-center justify-center gap-2 text-teal-400 text-glitch-hover">
              <Code className="h-5 w-5 md:h-6 md:w-6 icon-interactive" />
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <ScrollReveal delay={200}>
                <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card card-interactive">
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="font-omori text-teal-400 text-glitch-hover text-lg md:text-xl">
                      PYTHON
                    </CardTitle>
                    <CardDescription className="text-purple-200 text-sm md:text-base">
                      Backend development, data analysis, automation tools, and web frameworks for building robust
                      applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-teal-200 shake-hover text-xs">
                        Django
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-teal-200 shake-hover text-xs">
                        Flask
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-teal-200 shake-hover text-xs">
                        Pandas
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-teal-200 shake-hover text-xs">
                        NumPy
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-teal-200 shake-hover text-xs">
                        Automation
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card card-interactive">
                  <CardHeader>
                    <CardTitle className="font-omori text-pink-400 text-glitch-hover">C++</CardTitle>
                    <CardDescription className="text-purple-200">
                      System-level programming, performance optimization, and embedded systems development
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-pink-200 shake-hover">
                        Algorithms
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-pink-200 shake-hover">
                        Data Structures
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-pink-200 shake-hover">Arduino</Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-pink-200 shake-hover">
                        High-Performance
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-pink-200 shake-hover">
                        Robotics
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-pink-200 shake-hover">IoT</Badge>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={600}>
                <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card card-interactive">
                  <CardHeader>
                    <CardTitle className="font-omori text-yellow-300 text-glitch-hover">JAVASCRIPT</CardTitle>
                    <CardDescription className="text-purple-200">
                      Frontend development with modern frameworks, interactive UI creation, and responsive web
                      applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-yellow-200 shake-hover">React</Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-yellow-200 shake-hover">Vue</Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-yellow-200 shake-hover">
                        Web Development
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-yellow-200 shake-hover">UI/UX</Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-yellow-200 shake-hover">
                        API Integration
                      </Badge>
                      <Badge className="bg-darkPurple-800 hover:bg-purple-700 text-yellow-200 shake-hover">
                        Frontend
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-20 bg-darkPurple-900/20 relative">
          <div className="container px-4 sm:px-6">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-omori mb-8 md:mb-12 text-center flex items-center justify-center gap-2 text-teal-400 text-glitch-hover">
                <Briefcase className="h-5 w-5 md:h-6 md:w-6 icon-interactive" />
                MY PROJECTS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Project 1: TelDisBot */}
                <ScrollReveal delay={200}>
                  <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white overflow-hidden omori-card card-interactive">
                    <div className="aspect-video bg-darkPurple-800 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent"></div>
                      <div className="project-icon-container">
                        <Code className="h-12 w-12 text-teal-400 icon-interactive" />
                        <Mail className="h-8 w-8 text-teal-300 absolute top-4 right-4 icon-interactive" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-omori text-teal-400 text-glitch-hover">TELEGRAM-DISCORD BOT</CardTitle>
                      <CardDescription className="text-purple-200">
                        A connecting bridge between Discord and Telegram
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          Python
                        </Badge>
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          VSCode
                        </Badge>
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          Telegram
                        </Badge>
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          Discord
                        </Badge>
                      </div>
                      <p className="text-sm text-purple-200">
                        This bot is a connecting bridge between Discord and Telegram which helps to simplify the
                        forwarding of messages for commercial purposes.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-400/50 hover:bg-purple-800/50 font-omori text-teal-400 btn-interactive"
                        asChild
                      >
                        <Link href="https://github.com/Gafn1y/TelDisBot.git" target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          CODE
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-teal-500 hover:bg-teal-600 text-purple-950 font-omori btn-interactive"
                        asChild
                      >
                        <Link href="/projects/telegram-discord-bot">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          VIEW
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>

                {/* Project 2: meteoClock */}
                <ScrollReveal delay={400}>
                  <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white overflow-hidden omori-card card-interactive">
                    <div className="aspect-video bg-darkPurple-800 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent"></div>
                      <div className="project-icon-container">
                        <Code className="h-12 w-12 text-pink-400 icon-interactive" />
                        <Coffee className="h-8 w-8 text-pink-300 absolute top-4 right-4 icon-interactive" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-omori text-pink-400 text-glitch-hover">METEO CLOCK</CardTitle>
                      <CardDescription className="text-purple-200">
                        A smart meteorological station on Arduino
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          C++
                        </Badge>
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          Arduino
                        </Badge>
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          Weather API
                        </Badge>
                      </div>
                      <p className="text-sm text-purple-200">
                        A smart meteorological station built on Arduino, tracking CO2 emissions and weather data for
                        real-time environmental analysis.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-400/50 hover:bg-purple-800/50 font-omori text-pink-400 btn-interactive"
                        asChild
                      >
                        <Link href="https://github.com/Gafn1y/meteoClock" target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          CODE
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-pink-500 hover:bg-pink-600 text-purple-950 font-omori btn-interactive"
                        asChild
                      >
                        <Link href="/projects/meteo-clock">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          VIEW
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>

                {/* Project 3: Auto-Aiming-Fan */}
                <ScrollReveal delay={600}>
                  <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white overflow-hidden omori-card card-interactive">
                    <div className="aspect-video bg-darkPurple-800 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent"></div>
                      <div className="project-icon-container">
                        <Code className="h-12 w-12 text-yellow-300 icon-interactive" />
                        <Gamepad2 className="h-8 w-8 text-yellow-200 absolute top-4 right-4 icon-interactive" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="font-omori text-yellow-300 text-glitch-hover">AUTO-AIMING FAN</CardTitle>
                      <CardDescription className="text-purple-200">Arduino-based smart fan project</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          Arduino
                        </Badge>
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          C++
                        </Badge>
                        <Badge variant="outline" className="border-purple-400/50 text-purple-200 shake-hover">
                          Hardware
                        </Badge>
                      </div>
                      <p className="text-sm text-purple-200">
                        An Arduino-based project to make it easier to use a fan in hot weather, using an ultrasonic
                        sensor to improve airflow direction efficiency by 30%.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-400/50 hover:bg-purple-800/50 font-omori text-yellow-300 btn-interactive"
                        asChild
                      >
                        <Link
                          href="https://github.com/Gafn1y/Auto-Aiming-Fan.git"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          CODE
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        className="bg-yellow-400 hover:bg-yellow-500 text-purple-950 font-omori btn-interactive"
                        asChild
                      >
                        <Link href="/projects/auto-aiming-fan">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          VIEW
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              </div>
              <div className="text-center mt-8 md:mt-12">
                <Button
                  variant="outline"
                  className="border-purple-400/50 hover:bg-purple-800/30 font-omori text-teal-400 btn-interactive"
                  asChild
                >
                  <Link href="https://github.com/Gafn1y" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    VIEW MORE ON GITHUB
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16 md:py-20 container px-4 sm:px-6 relative">
          <div className="container px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-omori mb-8 md:mb-12 text-center flex items-center justify-center gap-2 text-teal-400">
              <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
              EDUCATION & EXPERIENCE
            </h2>

            <div className="max-w-3xl mx-auto">
              <EducationTimeline />
            </div>
          </div>
        </section>

        {/* Mini-Game Section */}
        <section id="game" className="py-16 md:py-20 bg-darkPurple-900/20 relative">
          <div className="container px-4 sm:px-6">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-omori mb-8 md:mb-12 text-center flex items-center justify-center gap-2 text-teal-400 text-glitch-hover">
                <Gamepad2 className="h-5 w-5 md:h-6 md:w-6 icon-interactive" />
                PLANET COLLECTOR MINI-GAME
              </h2>
              <div className="max-w-4xl mx-auto">
                <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card">
                  <CardHeader>
                    <CardTitle className="font-omori text-teal-400">PLANET COLLECTOR</CardTitle>
                    <CardDescription className="text-purple-200">
                      Click on the planets to collect them before time runs out! How many can you collect in 30 seconds?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <PlanetMiniGame />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 bg-darkPurple-900/20 relative">
          <div className="container px-4 sm:px-6">
            <h2 className="text-2xl md:text-3xl font-omori mb-8 md:mb-12 text-center flex items-center justify-center gap-2 text-teal-400">
              <Mail className="h-5 w-5 md:h-6 md:w-6" />
              GET IN TOUCH
            </h2>
            <div className="max-w-md mx-auto">
              <Card className="bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card">
                <CardHeader>
                  <CardTitle className="font-omori text-teal-400">CONTACT ME</CardTitle>
                  <CardDescription className="text-purple-200">
                    Feel free to reach out if you have any questions or would like to collaborate on a project.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-omori text-purple-200">
                        NAME
                      </label>
                      <input
                        id="name"
                        className="w-full p-2 border-2 border-purple-400 bg-purple-950 text-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-omori text-purple-200">
                        EMAIL
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border-2 border-purple-400 bg-purple-950 text-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-omori text-purple-200">
                        MESSAGE
                      </label>
                      <textarea
                        id="message"
                        className="w-full p-2 border-2 border-purple-400 bg-purple-950 text-white min-h-[120px]"
                        placeholder="Your message..."
                      />
                    </div>
                    <Button className="w-full bg-teal-500 hover:bg-teal-600 text-purple-950 font-omori">
                      SEND MESSAGE
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <div className="mt-8 text-center">
                <p className="text-purple-200 mb-4 flex items-center justify-center">Or connect with me directly:</p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-400/50 hover:bg-purple-800/30 text-purple-200"
                    asChild
                  >
                    <Link href="https://github.com/Gafn1y" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-400/50 hover:bg-purple-800/30 text-purple-200"
                    asChild
                  >
                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-400/50 hover:bg-purple-800/30 text-purple-200"
                    asChild
                  >
                    <Link href="mailto:alexey.sukovatitsyn@gmail.com">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-400/50 hover:bg-purple-800/30 text-purple-200"
                    asChild
                  >
                    <Link href="tel:+7015068034">
                      <Phone className="h-5 w-5" />
                      <span className="sr-only">Phone</span>
                    </Link>
                  </Button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-purple-200">
                  <p>
                    <span className="font-omori text-teal-400">EMAIL:</span>{" "}
                    <a href="mailto:alexey.sukovatitsyn@gmail.com" className="hover:underline">
                      alexey.sukovatitsyn@gmail.com
                    </a>
                  </p>
                  <p>
                    <span className="font-omori text-teal-400">PHONE:</span>{" "}
                    <a href="tel:+7015068034" className="hover:underline">
                      (701) 506-8034
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-purple-400/10 py-4 md:py-6 bg-darkPurple-950 theme-transition">
        <div className="container px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-purple-300">
            © {new Date().getFullYear()} Sukovatitsyn Alexey. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <Link href="#" className="text-xs md:text-sm text-purple-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs md:text-sm text-purple-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
