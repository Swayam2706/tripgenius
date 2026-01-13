import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateTravelPlan } from '../../service/AiModal'

export const useTripGeneration = (user, isAuthenticated) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateTrip = async (formData, onAuthRequired) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      onAuthRequired()
      return
    }

    // Validate form data
    if (!formData.location || !formData.noofDays || !formData.budget || !formData.traveler) {
      alert('Please fill in all fields before generating your trip!')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Generate travel plan using AI
      const result = await generateTravelPlan(formData)
      
      // Prepare trip data
      const tripPayload = {
        destination: formData.location?.label || formData.location,
        duration: parseInt(formData.noofDays),
        budget: formData.budget,
        travelers: formData.traveler,
        userId: user?.id || user?.sub || Date.now().toString(),
        userEmail: user?.email || 'unknown@example.com',
        aiResponse: result.data,
        formData
      }
      
      // Save to MongoDB
      const response = await fetch('http://localhost:5000/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripPayload)
      })

      if (response.ok) {
        const savedTrip = await response.json()
        navigate(`/view-trip/${savedTrip._id || savedTrip.id}`)
      } else {
        const errorData = await response.text()
        throw new Error(`Failed to save trip: ${response.statusText}`)
      }
      
    } catch (err) {
      console.error('Error generating trip:', err)
      setError(err.message)
      alert(`Error generating your trip: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return { generateTrip, loading, error }
}
