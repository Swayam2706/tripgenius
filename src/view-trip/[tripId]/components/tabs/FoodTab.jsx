import React from 'react'
import { Utensils, MapPin } from 'lucide-react'
import { formatPrice } from '../../../../utils/currency'

const FoodTab = ({ parsedData }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#f39c12] to-[#e67e22] rounded-2xl p-6 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Culinary Journey</h3>
            <p className="text-white/90">Taste local flavors and delicacies</p>
          </div>
          <Utensils className="w-12 h-12 text-white" />
        </div>
      </div>

      {parsedData.foodRecommendations && parsedData.foodRecommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parsedData.foodRecommendations.map((food, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="h-56 bg-gradient-to-br from-[#f39c12] to-[#e67e22] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <Utensils className="w-20 h-20 text-white opacity-50 relative z-10" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-[#2c3e50] font-bold text-sm">{food.type}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2c3e50] mb-3 group-hover:text-[#f39c12] transition-colors">{food.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{food.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{food.location}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#f39c12]">{formatPrice(food.price, parsedData.destination)}</div>
                    <div className="text-xs text-gray-500">per person</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <Utensils className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-[#2c3e50] mb-3">No Food Recommendations</h3>
          <p className="text-gray-600 max-w-md mx-auto">Delicious food suggestions will appear here once available.</p>
        </div>
      )}
    </div>
  )
}

export default FoodTab
