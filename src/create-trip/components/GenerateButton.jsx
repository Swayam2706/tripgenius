import React from 'react'
import Button from '@/components/ui/button'

const GenerateButton = ({ loading, onClick }) => {
  return (
    <div className="mt-10 mb-8 flex justify-center animate-fade-in-up animation-delay-500">
      <Button 
        onClick={onClick} 
        disabled={loading}
        className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white shadow-xl hover:shadow-2xl disabled:hover:shadow-xl"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating Your Perfect Trip...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            ✨ Generate Trip
          </span>
        )}
      </Button>
    </div>
  )
}

export default GenerateButton
