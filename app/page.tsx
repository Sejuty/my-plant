"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Clock, Droplets, RefreshCcw, X } from "lucide-react"
import { Search, Heart, Edit } from "lucide-react"
import { Filter, Menu, DoorClosedIcon as CloseIcon, Home } from "lucide-react"
import { Alice } from "next/font/google"

const alice = Alice({ subsets: ["latin"], weight: "400" })

type Houseplant = {
  name: string
  description: string
  careInstructions: string[]
  image: string
  lightRequirements: string
  waterRequirements: string
  difficulty: string
  benefits: string[]
}

type Feeling = {
  name: string
  description: string
  recommendedPlants: string[]
}

type WeatherCondition = {
  name: string
  description: string
  recommendedPlants: string[]
}

const houseplants: Houseplant[] = [
  {
    name: "Snake Plant",
    description:
      "Snake plants are known for their air-purifying properties and ability to thrive in low-light conditions, making them perfect for indoor spaces. They have striking, upright leaves that add a modern touch to any room.",
    careInstructions: [
      "Water sparingly, allowing soil to dry between waterings",
      "Thrives in indirect light but can tolerate low light",
      "Keep in a well-draining potting mix to prevent root rot",
      "Fertilize occasionally during the growing season",
    ],
    image:
      "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lightRequirements: "Low to bright indirect light",
    waterRequirements: "Water every 2-3 weeks",
    difficulty: "Easy",
    benefits: ["Purifies the air by removing toxins", "Releases oxygen at night", "Low maintenance and forgiving"],
  },
  {
    name: "Lavender",
    description:
      "Lavender is a calming herb known for its soothing scent and beautiful purple flowers. It thrives in sunny, dry conditions and is perfect for promoting relaxation and better sleep.",
    careInstructions: [
      "Place in full sun with at least 6 hours of sunlight daily",
      "Water sparingly, allowing soil to dry completely between waterings",
      "Prune regularly to maintain shape and encourage new growth",
      "Harvest flowers for use in teas, sachets, or potpourri",
    ],
    image:
      "https://images.unsplash.com/photo-1721415292968-00d546be01e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lightRequirements: "Full sun",
    waterRequirements: "Water every 1-2 weeks",
    difficulty: "Moderate",
    benefits: ["Promotes relaxation and reduces stress", "Improves sleep quality", "Natural insect repellent"],
  },
  {
    name: "Peace Lily",
    description:
      "The peace lily is a beautiful plant with elegant white flowers and glossy green leaves. It thrives in low-light conditions and is known for its air-purifying properties, making it a popular choice for homes and offices.",
    careInstructions: [
      "Water when the top inch of soil feels dry",
      "Prefers low to medium indirect light",
      "Keep in a well-draining potting mix",
      "Fertilize occasionally during the growing season",
      "Remove spent flowers to encourage new blooms",
    ],
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lightRequirements: "Low to medium indirect light",
    waterRequirements: "Water every 1-2 weeks",
    difficulty: "Easy to moderate",
    benefits: [
      "Purifies the air by removing toxins",
      "Produces beautiful white flowers",
      "Helps maintain humidity levels",
    ],
  },
  {
    name: "Mint",
    description:
      "Mint is a hardy, aromatic herb that thrives in moist, shaded areas. It is perfect for culinary use and adds a refreshing touch to drinks and dishes. Mint is also known for its digestive benefits and invigorating scent.",
    careInstructions: [
      "Prefers partial shade to full shade",
      "Keep soil consistently moist but not waterlogged",
      "Prune regularly to prevent overgrowth",
      "Harvest leaves as needed for cooking or drinks",
      "Consider container planting to control spread",
    ],
    image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=1974&auto=format&fit=crop",
    lightRequirements: "Partial to full shade",
    waterRequirements: "Keep soil consistently moist",
    difficulty: "Easy",
    benefits: [
      "Aids digestion and relieves nausea",
      "Freshens breath naturally",
      "Culinary uses in drinks, desserts, and dishes",
    ],
  },
  {
    name: "Aloe Vera",
    description:
      "Aloe vera is a succulent plant known for its soothing gel-filled leaves. It thrives in sunny, dry conditions and is perfect for skincare and natural remedies. Aloe vera is also low-maintenance and easy to care for.",
    careInstructions: [
      "Place in full sun to bright indirect light",
      "Water sparingly, allowing soil to dry completely between waterings",
      "Use a well-draining potting mix to prevent root rot",
      "Fertilize occasionally during the growing season",
      "Harvest leaves for use in skincare or remedies",
    ],
    image:
      "https://images.unsplash.com/photo-1569745358610-b01866003860?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lightRequirements: "Full sun to bright indirect light",
    waterRequirements: "Water every 2-3 weeks",
    difficulty: "Easy",
    benefits: [
      "Soothes sunburn and minor burns",
      "Hydrates and nourishes the skin",
      "Natural remedy for digestive issues",
    ],
  },
  {
    name: "Rosemary",
    description:
      "Rosemary is an aromatic herb with needle-like leaves and a pine-like fragrance. It thrives in sunny, dry conditions and is perfect for culinary use and memory enhancement. Rosemary is also known for its natural pest-repelling properties.",
    careInstructions: [
      "Place in full sun with at least 6 hours of sunlight daily",
      "Water sparingly, allowing soil to dry between waterings",
      "Prune regularly to maintain shape and encourage new growth",
      "Harvest leaves for use in cooking or as a natural remedy",
      "Protect from frost in colder climates",
    ],
    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?q=80&w=1974&auto=format&fit=crop",
    lightRequirements: "Full sun",
    waterRequirements: "Water every 1-2 weeks",
    difficulty: "Moderate",
    benefits: [
      "Improves memory and concentration",
      "Natural pest repellent",
      "Culinary uses in roasts, soups, and breads",
    ],
  },
  {
    name: "Jasmine",
    description:
      "Jasmine is a fragrant flowering plant known for its star-shaped blossoms and intoxicating scent. It thrives in warm, sunny conditions and is perfect for promoting relaxation and romance. Jasmine tea is also a popular natural remedy for stress and anxiety.",
    careInstructions: [
      "Place in full sun to bright indirect light",
      "Water regularly, keeping soil consistently moist",
      "Fertilize during the growing season for abundant blooms",
      "Prune after flowering to maintain shape and encourage new growth",
      "Protect from frost and extreme temperatures",
    ],
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=1974&auto=format&fit=crop",
    lightRequirements: "Full sun to bright indirect light",
    waterRequirements: "Keep soil consistently moist",
    difficulty: "Moderate",
    benefits: [
      "Promotes relaxation and reduces stress",
      "Enhances mood and feelings of romance",
      "Natural remedy for anxiety and insomnia",
    ],
  },
  {
    name: "Eucalyptus",
    description:
      "Eucalyptus is an aromatic plant known for its silvery-green leaves and refreshing scent. It thrives in sunny, well-drained conditions and is perfect for promoting respiratory health and clarity. Eucalyptus oil is also used in natural remedies for congestion and muscle pain.",
    careInstructions: [
      "Place in full sun with at least 6 hours of sunlight daily",
      "Water regularly but avoid waterlogging",
      "Prune regularly to maintain shape and encourage new growth",
      "Harvest leaves for use in steam inhalation or as a natural remedy",
      "Protect from frost in colder climates",
    ],
    image:
      "https://images.unsplash.com/photo-1517008607120-139741f5eeef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lightRequirements: "Full sun",
    waterRequirements: "Water every 1-2 weeks",
    difficulty: "Moderate",
    benefits: [
      "Promotes respiratory health and clarity",
      "Natural decongestant when used in steam inhalation",
      "Repels insects naturally",
    ],
  },
  {
    name: "Hibiscus",
    description:
      "Hibiscus is a tropical plant known for its large, colorful flowers and tangy herbal tea. It thrives in warm, sunny conditions and is perfect for promoting heart health and lowering blood pressure. Hibiscus tea is also rich in antioxidants and vitamin C.",
    careInstructions: [
      "Place in full sun with at least 6 hours of sunlight daily",
      "Water regularly, keeping soil consistently moist",
      "Fertilize during the growing season for abundant blooms",
      "Prune after flowering to maintain shape and encourage new growth",
      "Protect from frost and extreme temperatures",
    ],
    image: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?q=80&w=1974&auto=format&fit=crop",
    lightRequirements: "Full sun",
    waterRequirements: "Keep soil consistently moist",
    difficulty: "Moderate",
    benefits: [
      "Lowers blood pressure naturally",
      "Rich in antioxidants and vitamin C",
      "Promotes heart health and circulation",
    ],
  },
  {
    name: "Thyme",
    description:
      "Thyme is a low-growing, aromatic herb with tiny leaves and a subtle, earthy flavor. It thrives in sunny, dry conditions and is perfect for culinary use and natural remedies. Thyme is also known for its antibacterial properties and is used in homemade cleaning solutions.",
    careInstructions: [
      "Place in full sun with at least 6 hours of sunlight daily",
      "Water sparingly, allowing soil to dry between waterings",
      "Prune regularly to maintain shape and encourage new growth",
      "Harvest leaves for use in cooking or as a natural remedy",
      "Protect from frost in colder climates",
    ],
    image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?q=80&w=1974&auto=format&fit=crop",
    lightRequirements: "Full sun",
    waterRequirements: "Water every 1-2 weeks",
    difficulty: "Easy",
    benefits: [
      "Antibacterial properties for natural remedies",
      "Culinary uses in soups, stews, and roasted dishes",
      "Natural antiseptic for minor cuts and scrapes",
    ],
  },
  {
    name: "Orchid",
    description:
      "Orchids are exotic flowering plants known for their elegant, long-lasting blooms and graceful foliage. They thrive in bright, indirect light and are perfect for adding a touch of sophistication to any space. Orchids require careful watering and humidity to flourish.",
    careInstructions: [
      "Place in bright, indirect light away from direct sunlight",
      "Water once a week, allowing potting mix to dry slightly between waterings",
      "Use a well-draining orchid potting mix to prevent root rot",
      "Maintain humidity levels with a pebble tray or humidifier",
      "Fertilize with a balanced orchid fertilizer during the growing season",
    ],
    image: "https://images.unsplash.com/photo-1524598171353-ce84a157ed05?q=80&w=1974&auto=format&fit=crop",
    lightRequirements: "Bright, indirect light",
    waterRequirements: "Water once a week",
    difficulty: "Moderate to challenging",
    benefits: [
      "Long-lasting, elegant blooms add sophistication to any space",
      "Improves air quality and adds humidity to the environment",
      "Variety of colors and species to suit different preferences",
    ],
  },
  {
    name: "Fennel",
    description:
      "Fennel is an aromatic herb with feathery leaves and a mild, anise-like flavor. It thrives in sunny, well-drained conditions and is perfect for culinary use and natural remedies. Fennel is also known for its digestive benefits and is used in herbal teas and cooking.",
    careInstructions: [
      "Place in full sun with at least 6 hours of sunlight daily",
      "Water regularly, keeping soil consistently moist",
      "Fertilize during the growing season for healthy growth",
      "Prune regularly to maintain shape and encourage new growth",
      "Harvest leaves and seeds for use in cooking or as a natural remedy",
    ],
    image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=1974&auto=format&fit=crop",
    lightRequirements: "Full sun",
    waterRequirements: "Keep soil consistently moist",
    difficulty: "Easy",
    benefits: [
      "Aids digestion and relieves bloating",
      "Culinary uses in salads, soups, and roasted dishes",
      "Natural remedy for respiratory issues",
    ],
  },
]

