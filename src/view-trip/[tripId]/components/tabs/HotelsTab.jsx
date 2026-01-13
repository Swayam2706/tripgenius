import React from 'react'
import { Hotel } from 'lucide-react'
import HotelCard from '../../../../components/trip/HotelCard'

const HotelsTab = ({ parsedData }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#2c3e50] to-[#34495e] rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Accommodation Options</h3>
            <p className="text-white/80">Handpicked hotels for your comfortable stay</p>
          </div>
          <Hotel className="w-12 h-12 text-[#f39c12]" />
        </div>
      </div>

      {parsedData.hotels && parsedData.hotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parsedData.hotels.map((hotel, index) => (
            <div key={index} className="group transform transition-all duration-300 hover:scale-105">
              <HotelCard hotel={hotel} destination={parsedData.destination} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <Hotel className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-[#2c3e50] mb-3">No Hotels Available</h3>
          <p className="text-gray-600 max-w-md mx-auto">Hotel recommendations will appear here once available.</p>
        </div>
      )}
    </div>
  )
}

export default HotelsTab
