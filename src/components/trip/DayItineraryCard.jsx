import React from 'react'
import PlaceCard from './PlaceCard'

const DayItineraryCard = ({ dayPlan, destination }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {dayPlan.date || `Day ${dayPlan.day}`}
          </h2>
          <p className="text-blue-600 font-semibold">{dayPlan.theme}</p>
        </div>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg">
          Day {dayPlan.day}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dayPlan.places?.map((place, index) => (
          <PlaceCard key={index} place={place} destination={destination} />
        ))}
      </div>
    </div>
  )
}

export default DayItineraryCard


