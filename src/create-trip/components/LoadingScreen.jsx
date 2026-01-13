import React from 'react'

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8f4f8] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="w-20 h-20 border-4 border-[#f39c12]/30 border-t-[#f39c12] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-[#e67e22] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="text-[#2c3e50] font-semibold text-lg">Loading your travel planner...</p>
        <div className="mt-4 flex gap-2 justify-center">
          <div className="w-2 h-2 bg-[#f39c12] rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#f39c12] rounded-full animate-pulse animation-delay-200"></div>
          <div className="w-2 h-2 bg-[#f39c12] rounded-full animate-pulse animation-delay-400"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
