import { useState, useEffect } from 'react'

export const useTripData = (tripId) => {
  const [trip, setTrip] = useState(null)
  const [tripData, setTripData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to fetch from API first
        const response = await fetch(`http://localhost:5000/api/trips/${tripId}`)
        
        if (response.ok) {
          const data = await response.json()
          setTrip(data)
          setTripData(data.aiResponse)
        } else {
          // Fallback to localStorage
          const tripData = localStorage.getItem('currentTrip')
          if (tripData) {
            const parsedTrip = JSON.parse(tripData)
            setTrip(parsedTrip)
            setTripData(parsedTrip.aiResponse)
          } else {
            setError('Trip not found')
          }
        }
      } catch (error) {
        console.error('Error fetching trip:', error)
        setError('Failed to fetch trip data')
        
        // Fallback to localStorage
        const tripData = localStorage.getItem('currentTrip')
        if (tripData) {
          const parsedTrip = JSON.parse(tripData)
          setTrip(parsedTrip)
          setTripData(parsedTrip.aiResponse)
          setError(null) // Clear error if fallback works
        }
      } finally {
        setLoading(false)
      }
    }

    if (tripId) {
      fetchTrip()
    }
  }, [tripId])

  // Handle both JSON and string responses
  const parsedData = tripData ? (typeof tripData === 'string' ? JSON.parse(tripData) : tripData) : null

  return {
    trip,
    parsedData,
    loading,
    error
  }
}
