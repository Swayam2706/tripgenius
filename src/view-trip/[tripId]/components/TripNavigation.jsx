import React from 'react'
import { Globe, Map, Hotel, Utensils, Plane } from 'lucide-react'

const TripNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'itinerary', label: 'Itinerary', icon: Map },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'food', label: 'Food & Dining', icon: Utensils },
    { id: 'travel', label: 'How to Travel', icon: Plane }
  ]

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`group relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white shadow-lg scale-105 z-10'
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#f39c12]/10 hover:to-[#f39c12]/5 hover:text-[#2c3e50] bg-white/50'
            }`}
          >
            {/* Active indicator bar */}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50"></div>
            )}
            
            <tab.icon className={`w-5 h-5 transition-all duration-300 ${
              activeTab === tab.id 
                ? 'scale-110 rotate-0' 
                : 'group-hover:scale-110 group-hover:rotate-12'
            }`} />
            <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
            
            {/* Hover shine effect */}
            {activeTab === tab.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TripNavigation
