'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Sun, Cloud, MapPin, ThermometerSun } from 'lucide-react'

interface Location {
  name: string
  country: string
  forecast: {
    temp: number
    condition: string
    date: string
  }[]
  isSunny: boolean
}

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchSunnyLocations = async () => {
      setIsLoading(true)

      setTimeout(() => {
        const mockData: Location[] = [
          {
            name: 'Miami',
            country: 'USA',
            forecast: [
              { temp: 82, condition: 'Sunny', date: 'Saturday' },
              { temp: 84, condition: 'Sunny', date: 'Sunday' },
            ],
            isSunny: true,
          },
          {
            name: 'San Diego',
            country: 'USA',
            forecast: [
              { temp: 75, condition: 'Sunny', date: 'Saturday' },
              { temp: 73, condition: 'Mostly Sunny', date: 'Sunday' },
            ],
            isSunny: true,
          },
          {
            name: 'Cancun',
            country: 'Mexico',
            forecast: [
              { temp: 85, condition: 'Sunny', date: 'Saturday' },
              { temp: 86, condition: 'Sunny', date: 'Sunday' },
            ],
            isSunny: true,
          },
          {
            name: 'Barcelona',
            country: 'Spain',
            forecast: [
              { temp: 76, condition: 'Sunny', date: 'Saturday' },
              { temp: 78, condition: 'Sunny', date: 'Sunday' },
            ],
            isSunny: true,
          },
          {
            name: 'Honolulu',
            country: 'USA',
            forecast: [
              { temp: 81, condition: 'Partly Cloudy', date: 'Saturday' },
              { temp: 82, condition: 'Sunny', date: 'Sunday' },
            ],
            isSunny: true,
          },
          {
            name: 'Sydney',
            country: 'Australia',
            forecast: [
              { temp: 77, condition: 'Sunny', date: 'Saturday' },
              { temp: 79, condition: 'Sunny', date: 'Sunday' },
            ],
            isSunny: true,
          },
        ]

        setLocations(mockData)
        setIsLoading(false)
      }, 1500)
    }

    fetchSunnyLocations().catch(console.error)
  }, [])

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(filter.toLowerCase()) ||
      location.country.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-coral-600 mb-4 p-4 flex items-center justify-center">
            <Sun className="mr-3 h-12 w-12" />
            It&apos;s Always Sunny
          </h1>
          <p className="text-green-700 text-lg md:text-xl">
            Find places where it&apos;s warm and sunny this weekend (70°F+)
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Filter locations..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/90 border-green-200 focus:border-coral-400 focus:ring-coral-200"
          />
          <Button
            onClick={handleRefresh}
            className="bg-coral-400 hover:bg-coral-500 text-white"
          >
            Refresh Forecast
          </Button>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card
                key={item}
                className="overflow-hidden p-2 bg-white/60 shadow-md"
              >
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-3 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-24 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {filteredLocations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredLocations.map((location) => (
                  <Card
                    key={location.name}
                    className="overflow-hidden bg-white/90 hover:shadow-lg transition-shadow duration-300 p-1 border-green-100"
                  >
                    <CardHeader className="bg-gradient-to-r from-coral-300 to-coral-400 text-white pb-3">
                      <CardTitle className="flex items-center text-2xl oklch(0.279 0.041 260.031)">
                        <MapPin className="mr-2 h-5 w-5" /> {location.name}
                      </CardTitle>
                      <CardDescription className="text-white/90 font-medium">
                        {location.country}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 px-6">
                      <div className="space-y-6">
                        {location.forecast.map((day, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="font-medium text-green-800">
                              {day.date}:
                            </div>
                            <div className="flex items-center">
                              <ThermometerSun className="mr-2 h-5 w-5 text-coral-500" />
                              <span className="font-bold text-coral-600">
                                {day.temp}°F
                              </span>
                            </div>
                            <div className="flex items-center">
                              {day.condition.includes('Sunny') ? (
                                <Sun className="mr-1 h-5 w-5 text-coral-400" />
                              ) : (
                                <Cloud className="mr-1 h-5 w-5 text-green-400" />
                              )}
                              <span className="text-green-700">
                                {day.condition}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="bg-green-50 border-t border-green-100 p-4">
                      <p className="text-sm text-green-600 italic">
                        Perfect weekend getaway destination!
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-10 text-center bg-white/90">
                <h3 className="text-xl font-medium mb-2 text-coral-600">
                  No locations found
                </h3>
                <p className="text-green-700">
                  Try adjusting your filter or check back later for more sunny
                  destinations.
                </p>
              </Card>
            )}
          </>
        )}
      </div>
    </main>
  )
}
