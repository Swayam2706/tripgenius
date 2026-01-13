import React from 'react'

const FormHeader = () => {
  return (
    <div className="text-center mb-10 animate-fade-in-up">
      <div className="inline-flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-[#f39c12] to-[#e67e22] rounded-2xl shadow-lg">
          <span className="text-4xl">🌍</span>
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-4">
        Tell us your travel preferences
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        AI will generate a personalized itinerary based on your choices
      </p>
    </div>
  )
}

export default FormHeader