const feelings: Feeling[] = [
  {
    name: "Stressed",
    description: "Feeling overwhelmed or anxious?",
    recommendedPlants: ["Lavender", "Peace Lily", "Jasmine"],
  },
  {
    name: "Tired",
    description: "Lacking energy or motivation?",
    recommendedPlants: ["Mint", "Rosemary", "Eucalyptus"],
  },
  {
    name: "Calm",
    description: "Feeling relaxed and at peace?",
    recommendedPlants: ["Snake Plant", "Aloe Vera", "Orchid"],
  },
  {
    name: "Romantic",
    description: "Feeling loving or sentimental?",
    recommendedPlants: ["Jasmine", "Hibiscus"],
  },
  {
    name: "Focused",
    description: "Needing concentration or mental clarity?",
    recommendedPlants: ["Rosemary", "Mint", "Thyme"],
  },
  {
    name: "Happy",
    description: "Feeling joyful or content?",
    recommendedPlants: ["Hibiscus", "Lavender", "Mint"],
  },
  {
    name: "Reflective",
    description: "Feeling contemplative or introspective?",
    recommendedPlants: ["Thyme", "Lavender", "Peace Lily"],
  },
  {
    name: "Energized",
    description: "Feeling vibrant or invigorated?",
    recommendedPlants: ["Mint", "Eucalyptus", "Fennel"],
  },
]

