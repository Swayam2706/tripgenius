import React from 'react'
import { User, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/button'

const Profile = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#e8f4f8]">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate(-1)}
            className="p-2 bg-white hover:bg-gray-100 rounded-lg shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-[#2c3e50]" />
          </Button>
          <h1 className="text-3xl font-bold text-[#2c3e50]">My Profile</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#2c3e50] to-[#f39c12] rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#2c3e50] mb-2">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
              <span className="inline-block mt-2 text-sm bg-[#f39c12]/20 text-[#f39c12] px-3 py-1 rounded-full font-medium">
                Pro Member
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-[#2c3e50] mb-2">Account Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">January 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Trips</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Countries Visited</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-[#2c3e50] mb-2">Preferences</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Currency</span>
                  <span className="font-medium">USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Zone</span>
                  <span className="font-medium">UTC-5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
