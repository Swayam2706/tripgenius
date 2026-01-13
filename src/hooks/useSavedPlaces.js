import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export const useSavedPlaces = () => {
  const { user, isAuthenticated } = useAuth()
  const [savedPlaces, setSavedPlaces] = useState([])
  const [loading, setLoading] = useState(true)

  // Load saved places from localStorage when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      loadSavedPlaces()
    } else {
      setSavedPlaces([])
      setLoading(false)
    }
  }, [user, isAuthenticated])

  const loadSavedPlaces = () => {
    setLoading(true)
    try {
      // Get saved places from localStorage for current user
      const storageKey = `savedPlaces_${user?.email || user?.id}`
      const stored = localStorage.getItem(storageKey)
      const places = stored ? JSON.parse(stored) : []
      setSavedPlaces(places)
    } catch (error) {
      console.error('Error loading saved places:', error)
      setSavedPlaces([])
    } finally {
      setLoading(false)
    }
  }

  const savePlace = (placeData) => {
    if (!isAuthenticated || !user) return false

    try {
      const storageKey = `savedPlaces_${user?.email || user?.id}`
      const newPlace = {
        id: Date.now().toString(),
        ...placeData,
        savedDate: new Date().toISOString().split('T')[0],
        userId: user?.email || user?.id
      }

      const updatedPlaces = [...savedPlaces, newPlace]
      localStorage.setItem(storageKey, JSON.stringify(updatedPlaces))
      setSavedPlaces(updatedPlaces)
      return true
    } catch (error) {
      console.error('Error saving place:', error)
      return false
    }
  }

  const removeSavedPlace = (placeId) => {
    if (!isAuthenticated || !user) return false

    try {
      const storageKey = `savedPlaces_${user?.email || user?.id}`
      const updatedPlaces = savedPlaces.filter(place => place.id !== placeId)
      localStorage.setItem(storageKey, JSON.stringify(updatedPlaces))
      setSavedPlaces(updatedPlaces)
      return true
    } catch (error) {
      console.error('Error removing saved place:', error)
      return false
    }
  }

  const toggleFavorite = (placeId) => {
    if (!isAuthenticated || !user) return false

    try {
      const storageKey = `savedPlaces_${user?.email || user?.id}`
      const updatedPlaces = savedPlaces.map(place =>
        place.id === placeId 
          ? { ...place, isFavorite: !place.isFavorite }
          : place
      )
      localStorage.setItem(storageKey, JSON.stringify(updatedPlaces))
      setSavedPlaces(updatedPlaces)
      return true
    } catch (error) {
      console.error('Error toggling favorite:', error)
      return false
    }
  }

  const searchPlaces = (searchTerm) => {
    if (!searchTerm.trim()) return savedPlaces
    
    return savedPlaces.filter(place =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filterByCategory = (category) => {
    if (category === 'all') return savedPlaces
    return savedPlaces.filter(place => place.category === category)
  }

  const getCategories = () => {
    const categories = [...new Set(savedPlaces.map(place => place.category).filter(Boolean))]
    return ['all', ...categories]
  }

  const getStats = () => {
    return {
      totalPlaces: savedPlaces.length,
      favoritePlaces: savedPlaces.filter(place => place.isFavorite).length,
      categories: getCategories().length - 1, // exclude 'all'
      recentlySaved: savedPlaces.slice(-3).reverse()
    }
  }

  return {
    savedPlaces,
    loading,
    savePlace,
    removeSavedPlace,
    toggleFavorite,
    searchPlaces,
    filterByCategory,
    getCategories,
    getStats,
    refreshPlaces: loadSavedPlaces
  }
}