const weatherConditions: WeatherCondition[] = [
  {
    name: "Sunny",
    description: "Clear skies and plenty of sunlight",
    recommendedPlants: ["Lavender", "Rosemary", "Aloe Vera", "Thyme", "Hibiscus"],
  },
  {
    name: "Cloudy",
    description: "Overcast with little to no direct sunlight",
    recommendedPlants: ["Snake Plant", "Peace Lily", "Orchid"],
  },
  {
    name: "Rainy",
    description: "Wet weather with frequent showers",
    recommendedPlants: ["Mint", "Fennel", "Peace Lily"],
  },
  {
    name: "Windy",
    description: "Strong winds and possibly stormy weather",
    recommendedPlants: ["Rosemary", "Thyme", "Aloe Vera"],
  },
  {
    name: "Humid",
    description: "High humidity levels in the air",
    recommendedPlants: ["Orchid", "Peace Lily", "Jasmine"],
  },
  {
    name: "Dry",
    description: "Low humidity and arid conditions",
    recommendedPlants: ["Aloe Vera", "Snake Plant", "Lavender", "Rosemary"],
  },
]

// Note colors for different plant types
const noteColors = {
  Easy: "bg-green-100 border-green-300 text-green-800",
  Moderate: "bg-yellow-100 border-yellow-300 text-yellow-800",
  "Easy to moderate": "bg-green-100 border-green-300 text-green-800",
  "Moderate to challenging": "bg-orange-100 border-orange-300 text-orange-800",
}

