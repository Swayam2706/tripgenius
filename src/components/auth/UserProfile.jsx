import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { LogOut, User, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'

const UserProfile = () => {
  const { user, logout, isAuthenticated } = useAuth()

  // Only show user profile if authenticated
  if (!isAuthenticated || !user) {
    return null
  }

  const handleSignOut = () => {
    logout()
    window.location.reload() // Refresh to update UI
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name || 'User'}
                className="w-12 h-12 rounded-full border-2 border-[#f39c12] shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-[#2c3e50] to-[#f39c12] rounded-full flex items-center justify-center shadow-sm">
                <User className="w-6 h-6 text-white" />
              </div>
            )}

            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          {/* User Details */}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[#2c3e50] text-lg">
                {user.name || 'Traveler'}
              </h3>
              <span className="text-xs bg-[#f39c12]/20 text-[#f39c12] px-2 py-1 rounded-full font-medium">
                Premium
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Mail className="w-3 h-3" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>

      {/* Welcome Message */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <span className="text-lg">👋</span>
          <span>Welcome back! Ready to plan your next adventure?</span>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
