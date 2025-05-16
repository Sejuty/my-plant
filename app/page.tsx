"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, ChevronDown, X, Clock, Droplets } from "lucide-react"

import { ThemeProvider as NextThemesProvider, ThemeProviderProps, useTheme } from "next-themes";


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
    image: "https://images.unsplash.com/photo-1721415292968-00d546be01e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1569745358610-b01866003860?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1517008607120-139741f5eeef?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function MyComponentWithThemeProvider() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      <MyComponent />
    </ThemeProvider>
  );
}


function MyComponent() {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null)
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null)
  const [recommendedPlants, setRecommendedPlants] = useState<Houseplant[]>([])
  const [showDropdowns, setShowDropdowns] = useState(true)
  const [selectedPlant, setSelectedPlant] = useState<Houseplant | null>(null)
  const [showPlantModal, setShowPlantModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isOpenFeeling, setIsOpenFeeling] = useState(false)
  const [isOpenWeather, setIsOpenWeather] = useState(false)
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
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

  const handleFeelingSelect = (feeling: string) => {
    setSelectedFeeling(feeling)
    setIsOpenFeeling(false)
    if (isMobile) setShowDropdowns(false)
  }

  const handleWeatherSelect = (weather: string) => {
    setSelectedWeather(weather)
    setIsOpenWeather(false)
    if (isMobile) setShowDropdowns(false)
  }

  const resetFilters = () => {
    setSelectedFeeling(null)
    setSelectedWeather(null)
    setShowDropdowns(true)
    setRecommendedPlants([])
  }

  const handlePlantSelect = (plant: Houseplant) => {
    setSelectedPlant(plant)
    setShowPlantModal(true)
  }

  const closeModal = () => {
    setShowPlantModal(false)
    setSelectedPlant(null)
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showPlantModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPlantModal]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
        <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full border-t-indigo-600 dark:border-t-indigo-400 animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="mb-6 md:mb-0 py-6 xl:py-12">
            <div className="text-3xl md:text-5xl font-thin text-gray-900 dark:text-white mb-2">
              Houseplant Recommender
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              Find your perfect plant match based on how you feel and the weather
            </div>
          </div>
          <div
            onClick={toggleTheme}
            className="cursor-pointer p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-200 dark:border-indigo-800"
            aria-label="Toggle theme"
          >
            {resolvedTheme == 'dark' ? (
              <Moon className="h-5 w-5 text-indigo-700" />
            ) : (
              <Sun className="h-5 w-5 text-amber-400" />
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mb-12 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg z-50">
            {" "}
            {/* Add z-50 here */}
            <div className="relative w-full md:w-64">
              <div

                className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-indigo-200 dark:border-indigo-800 rounded-xl px-6 py-4 text-left text-gray-900 dark:text-white font-medium flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => setIsOpenFeeling(!isOpenFeeling)}
              >
                <div>{selectedFeeling ? selectedFeeling : `Select Feeling`}</div>
                <ChevronDown
                  className={`w-5 h-5 ml-2 transition-transform duration-300 ${isOpenFeeling ? "transform rotate-180" : ""}`}
                />
              </div>

              {isOpenFeeling && (
                <div className="absolute z-[100] mt-1 w-full bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 rounded-xl shadow-lg">
                  {" "}
                  {/* Increase to z-[100] */}
                  {feelings.map((feeling) => (
                    <div
                      key={feeling.name}

                      className="w-full text-gray-800 dark:text-gray-200 text-left px-6 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200 cursor-pointer border-b border-indigo-100 dark:border-indigo-800 last:border-0"
                      onClick={() => handleFeelingSelect(feeling.name)}
                    >
                      {feeling.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-4 h-4 bg-indigo-300 dark:bg-indigo-700 rounded-full hidden md:block"></div>
            <div className="relative w-full md:w-64">
              <div

                className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-indigo-200 dark:border-indigo-800 rounded-xl px-6 py-4 text-left text-gray-900 dark:text-white font-medium flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => setIsOpenWeather(!isOpenWeather)}
              >
                <div>{selectedWeather ? selectedWeather : `Select Weather`}</div>
                <ChevronDown
                  className={`w-5 h-5 ml-2 transition-transform duration-300 ${isOpenWeather ? "transform rotate-180" : ""}`}
                />
              </div>

              {isOpenWeather && (
                <div className="absolute z-[100] mt-1 w-full bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 rounded-xl shadow-lg">
                  {" "}
                  {/* Increase to z-[100] */}
                  {weatherConditions.map((weather) => (
                    <div
                      key={weather.name}
                      className="w-full text-gray-800 dark:text-gray-200 text-left px-6 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-200 cursor-pointer border-b border-indigo-100 dark:border-indigo-800 last:border-0"
                      onClick={() => handleWeatherSelect(weather.name)}
                    >
                      {weather.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {isMobile && showDropdowns && (
            <div className="flex gap-2 mb-4">
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedFeeling
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                onClick={() => setIsOpenFeeling(true)}
              >
                Feeling
              </div>
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedWeather
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                onClick={() => setIsOpenWeather(true)}
              >
                Weather
              </div>
            </div>
          )}

          {(selectedFeeling || selectedWeather) && (
            <div
              className="mb-6 flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 cursor-pointer"
              onClick={resetFilters}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 04.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset filters
            </div>
          )}

          {recommendedPlants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative z-0">
              {" "}
              {/* Change to z-0 */}
              {recommendedPlants.map((plant) => (
                <div
                  key={plant.name}
                  className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group hover:shadow-xl cursor-pointer"
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
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{plant.name}</div>
                      <div className="text-sm font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                        {plant.difficulty}
                      </div>
                    </div>

                    <div className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-2">{plant.description}</div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                        <div className="text-sm text-gray-500 dark:text-gray-400">{plant.waterRequirements}</div>
                      </div>
                      <div className="flex items-center">
                        <Droplets className="h-5 w-5 mr-2 text-indigo-500" />
                        <div className="text-sm text-gray-500 dark:text-gray-400">{plant.lightRequirements}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-1">
                      <div className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mr-2">Benefits:</div>
                      {plant.benefits.slice(0, 2).map((benefit, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/50 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300"
                        >
                          {benefit}
                        </div>
                      ))}
                      {plant.benefits.length > 2 && (
                        <div className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/50 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                          +{plant.benefits.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg max-w-2xl">
              <div className="text-6xl mb-6">🌱</div>
              <div className="text-xl font-medium text-gray-900 dark:text-white mb-3">No plants found</div>
              <div className="text-gray-600 dark:text-gray-300">
                Try adjusting your filters to find your perfect plant match
              </div>
            </div>
          )}
        </div>
      </div>

      {showPlantModal && selectedPlant && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white/90 dark:bg-gray-800/90 rounded-2xl sm:rounded-3xl w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl shadow-2xl relative my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-1.5 sm:p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={closeModal}
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-200" />
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
                  <div className="inline-block mt-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 text-sm">
                    {selectedPlant.difficulty}
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-4 sm:p-6 md:p-8 md:w-1/2 overflow-y-auto max-h-[60vh] md:max-h-[70vh] lg:max-h-[600px]">
                {/* Desktop title - hidden on mobile */}
                <div className="hidden md:flex justify-between items-start mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{selectedPlant.name}</h2>
                  <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                    {selectedPlant.difficulty}
                  </div>
                </div>

                <div className="mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                  {selectedPlant.description}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-1 sm:mb-2">
                      Light Requirements
                    </div>
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{selectedPlant.lightRequirements}</div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-1 sm:mb-2">
                      Watering
                    </div>
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{selectedPlant.waterRequirements}</div>
                  </div>
                </div>

                <div className="mb-6 sm:mb-8">
                  <div className="text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2 sm:mb-3">Benefits</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedPlant.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/50 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300"
                      >
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2 sm:mb-3">Care Instructions</div>
                  <ol className="space-y-1.5 sm:space-y-2">
                    {selectedPlant.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600 dark:text-indigo-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 ml-2 sm:ml-3">{instruction}</div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