export default function BotaniqApp() {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null)
  const [recommendedPlants, setRecommendedPlants] = useState<Houseplant[]>([])
  const [selectedPlant, setSelectedPlant] = useState<Houseplant | null>(null)
  const [showPlantModal, setShowPlantModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [timers, setTimers] = useState<{ [key: string]: number }>({})
  const [activeTimers, setActiveTimers] = useState<{ [key: string]: NodeJS.Timeout }>({})
  const [notes, setNotes] = useState<{ [key: string]: string }>({})
  const [currentNote, setCurrentNote] = useState("")
  const [editingNote, setEditingNote] = useState(false)
  const [filteredPlants, setFilteredPlants] = useState<Houseplant[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>("name-asc")
  const [showNotesByColor, setShowNotesByColor] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<string>("all")

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)
      if (isMobileView) {
        setSidebarOpen(false)
      }
    }

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Set initial filter based on hash
    const hash = window.location.hash.replace("#", "")
    if (hash === "favorites" || hash === "all") {
      setCurrentFilter(hash)
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "")
      if (newHash === "favorites" || newHash === "all") {
        setCurrentFilter(newHash)
      }
    }

    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("hashchange", handleHashChange)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (selectedFeeling && selectedWeather) {
      const feelingObj = feelings.find((f) => f.name === selectedFeeling)
      const weatherObj = weatherConditions.find((w) => w.name === selectedWeather)

      const feelingPlants = feelingObj ? feelingObj.recommendedPlants : []
      const weatherPlants = weatherObj ? weatherObj.recommendedPlants : []

      const commonPlants = feelingPlants.filter((plant) => weatherPlants.includes(plant))

      const plantsToShow = commonPlants.length > 0 ? commonPlants : [...feelingPlants, ...weatherPlants]

      const uniquePlants = Array.from(new Set(plantsToShow))

      const foundPlants = uniquePlants
        .map((plantName) => houseplants.find((hp) => hp.name === plantName))
        .filter((plant): plant is Houseplant => plant !== undefined)

      setRecommendedPlants(foundPlants)
    } else if (selectedFeeling || selectedWeather) {
      const plantsToShow = selectedFeeling
        ? feelings.find((f) => f.name === selectedFeeling)?.recommendedPlants || []
        : weatherConditions.find((w) => w.name === selectedWeather)?.recommendedPlants || []

      const foundPlants = plantsToShow
        .map((plantName) => houseplants.find((hp) => hp.name === plantName))
        .filter((plant): plant is Houseplant => plant !== undefined)

      setRecommendedPlants(foundPlants)
    } else {
      setRecommendedPlants([])
    }
  }, [selectedFeeling, selectedWeather])

  useEffect(() => {
    // Load favorites and notes from localStorage on component mount
    const savedFavorites = localStorage.getItem("botaniq-favorites")
    const savedNotes = localStorage.getItem("botaniq-notes")
    const savedTimers = localStorage.getItem("botaniq-timers")

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes))
    }

    if (savedTimers) {
      setTimers(JSON.parse(savedTimers))

      // Restart active timers
      const loadedTimers = JSON.parse(savedTimers)
      Object.entries(loadedTimers).forEach(([plantName, seconds]) => {
        if (typeof seconds === "number" && seconds > 0) {
          const interval = setInterval(() => {
            setTimers((prevTimers) => {
              const newTime = prevTimers[plantName] - 1

              if (newTime <= 0) {
                clearInterval(activeTimers[plantName])

                if (Notification.permission === "granted") {
                  new Notification(`Time to care for your ${plantName}!`, {
                    body: "Your plant needs attention now.",
                    icon: "/favicon.ico",
                  })
                }

                const newActiveTimers = { ...activeTimers }
                delete newActiveTimers[plantName]
                setActiveTimers(newActiveTimers)

                const newTimers = { ...prevTimers }
                delete newTimers[plantName]
                return newTimers
              }

              return { ...prevTimers, [plantName]: newTime }
            })
          }, 1000)

          setActiveTimers((prev) => ({ ...prev, [plantName]: interval }))
        }
      })
    }

    // Filter plants based on search query
    if (searchQuery) {
      const filtered = houseplants.filter(
        (plant) =>
          plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plant.benefits.some((benefit) => benefit.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setFilteredPlants(filtered)
    } else {
      setFilteredPlants([])
    }
  }, [searchQuery])

  useEffect(() => {
    localStorage.setItem("botaniq-timers", JSON.stringify(timers))
  }, [timers])

  useEffect(() => {
    return () => {
      // Clean up all active timers when component unmounts
      Object.values(activeTimers).forEach((timer) => clearInterval(timer))
    }
  }, [activeTimers])

  const handleFeelingSelect = (feeling: string) => {
    setSelectedFeeling(feeling === selectedFeeling ? null : feeling)
  }

  const handleWeatherSelect = (weather: string) => {
    setSelectedWeather(weather === selectedWeather ? null : weather)
  }

  const resetFilters = () => {
    setSelectedFeeling(null)
    setSelectedWeather(null)
    setSelectedDifficulties([])
    setSortOption("name-asc")
    setRecommendedPlants([])
  }

  const handlePlantSelect = (plant: Houseplant) => {
    setSelectedPlant(plant)
    setShowPlantModal(true)
  }

  const closeModal = () => {
    setShowPlantModal(false)
    setSelectedPlant(null)
    setEditingNote(false)
  }

  const toggleFavorite = (plantName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()

    const newFavorites = favorites.includes(plantName)
      ? favorites.filter((name) => name !== plantName)
      : [...favorites, plantName]

    setFavorites(newFavorites)
    localStorage.setItem("botaniq-favorites", JSON.stringify(newFavorites))
  }

  const saveNote = (plantName: string, note: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()

    const newNotes = { ...notes, [plantName]: note }
    setNotes(newNotes)
    localStorage.setItem("botaniq-notes", JSON.stringify(newNotes))
    setEditingNote(false)
  }

  const startTimer = (plantName: string, minutes: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()

    // Clear any existing timer for this plant
    if (activeTimers[plantName]) {
      clearInterval(activeTimers[plantName])
    }

    // Set the timer duration in seconds
    const durationInSeconds = minutes * 60
    setTimers({ ...timers, [plantName]: durationInSeconds })

    // Start the countdown
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const newTime = prevTimers[plantName] - 1

        // If timer reaches zero, clear the interval
        if (newTime <= 0) {
          clearInterval(activeTimers[plantName])

          // Show notification if supported
          if (Notification.permission === "granted") {
            new Notification(`Time to care for your ${plantName}!`, {
              body: "Your plant needs attention now.",
              icon: "/favicon.ico",
            })
          }

          // Remove this plant from active timers
          const newActiveTimers = { ...activeTimers }
          delete newActiveTimers[plantName]
          setActiveTimers(newActiveTimers)

          // Return timers without this plant
          const newTimers = { ...prevTimers }
          delete newTimers[plantName]
          return newTimers
        }

        // Return updated timers
        return { ...prevTimers, [plantName]: newTime }
      })
    }, 1000)

    // Store the interval ID
    setActiveTimers({ ...activeTimers, [plantName]: interval })

    // Request notification permission if needed
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission()
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${remainingSeconds}s`
  }

  const clearTimer = (plantName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()

    if (activeTimers[plantName]) {
      clearInterval(activeTimers[plantName])

      const newActiveTimers = { ...activeTimers }
      delete newActiveTimers[plantName]
      setActiveTimers(newActiveTimers)

      const newTimers = { ...timers }
      delete newTimers[plantName]
      setTimers(newTimers)
    }
  }

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty],
    )
  }

  const handleSortChange = (option: string) => {
    setSortOption(option)
  }

  const displayPlantsToShow = () => {
    let plantsToDisplay: Houseplant[] = []

    // Use currentFilter to determine filter
    if (currentFilter === "favorites") {
      plantsToDisplay = houseplants.filter((plant) => favorites.includes(plant.name))
    } else if (currentFilter === "all") {
      plantsToDisplay = houseplants
    } else if (searchQuery && filteredPlants.length > 0) {
      plantsToDisplay = filteredPlants
    } else if (searchQuery && filteredPlants.length === 0) {
      return []
    } else if (recommendedPlants.length > 0) {
      plantsToDisplay = recommendedPlants
    } else {
      plantsToDisplay = houseplants
    }

    // Apply difficulty filter if selected
    if (selectedDifficulties.length > 0) {
      plantsToDisplay = plantsToDisplay.filter((plant) => selectedDifficulties.includes(plant.difficulty))
    }

    // Apply sorting
    return sortPlants(plantsToDisplay, sortOption)
  }

  const sortPlants = (plants: Houseplant[], sortOption: string) => {
    const sortedPlants = [...plants]

    switch (sortOption) {
      case "name-asc":
        return sortedPlants.sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return sortedPlants.sort((a, b) => b.name.localeCompare(a.name))
      case "difficulty-asc":
        return sortedPlants.sort((a, b) => {
          const difficultyOrder = { Easy: 1, "Easy to moderate": 2, Moderate: 3, "Moderate to challenging": 4 }
          return (
            (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 99) -
            (difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 99)
          )
        })
      case "difficulty-desc":
        return sortedPlants.sort((a, b) => {
          const difficultyOrder = { Easy: 1, "Easy to moderate": 2, Moderate: 3, "Moderate to challenging": 4 }
          return (
            (difficultyOrder[b.difficulty as keyof typeof difficultyOrder] || 99) -
            (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] || 99)
          )
        })
      default:
        return sortedPlants
    }
  }

  const getPlantsWithNotes = () => {
    const plantsWithNotes: { [key: string]: Houseplant[] } = {
      Easy: [],
      Moderate: [],
      "Easy to moderate": [],
      "Moderate to challenging": [],
    }

    Object.keys(notes).forEach((plantName) => {
      const plant = houseplants.find((p) => p.name === plantName)
      if (plant) {
        if (plantsWithNotes[plant.difficulty]) {
          plantsWithNotes[plant.difficulty].push(plant)
        }
      }
    })

    return plantsWithNotes
  }

  useEffect(() => {
    if (showPlantModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showPlantModal])

  const handleFilterClick = (filter: string, e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentFilter(filter)
    window.location.hash = `#${filter}`
    setSearchQuery("")
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#EDF6F9] to-[#83C5BE]">
        <div className="w-16 h-16 border-4 border-[#83C5BE] rounded-full border-t-[#006D77] animate-spin"></div>
      </div>
    )
  }

  return (
    <div className={`${alice.className} min-h-screen bg-gradient-to-br from-[#EDF6F9] to-[#83C5BE]`}>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Title - Mobile */}
            <div className="flex items-center md:hidden">
              <button
                className="p-2 rounded-full bg-[#EDF6F9] text-[#006D77]"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </button>
            </div>

            {/* Logo and Title - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="p-2 rounded-full bg-[#83C5BE] text-[#006D77]">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-thin text-gray-900 tracking-wider">BotaniQ</div>
                <div className="text-xs text-gray-600 italic">Find your perfect plant match</div>
              </div>
            </div>

            {/* Search Bar - Desktop */}
  <div className="hidden md:block flex-1 max-w-md mx-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-[#83C5BE] rounded-xl bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#006D77] focus:border-transparent text-sm"
                  placeholder="Search plants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setSearchQuery("")}
                  >
                    <CloseIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>
            {/* Reminders Indicator - Desktop */}
            <div className="hidden md:flex items-center">
              {Object.keys(timers).length > 0 && (
                <div className="relative group">
                  <button className="flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-[#EDF6F9] text-[#006D77]">
                    <Clock className="w-4 h-4 mr-1" />
                    Reminders ({Object.keys(timers).length})
                  </button>
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-3 bg-[#EDF6F9] border-b border-[#83C5BE]">
                      <h3 className="text-sm font-medium text-[#006D77]">Active Reminders</h3>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {Object.entries(timers).map(([plantName, seconds]) => (
                        <div
                          key={plantName}
                          className="flex justify-between items-center p-3 hover:bg-gray-50 border-b border-gray-100"
                        >
                          <div>
                            <div className="font-medium text-sm">{plantName}</div>
                            <div className="text-xs text-gray-500">{formatTime(seconds)}</div>
                          </div>
                          <button
                            className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation()
                              clearTimer(plantName)
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#all"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-[#EDF6F9] text-[#006D77] ${currentFilter === "all" ? "bg-[#006D77]" : ""
                  }`}
                onClick={(e) => handleFilterClick("all", e)}
              >
                All Plants
              </a>
              <a
                href="#favorites"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-[#EDF6F9] flex items-center text-[#006D77] ${currentFilter === "favorites" ? "bg-[#006D77]" : ""
                  }`}
                onClick={(e) => handleFilterClick("favorites", e)}
              >
                <Heart className="w-4 h-4 mr-1" />
                Favorites ({favorites.length})
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-[#83C5BE] rounded-xl bg-white/90 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#006D77] focus:border-transparent text-sm"
              placeholder="Search plants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setSearchQuery("")}>
                <CloseIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="md:hidden flex items-center justify-between px-4 pb-3 border-t border-[#83C5BE] pt-3">
          <a
            href="#all"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentFilter === "all" ? "bg-[#006D77] text-white" : "bg-[#EDF6F9] text-[#006D77]"
              }`}
            onClick={(e) => handleFilterClick("all", e)}
          >
            All Plants
          </a>
          <a
            href="#favorites"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors  flex items-center ${currentFilter === "favorites" ? "bg-[#006D77] text-white" : "bg-[#EDF6F9] text-[#006D77]"
              }`}
            onClick={(e) => handleFilterClick("favorites", e)}
          >
            <Heart className="w-4 h-4 mr-1" />
            Favorites ({favorites.length})
          </a>
          {Object.keys(timers).length > 0 && (
            <a
              href="#"
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-[#EDF6F9] text-[#006D77] flex items-center"
              onClick={(e) => {
                e.preventDefault()
                // Show a simple alert with active reminders on mobile
                const reminderText = Object.entries(timers)
                  .map(([name, seconds]) => `${name}: ${formatTime(seconds)}`)
                  .join("\n")
                alert(`Active Reminders:\n${reminderText}`)
              }}
            >
              <Clock className="w-4 h-4 mr-1" />
              Reminders ({Object.keys(timers).length})
            </a>
          )}
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    fixed md:static top-0 left-0 z-40 h-screen w-64 md:w-72 pt-20 md:pt-4 pb-4 px-4 
    bg-[#EDF6F9]/95 backdrop-blur-sm shadow-lg md:shadow-none md:translate-x-0 
    transition-transform duration-300 ease-in-out overflow-y-auto`}
          style={{ height: "100vh", maxHeight: "100vh" }}
        >
          <div className="space-y-6 mt-14 md:mt-0 pb-20">
            {/* Sidebar Header */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#006D77] mb-2">Filters</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#006D77] to-[#83C5BE] rounded-full"></div>
            </div>

            {/* Feeling Filter */}
            <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-[#83C5BE]/20">
              <h3 className="text-lg font-medium mb-3 text-[#006D77] flex items-center">How are you feeling?</h3>
              <div className="grid grid-cols-2 gap-2">
                {feelings.map((feeling) => (
                  <button
                    key={feeling.name}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${selectedFeeling === feeling.name
                      ? "bg-[#006D77] text-white font-medium"
                      : "bg-white text-gray-700 hover:bg-[#EDF6F9] border border-[#83C5BE]/30"
                      }`}
                    onClick={() => handleFeelingSelect(feeling.name)}
                  >
                    {feeling.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Filter */}
            <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-[#83C5BE]/20">
              <h3 className="text-lg font-medium mb-3 text-[#006D77] flex items-center">Weather Conditions</h3>
              <div className="grid grid-cols-2 gap-2">
                {weatherConditions.map((weather) => (
                  <button
                    key={weather.name}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${selectedWeather === weather.name
                      ? "bg-[#006D77] text-white font-medium"
                      : "bg-white text-gray-700 hover:bg-[#EDF6F9] border border-[#83C5BE]/30"
                      }`}
                    onClick={() => handleWeatherSelect(weather.name)}
                  >
                    {weather.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-[#83C5BE]/20">
              <h3 className="text-lg font-medium mb-3 text-[#006D77] flex items-center">Difficulty Level</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-[#006D77] focus:ring-[#006D77]"
                    checked={selectedDifficulties.includes("Easy")}
                    onChange={() => toggleDifficulty("Easy")}
                  />
                  <span className="text-sm text-gray-700">Easy</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-[#006D77] focus:ring-[#006D77]"
                    checked={selectedDifficulties.includes("Easy to moderate")}
                    onChange={() => toggleDifficulty("Easy to moderate")}
                  />
                  <span className="text-sm text-gray-700">Easy to moderate</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-[#006D77] focus:ring-[#006D77]"
                    checked={selectedDifficulties.includes("Moderate")}
                    onChange={() => toggleDifficulty("Moderate")}
                  />
                  <span className="text-sm text-gray-700">Moderate</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded text-[#006D77] focus:ring-[#006D77]"
                    checked={selectedDifficulties.includes("Moderate to challenging")}
                    onChange={() => toggleDifficulty("Moderate to challenging")}
                  />
                  <span className="text-sm text-gray-700">Moderate to challenging</span>
                </label>
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-[#83C5BE]/20">
              <h3 className="text-lg font-medium mb-3 text-[#006D77] flex items-center">Sort By</h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    className="rounded text-[#006D77] focus:ring-[#006D77]"
                    checked={sortOption === "name-asc"}
                    onChange={() => handleSortChange("name-asc")}
                  />
                  <span className="text-sm text-gray-700">Name (A-Z)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    className="rounded text-[#006D77] focus:ring-[#006D77]"
                    checked={sortOption === "name-desc"}
                    onChange={() => handleSortChange("name-desc")}
                  />
                  <span className="text-sm text-gray-700">Name (Z-A)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    className="rounded text-[#006D77] focus:ring-[#006D77]"
                    checked={sortOption === "difficulty-asc"}
                    onChange={() => handleSortChange("difficulty-asc")}
                  />
                  <span className="text-sm text-gray-700">Difficulty (Easy to Hard)</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    className="rounded text-[#006D77] focus:ring-[#006D77]"
                    checked={sortOption === "difficulty-desc"}
                    onChange={() => handleSortChange("difficulty-desc")}
                  />
                  <span className="text-sm text-gray-700">Difficulty (Hard to Easy)</span>
                </label>
              </div>
            </div>

            {/* Active Timers */}
            {Object.keys(timers).length > 0 && (
              <div className="bg-white/80 rounded-xl shadow-sm p-5 border border-[#83C5BE]/20">
                <h3 className="text-lg font-medium mb-3 text-[#006D77] flex items-center">Active Reminders</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {Object.entries(timers).map(([plantName, seconds]) => (
                    <div key={plantName} className="flex justify-between items-center p-2 bg-[#EDF6F9] rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{plantName}</div>
                        <div className="text-xs text-gray-500">{formatTime(seconds)}</div>
                      </div>
                      <button
                        className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full"
                        onClick={() => clearTimer(plantName)}
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reset Filters Button */}
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-[#006D77] text-white rounded-lg hover:bg-[#006D77]/90 transition-colors flex items-center"
                onClick={resetFilters}
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Reset Filters
              </button>
            </div>

            {/* Mobile Only - Close Sidebar */}
            <div className="md:hidden flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-[#EDF6F9] text-[#E29578] rounded-lg hover:bg-[#EDF6F9]/80 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                Close Sidebar
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pt-4 md:pt-6">
          {/* Mobile Sidebar Toggle */}
          {!sidebarOpen && (
            <button
              className="md:hidden fixed bottom-4 left-4 z-30 p-3 rounded-full bg-[#006D77] text-white shadow-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Filter className="h-5 w-5" />
            </button>
          )}

          {/* Notes by Color Section */}
          {showNotesByColor && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Notes by Plant Difficulty</h2>
                <button
                  className="text-sm text-[#718355] hover:text-[#87986A]"
                  onClick={() => setShowNotesByColor(false)}
                >
                  Hide
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(getPlantsWithNotes()).map(
                  ([difficulty, plants]) =>
                    plants.length > 0 && (
                      <div
                        key={difficulty}
                        className={`p-4 rounded-xl border ${noteColors[difficulty as keyof typeof noteColors]}`}
                      >
                        <h3 className="font-bold mb-2">{difficulty}</h3>
                        <div className="space-y-2">
                          {plants.map((plant) => (
                            <div
                              key={plant.name}
                              className="p-2 bg-white/80 rounded-lg cursor-pointer hover:bg-white"
                              onClick={() => handlePlantSelect(plant)}
                            >
                              <div className="font-medium">{plant.name}</div>
                              <div className="text-xs text-gray-600 line-clamp-2">{notes[plant.name]}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Plants Grid */}
          {displayPlantsToShow().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative z-0">
              {displayPlantsToShow().map((plant) => (
                <div
                  key={plant.name}
                  className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group hover:shadow-xl cursor-pointer"
                  onClick={() => handlePlantSelect(plant)}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={plant.image || "/placeholder.svg"}
                      alt={plant.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Favorite Button */}
                    <button
                      className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200 z-10"
                      onClick={(e) => toggleFavorite(plant.name, e)}
                    >
                      {favorites.includes(plant.name) ? (
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                      )}
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-2xl font-bold text-gray-900">{plant.name}</div>
                      <div className="text-sm font-medium px-3 py-1 rounded-full bg-[#83C5BE] text-[#006D77]">
                        {plant.difficulty}
                      </div>
                    </div>

                    <div className="mb-4 text-gray-600 line-clamp-2">{plant.description}</div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-[#006D77]" />
                        <div className="text-sm text-gray-500">{plant.waterRequirements}</div>
                      </div>
                      <div className="flex items-center">
                        <Droplets className="h-5 w-5 mr-2 text-[#006D77]" />
                        <div className="text-sm text-gray-500">{plant.lightRequirements}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-1">
                      <div className="text-sm font-medium text-[#006D77] mr-2">Benefits:</div>
                      {plant.benefits.slice(0, 2).map((benefit, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center rounded-full bg-[#EDF6F9] px-2 py-1 text-xs font-medium text-[#006D77]"
                        >
                          {benefit}
                        </div>
                      ))}
                      {plant.benefits.length > 2 && (
                        <div className="inline-flex items-center rounded-full bg-[#EDF6F9] px-2 py-1 text-xs font-medium text-[#006D77]">
                          +{plant.benefits.length - 2} more
                        </div>
                      )}
                    </div>

                    {/* Timer Display */}
                    {timers[plant.name] ? (
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center text-xs text-[#006D77]">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{formatTime(timers[plant.name])}</span>
                        </div>
                        <button
                          className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full"
                          onClick={(e) => clearTimer(plant.name, e)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          className="text-xs px-2 py-1 bg-[#83C5BE] text-[#006D77] rounded-full"
                          onClick={(e) => startTimer(plant.name, 5, e)}
                        >
                          5m
                        </button>
                        <button
                          className="text-xs px-2 py-1 bg-[#83C5BE] text-[#006D77] rounded-full"
                          onClick={(e) => startTimer(plant.name, 30, e)}
                        >
                          30m
                        </button>
                        <button
                          className="text-xs px-2 py-1 bg-[#83C5BE] text-[#006D77] rounded-full"
                          onClick={(e) => startTimer(plant.name, 60, e)}
                        >
                          1h
                        </button>
                      </div>
                    )}

                    {/* Note Indicator */}
                    {notes[plant.name] && (
                      <div className="mt-1 flex items-center text-xs text-[#006D77]">
                        <Edit className="h-4 w-4 mr-1" />
                        <span>You have notes for this plant</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white/90 rounded-2xl shadow-lg max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🌱</div>
              <div className="text-xl font-medium text-gray-900 mb-3">No plants found</div>
              <div className="text-gray-600">
                {searchQuery
                  ? "Try a different search term"
                  : "Try adjusting your filters to find your perfect plant match"}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Plant Detail Modal */}
      {showPlantModal && selectedPlant && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white/90 rounded-2xl sm:rounded-3xl w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl shadow-2xl relative my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/30 rounded-full p-1.5 sm:p-2 hover:bg-white transition-colors duration-200"
              onClick={closeModal}
            >
              <X className="h-5 w-5 text-gray-600" />
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Image Container */}
              <div className="relative h-56 xs:h-64 sm:h-72 md:h-auto md:w-1/2">
                <img
                  src={selectedPlant.image || "/placeholder.svg"}
                  alt={selectedPlant.name}
                  className="w-full h-full object-cover rounded-t-2xl sm:rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-50 md:opacity-100 transition-opacity duration-300 rounded-bl-3xl"></div>

                {/* Mobile-only name overlay */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedPlant.name}</h2>
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-[#83C5BE] text-[#006D77] text-sm">
                    {selectedPlant.difficulty}
                  </div>
                </div>

                {/* Favorite Button */}
                <button
                  className="absolute top-2 left-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200 z-10"
                  onClick={(e) => toggleFavorite(selectedPlant.name, e)}
                >
                  {favorites.includes(selectedPlant.name) ? (
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  ) : (
                    <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                  )}
                </button>
              </div>

              {/* Content Container */}
              <div className="p-4 sm:p-6 md:p-8 md:w-1/2 overflow-y-auto max-h-[60vh] md:max-h-[70vh] lg:max-h-[600px]">
                {/* Desktop title - hidden on mobile */}
                <div className="hidden md:flex justify-between items-start mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{selectedPlant.name}</h2>
                  <div className="px-3 py-1 rounded-full bg-[#83C5BE] text-[#006D77]">{selectedPlant.difficulty}</div>
                </div>

                <div className="mb-4 sm:mb-6 text-gray-600 text-sm sm:text-base leading-relaxed">
                  {selectedPlant.description}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-[#006D77] mb-1 sm:mb-2">Light Requirements</div>
                    <div className="text-sm sm:text-base text-gray-600">{selectedPlant.lightRequirements}</div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-[#006D77] mb-1 sm:mb-2">Watering</div>
                    <div className="text-sm sm:text-base text-gray-600">{selectedPlant.waterRequirements}</div>
                  </div>
                </div>

                {/* Additional Plant Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-[#006D77] mb-1 sm:mb-2">Origin</div>
                    <div className="text-sm sm:text-base text-gray-600">
                      {selectedPlant.name === "Snake Plant" && "West Africa"}
                      {selectedPlant.name === "Lavender" && "Mediterranean"}
                      {selectedPlant.name === "Peace Lily" && "Tropical Americas"}
                      {selectedPlant.name === "Mint" && "Mediterranean/Europe"}
                      {selectedPlant.name === "Aloe Vera" && "Arabian Peninsula"}
                      {selectedPlant.name === "Rosemary" && "Mediterranean"}
                      {selectedPlant.name === "Jasmine" && "Tropical Asia"}
                      {selectedPlant.name === "Eucalyptus" && "Australia"}
                      {selectedPlant.name === "Hibiscus" && "Tropical regions"}
                      {selectedPlant.name === "Thyme" && "Mediterranean"}
                      {selectedPlant.name === "Orchid" && "Worldwide (tropical)"}
                      {selectedPlant.name === "Fennel" && "Mediterranean"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-[#006D77] mb-1 sm:mb-2">Toxicity</div>
                    <div className="text-sm sm:text-base text-gray-600">
                      {selectedPlant.name === "Snake Plant" && "Mildly toxic to pets"}
                      {selectedPlant.name === "Lavender" && "Non-toxic"}
                      {selectedPlant.name === "Peace Lily" && "Toxic to pets"}
                      {selectedPlant.name === "Mint" && "Non-toxic"}
                      {selectedPlant.name === "Aloe Vera" && "Toxic to pets if ingested"}
                      {selectedPlant.name === "Rosemary" && "Non-toxic"}
                      {selectedPlant.name === "Jasmine" && "Non-toxic (true jasmine)"}
                      {selectedPlant.name === "Eucalyptus" && "Toxic to pets"}
                      {selectedPlant.name === "Hibiscus" && "Non-toxic"}
                      {selectedPlant.name === "Thyme" && "Non-toxic"}
                      {selectedPlant.name === "Orchid" && "Non-toxic"}
                      {selectedPlant.name === "Fennel" && "Non-toxic"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-[#006D77] mb-1 sm:mb-2">Growth Rate</div>
                    <div className="text-sm sm:text-base text-gray-600">
                      {selectedPlant.name === "Snake Plant" && "Slow"}
                      {selectedPlant.name === "Lavender" && "Moderate"}
                      {selectedPlant.name === "Peace Lily" && "Moderate"}
                      {selectedPlant.name === "Mint" && "Fast"}
                      {selectedPlant.name === "Aloe Vera" && "Slow to moderate"}
                      {selectedPlant.name === "Rosemary" && "Moderate"}
                      {selectedPlant.name === "Jasmine" && "Fast (in season)"}
                      {selectedPlant.name === "Eucalyptus" && "Fast"}
                      {selectedPlant.name === "Hibiscus" && "Fast (in season)"}
                      {selectedPlant.name === "Thyme" && "Moderate"}
                      {selectedPlant.name === "Orchid" && "Slow"}
                      {selectedPlant.name === "Fennel" && "Fast"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-[#006D77] mb-1 sm:mb-2">Mature Size</div>
                    <div className="text-sm sm:text-base text-gray-600">
                      {selectedPlant.name === "Snake Plant" && "1-4 feet tall"}
                      {selectedPlant.name === "Lavender" && "1-3 feet tall"}
                      {selectedPlant.name === "Peace Lily" && "1-3 feet tall"}
                      {selectedPlant.name === "Mint" && "1-2 feet tall"}
                      {selectedPlant.name === "Aloe Vera" && "1-2 feet tall"}
                      {selectedPlant.name === "Rosemary" && "2-6 feet tall"}
                      {selectedPlant.name === "Jasmine" && "10-15 feet (climbing)"}
                      {selectedPlant.name === "Eucalyptus" && "10-60 feet tall"}
                      {selectedPlant.name === "Hibiscus" && "3-8 feet tall"}
                      {selectedPlant.name === "Thyme" && "6-12 inches tall"}
                      {selectedPlant.name === "Orchid" && "1-3 feet tall"}
                      {selectedPlant.name === "Fennel" && "3-5 feet tall"}
                    </div>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <div className="text-xs sm:text-sm font-medium text-[#006D77] mb-2 sm:mb-3">Benefits</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedPlant.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center rounded-full bg-[#EDF6F9] px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-[#006D77]"
                      >
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <div className="text-xs sm:text-sm font-medium text-[#006D77] mb-2 sm:mb-3">Care Instructions</div>
                  <ol className="space-y-1.5 sm:space-y-2">
                    {selectedPlant.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#83C5BE] flex items-center justify-center mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 sm:h-4 sm:w-4 text-[#006D77]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="text-sm sm:text-base text-gray-600 ml-2 sm:ml-3">{instruction}</div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Care Timer */}
                <div className="mb-6 sm:mb-8 p-4 bg-[#EDF6F9] rounded-xl">
                  <div className="text-xs sm:text-sm font-medium text-[#E29578] mb-2 sm:mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Care Timer
                  </div>

                  {timers[selectedPlant.name] ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="text-sm text-gray-600">
                        Time remaining: {formatTime(timers[selectedPlant.name])}
                      </div>
                      <button
                        className="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        onClick={(e) => clearTimer(selectedPlant.name, e)}
                      >
                        Cancel Timer
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="px-3 py-1.5 text-sm bg-[#83C5BE] text-[#006D77] rounded-lg hover:bg-[#83C5BE]/80 transition-colors"
                        onClick={(e) => startTimer(selectedPlant.name, 5, e)}
                      >
                        5 Minutes
                      </button>
                      <button
                        className="px-3 py-1.5 text-sm bg-[#83C5BE] text-[#006D77] rounded-lg hover:bg-[#83C5BE]/80 transition-colors"
                        onClick={(e) => startTimer(selectedPlant.name, 30, e)}
                      >
                        30 Minutes
                      </button>
                      <button
                        className="px-3 py-1.5 text-sm bg-[#83C5BE] text-[#006D77] rounded-lg hover:bg-[#83C5BE]/80 transition-colors"
                        onClick={(e) => startTimer(selectedPlant.name, 60, e)}
                      >
                        1 Hour
                      </button>
                      <button
                        className="px-3 py-1.5 text-sm bg-[#83C5BE] text-[#006D77] rounded-lg hover:bg-[#83C5BE]/80 transition-colors"
                        onClick={(e) => startTimer(selectedPlant.name, 60 * 24, e)}
                      >
                        24 Hours
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
