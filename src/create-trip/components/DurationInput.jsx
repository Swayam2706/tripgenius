import React from 'react'
import { Input } from "@/components/ui/input"

const DurationInput = ({ value, onChange }) => {
  return (
    <div className="mt-8 animate-fade-in-up animation-delay-200">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
        <h2 className="text-xl font-semibold mb-4 text-[#2c3e50] flex items-center gap-2">
          <span className="text-2xl">📅</span>
          How many days are you planning your trip?
        </h2>
        <Input
          placeholder="Ex. 3"
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  )
}

export default DurationInput
