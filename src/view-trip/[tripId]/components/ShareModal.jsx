import React from 'react'
import { Mail, Phone, Share2 } from 'lucide-react'

const ShareModal = ({ showShareModal, setShowShareModal }) => {
  if (!showShareModal) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">Share Your Adventure</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
            <Mail className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Share via Email</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-xl transition-colors">
            <Phone className="w-5 h-5 text-green-600" />
            <span className="font-medium">Share via WhatsApp</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors">
            <Share2 className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Copy Link</span>
          </button>
        </div>
        <button 
          onClick={() => setShowShareModal(false)}
          className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ShareModal
