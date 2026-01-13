import React from 'react'
import { SelectTravelesList } from '../../constants/options'

const TravelerSelector = ({ selected, onSelect }) => {
  return (
    <div className="mt-8 animate-fade-in-up animation-delay-400">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-center mb-6 text-[#2c3e50] flex items-center justify-center gap-2">
          <span className="text-2xl">👥</span>
          With whom are you traveling?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SelectTravelesList.map((item, index) => {
            const isSelected = selected === item.people

            return (
              <div
                key={index}
                onClick={() => onSelect(item.people)}
                className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105
                  ${isSelected 
                    ? 'border-[#f39c12] bg-gradient-to-br from-[#f39c12]/20 to-[#f39c12]/5 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-[#f39c12]/50 hover:shadow-md bg-white'
                  }
                `}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className={`text-4xl transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                    {item.icon}
                  </div>
                  <h3 className={`font-bold text-lg transition-colors ${isSelected ? 'text-[#f39c12]' : 'text-[#2c3e50]'}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TravelerSelector
