import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export const useTripHistory = () => {
  const { user, isAuthenticated } = useAuth()
  const [tripHistory, setTripHistory] = useState([])
  const [loading, setLoading] = useState(true)

  // Load trip history from localStorage when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadTripHistory()
    } else {
      setTripHistory([])
      setLoading(false)
    }
  }, [user, isAuthenticated])

  const loadTripHistory = () => {
    setLoading(true)
    try {
      // Get trip history from localStorage for current user
      const storageKey = `tripHistory_${user?.email || user?.id}`
      const stored = localStorage.getItem(storageKey)
      const trips = stored ? JSON.parse(stored) : []
      setTripHistory(trips.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)))
    } catch (error) {
      console.error('Error loading trip history:', error)
      setTripHistory([])
    } finally {
      setLoading(false)
    }
  }

  const addTripToHistory = (tripData) => {
    if (!isAuthenticated || !user) return false

    try {
      const storageKey = `tripHistory_${user?.email || user?.id}`
      const newTrip = {
        id: Date.now().toString(),
        ...tripData,
        createdAt: new Date().toISOString(),
        userId: user?.email || user?.id
      }

      const updatedTrips = [...tripHistory, newTrip]
      localStorage.setItem(storageKey, JSON.stringify(updatedTrips))
      setTripHistory(updatedTrips.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)))
      return true
    } catch (error) {
      console.error('Error adding trip to history:', error)
      return false
    }
  }

  const removeTripFromHistory = (tripId) => {
    if (!isAuthenticated || !user) return false

    try {
      const storageKey = `tripHistory_${user?.email || user?.id}`
      const updatedTrips = tripHistory.filter(trip => trip.id !== tripId)
      localStorage.setItem(storageKey, JSON.stringify(updatedTrips))
      setTripHistory(updatedTrips)
      return true
    } catch (error) {
      console.error('Error removing trip from history:', error)
      return false
    }
  }

  const updateTripStatus = (tripId, status) => {
    if (!isAuthenticated || !user) return false

    try {
      const storageKey = `tripHistory_${user?.email || user?.id}`
      const updatedTrips = tripHistory.map(trip =>
        trip.id === tripId 
          ? { ...trip, status, updatedAt: new Date().toISOString() }
          : trip
      )
      localStorage.setItem(storageKey, JSON.stringify(updatedTrips))
      setTripHistory(updatedTrips)
      return true
    } catch (error) {
      console.error('Error updating trip status:', error)
      return false
    }
  }

  const searchTrips = (searchTerm) => {
    if (!searchTerm.trim()) return tripHistory
    
    return tripHistory.filter(trip =>
      trip.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filterByStatus = (status) => {
    if (status === 'all') return tripHistory
    return tripHistory.filter(trip => trip.status === status)
  }

  const getStats = () => {
    const completed = tripHistory.filter(trip => trip.status === 'completed').length
    const upcoming = tripHistory.filter(trip => trip.status === 'upcoming').length
    const cancelled = tripHistory.filter(trip => trip.status === 'cancelled').length
    
    const countries = [...new Set(tripHistory.map(trip => trip.country).filter(Boolean))]
    const cities = [...new Set(tripHistory.map(trip => trip.city).filter(Boolean))]

    return {
      totalTrips: tripHistory.length,
      completed,
      upcoming,
      cancelled,
      countriesVisited: countries.length,
      citiesVisited: cities.length,
      recentTrips: tripHistory.slice(0, 3)
    }
  }

  return {
    tripHistory,
    loading,
    addTripToHistory,
    removeTripFromHistory,
    updateTripStatus,
    searchTrips,
    filterByStatus,
    getStats,
    refreshTrips: loadTripHistory
  }
}
