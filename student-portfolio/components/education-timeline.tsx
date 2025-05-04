"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Calendar, Award, Briefcase, Star } from "lucide-react"

interface TimelineItem {
  id: string
  title: string
  organization: string
  period: string
  description: string
  details: string[]
  color: "purple" | "teal" | "pink" | "yellow"
  icon: "calendar" | "award" | "briefcase" | "star"
}

const timelineItems: TimelineItem[] = [
  {
    id: "bilimkana",
    title: "BILIMKANA-ALMATY",
    organization: "High School, Kazakhstan, Almaty",
    period: "January 2019 - June 2027",
    description: "High School education with a GPA of 4.1, focusing on technical subjects and computer science.",
    details: [
      "Advanced mathematics and physics curriculum",
      "Computer science specialization",
      "Participated in national programming competitions",
      "Developed strong foundation in STEM subjects",
    ],
    color: "purple",
    icon: "calendar",
  },
  {
    id: "step",
    title: '"STEP" ACADEMY',
    organization: "Developer/Member",
    period: "December 2022 - Present",
    description: "Analyzed large datasets and built backend routes for web applications.",
    details: [
      "Analyzed large datasets (100K+ data points) using libraries such as Pandas & NumPy, optimizing data processing time by 10% in Jupyter Notebook & Google Colab.",
      "Implemented mathematical modeling with SageMath, solving complex equations and improving data-driven decision-making.",
      "Built backend routes for 3+ web applications using JavaScript, reducing API response time and improving functionality.",
      "Developed and deployed 5+ commercial Telegram and Discord bots using Python, automating marketing campaigns and improving engagement by 10%.",
    ],
    color: "teal",
    icon: "award",
  },
  {
    id: "robotechnics",
    title: "ROBOTOTECHNICS",
    organization: "Developer/Builder",
    period: "June 2020 - Present",
    description: "Developed various Arduino-based projects for environmental monitoring and automation.",
    details: [
      "Developed an auto-aiming fan using an ultrasonic sensor and Arduino, improving airflow direction efficiency in the workspace by 30%.",
      "Built a smart meteorological station on Arduino, tracking CO2 emissions and weather data for real-time environmental analysis.",
      "Engineered a robot bartender integrating intro level of computer vision and weight sensors, achieving gram-precise liquid measurement for automated drink preparation.",
    ],
    color: "pink",
    icon: "briefcase",
  },
  {
    id: "shelter",
    title: 'SHELTER "PET HELPERS"',
    organization: "Software Engineer",
    period: "August 2024 - Present",
    description: "Led full-stack development of a platform for animal shelters in Kazakhstan.",
    details: [
      "Led full-stack development of a platform for 20+ animal shelters in Kazakhstan, improving accessibility and awareness for pet adoption.",
      "Designed and implemented the front-end and back-end, ensuring a user-friendly and responsive interface.",
      "Integrated an animal catalog system, enabling users to browse and filter pets by breed, age, and location, enhancing adoption efficiency.",
    ],
    color: "yellow",
    icon: "star",
  },
]

export default function EducationTimeline() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const getIcon = (iconName: string, color: string) => {
    const colorClass = `text-${color}-400`

    switch (iconName) {
      case "calendar":
        return <Calendar className={`h-5 w-5 ${colorClass}`} />
      case "award":
        return <Award className={`h-5 w-5 ${colorClass}`} />
      case "briefcase":
        return <Briefcase className={`h-5 w-5 ${colorClass}`} />
      case "star":
        return <Star className={`h-5 w-5 ${colorClass}`} />
      default:
        return <Calendar className={`h-5 w-5 ${colorClass}`} />
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {timelineItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            className={`bg-darkPurple-900/80 border-2 border-purple-400 text-white omori-card cursor-pointer transition-all duration-300 ${
              expandedItem === item.id ? "transform scale-[1.02]" : ""
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <CardHeader className="flex flex-row items-center justify-between p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="hidden sm:block">{getIcon(item.icon, item.color)}</div>
                <div>
                  <CardTitle className={`font-omori text-${item.color}-400 text-sm md:text-base`}>
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-purple-300/90 text-xs md:text-sm">
                    {item.organization} | {item.period}
                  </CardDescription>
                </div>
              </div>
              <motion.div animate={{ rotate: expandedItem === item.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="h-4 w-4 md:h-5 md:w-5 text-purple-300/90" />
              </motion.div>
            </CardHeader>
            <CardContent className="px-4 pb-4 md:px-6 md:pb-6 pt-0">
              <p className="text-purple-200/90 text-xs md:text-sm">{item.description}</p>

              <AnimatePresence>
                {expandedItem === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 md:mt-4 overflow-hidden"
                  >
                    <ul className="space-y-1 md:space-y-2">
                      {item.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <span className={`text-${item.color}-400 mr-2 text-xs md:text-sm`}>•</span>
                          <span className="text-purple-200/90 text-xs md:text-sm">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
