import React, { useState } from 'react'
import { Map } from 'lucide-react'
import PlaceCard from '../../../../components/trip/PlaceCard'

const ItineraryTab = ({ parsedData }) => {
  const [activeDay, setActiveDay] = useState(1)

  return (
    <div className="space-y-8">
      {/* Day Selector */}
      {parsedData.itinerary && parsedData.itinerary.length > 1 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#2c3e50] flex items-center gap-2">
              <span className="text-2xl">📅</span>
              Select Day
            </h3>
            <span className="text-sm text-gray-500">Click on a day to view details</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {parsedData.itinerary.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeDay === day.day
                    ? 'bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gradient-to-r hover:from-[#f39c12]/10 hover:to-[#f39c12]/5 hover:text-[#2c3e50]'
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>
        </div>
      )}

      {parsedData.itinerary && parsedData.itinerary.length > 0 ? (
        parsedData.itinerary
          .filter(dayPlan => !activeDay || dayPlan.day === activeDay)
          .map((dayPlan) => (
            <div key={dayPlan.day} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-fade-in-up hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-r from-[#2c3e50] via-[#34495e] to-[#2c3e50] text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f39c12]/10 rounded-full blur-2xl"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Day {dayPlan.day}</h3>
                    <p className="text-[#f39c12] font-semibold text-lg">{dayPlan.theme}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#f39c12]">{dayPlan.places?.length || 0}</div>
                    <div className="text-sm text-white/80">Places</div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dayPlan.places?.map((place, placeIndex) => (
                    <div key={placeIndex} className="group animate-fade-in-up" style={{ animationDelay: `${placeIndex * 100}ms` }}>
                      <PlaceCard place={place} destination={parsedData.destination} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <Map className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-[#2c3e50] mb-3">Itinerary in Progress</h3>
          <p className="text-gray-600 max-w-md mx-auto">Your detailed itinerary is being prepared. Please check back soon!</p>
        </div>
      )}
    </div>
  )
}

export default ItineraryTab
