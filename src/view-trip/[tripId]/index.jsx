import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Button from '@/components/ui/Button'

// Import components
import TripHeader from './components/TripHeader'
import TripNavigation from './components/TripNavigation'
import ShareModal from './components/ShareModal'

// Import tab components
import OverviewTab from './components/tabs/OverviewTab'
import ItineraryTab from './components/tabs/ItineraryTab'
import HotelsTab from './components/tabs/HotelsTab'
import FoodTab from './components/tabs/FoodTab'
import TravelTab from './components/tabs/TravelTab'

// Import custom hook
import { useTripData } from './hooks/useTripData'

function ViewTrip() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isLiked, setIsLiked] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  // Use custom hook for trip data
  const { trip, parsedData, loading, error } = useTripData(tripId)


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#2c3e50]">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#f39c12]/30 border-t-[#f39c12] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-[#f39c12]/50 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <div className="mt-6 text-xl font-semibold text-white">Crafting Your Perfect Journey...</div>
        <div className="mt-3 text-[#f39c12] font-medium">Personalizing every detail of your adventure</div>
        <div className="mt-8 flex gap-2">
          <div className="w-2 h-2 bg-[#f39c12] rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#f39c12] rounded-full animate-pulse animation-delay-200"></div>
          <div className="w-2 h-2 bg-[#f39c12] rounded-full animate-pulse animation-delay-400"></div>
        </div>
      </div>
    )
  }

  if (error || !trip || !parsedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#1a252f]">
        <div className="text-center">
          <div className="w-32 h-32 bg-[#f39c12]/20 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-[#f39c12]/30">
            <Compass className="w-16 h-16 text-[#f39c12]" />
          </div>
          <div className="text-4xl font-bold text-white mb-4">Adventure Not Found</div>
          <p className="text-gray-300 mb-8 max-w-md">The journey you're looking for doesn't exist or has been misplaced. Let's create a new amazing adventure!</p>
          <Button
            onClick={() => navigate('/create-trip')}
            className="bg-[#f39c12] hover:bg-[#e67e22] text-[#2c3e50] px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Start New Adventure
          </Button>
        </div>
      </div>
    )
  }

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab trip={trip} parsedData={parsedData} />
      case 'itinerary':
        return <ItineraryTab parsedData={parsedData} />
      case 'hotels':
        return <HotelsTab parsedData={parsedData} />
      case 'food':
        return <FoodTab parsedData={parsedData} />
      case 'travel':
        return <TravelTab parsedData={parsedData} trip={trip} />
      default:
        return <OverviewTab trip={trip} parsedData={parsedData} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Trip Header */}
      <TripHeader
        trip={trip}
        parsedData={parsedData}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        navigate={navigate}
      />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Navigation Tabs - Sticky on scroll */}
        <div className="sticky top-4 z-40 mb-8">
          <TripNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        {/* Share Modal */}
        <ShareModal
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
        />

        {/* Tab Content with smooth transitions */}
        <div className="animate-fade-in-up">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default ViewTrip
  ;