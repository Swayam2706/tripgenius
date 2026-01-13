import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import AuthDialog from '../components/auth/AuthDialog'
import { useTripGeneration } from './hooks/useTripGeneration'

// Components
import LoadingScreen from './components/LoadingScreen'
import FormHeader from './components/FormHeader'
import BackgroundElements from './components/BackgroundElements'
import LocationInput from './components/LocationInput'
import DurationInput from './components/DurationInput'
import BudgetSelector from './components/BudgetSelector'
import TravelerSelector from './components/TravelerSelector'
import GenerateButton from './components/GenerateButton'

function CreateTrip() {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({})
  const [openDialog, setOpenDialog] = useState(false)
  const { generateTrip, loading } = useTripGeneration(user, isAuthenticated)

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleGenerateTrip = () => {
    generateTrip(formData, () => setOpenDialog(true))
  }

  const handleAuthSuccess = () => {
    setOpenDialog(false)
    setTimeout(() => {
      handleGenerateTrip()
    }, 500)
  }

  if (authLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8f4f8] relative overflow-hidden">
      <BackgroundElements />
      
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <FormHeader />

        <LocationInput
          value={formData.location}
          onChange={(val) => handleInputChange("location", val)}
        />

        <DurationInput
          value={formData.noofDays}
          onChange={(val) => handleInputChange("noofDays", val)}
        />

        <BudgetSelector
          selected={formData.budget}
          onSelect={(value) => handleInputChange("budget", value)}
        />

        <TravelerSelector
          selected={formData.traveler}
          onSelect={(value) => handleInputChange("traveler", value)}
        />

        <GenerateButton
          loading={loading}
          onClick={handleGenerateTrip}
        />

        <AuthDialog 
          open={openDialog} 
          onOpenChange={setOpenDialog}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
    </div>
  )
}

export default CreateTrip
