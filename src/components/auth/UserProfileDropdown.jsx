import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  LogOut, 
  User, 
  History, 
  Bookmark,
  ChevronDown
} from 'lucide-react'
import Button from '@/components/ui/button'

const UserProfileDropdown = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleSignOut = () => {
    logout()
    window.location.reload()
  }

  const menuItems = [
    {
      icon: User,
      label: 'My Profile',
      description: 'Manage your account details',
      action: () => navigate('/profile')
    },
    {
      icon: History,
      label: 'Trip History',
      description: 'View your past trips',
      action: () => navigate('/trip-history')
    },
    {
      icon: Bookmark,
      label: 'Saved Places',
      description: 'Your bookmarked destinations',
      action: () => navigate('/saved-places')
    }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 h-auto bg-transparent hover:bg-gray-100 rounded-lg transition-all duration-200"
      >
        {/* User Avatar */}
        <div className="relative">
          {user.picture ? (
            <img 
              src={user.picture} 
              alt={user.name || 'User'} 
              className="w-8 h-8 rounded-full border-2 border-[#f39c12] object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-[#2c3e50] to-[#f39c12] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
          
          {/* Online indicator */}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        {/* User Info */}
        <div className="hidden sm:block text-left">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-[#2c3e50]">
              {user.name || 'User'}
            </p>
            <span className="text-xs bg-[#f39c12]/20 text-[#f39c12] px-1.5 py-0.5 rounded-full font-medium">
              Pro
            </span>
          </div>
          <p className="text-xs text-gray-500 truncate max-w-[120px]">
            {user.email}
          </p>
        </div>

        {/* Dropdown Arrow */}
        <ChevronDown 
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {/* User Header */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#f8f9fa] to-[#e8f4f8]">
            <div className="flex items-center gap-3">
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.name || 'User'} 
                  className="w-10 h-10 rounded-full border-2 border-[#f39c12] object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-[#2c3e50] to-[#f39c12] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-[#2c3e50]">
                  {user.name || 'User'}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {user.email}
                </p>
              </div>
              <span className="text-xs bg-[#f39c12]/20 text-[#f39c12] px-2 py-1 rounded-full font-medium">
                Pro
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action()
                  setIsOpen(false)
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors duration-150 text-left group"
              >
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#f39c12]/10 transition-colors duration-150">
                  <item.icon className="w-4 h-4 text-gray-600 group-hover:text-[#f39c12]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#2c3e50] group-hover:text-[#f39c12]">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Sign Out Button */}
          <div className="p-2">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors duration-150 text-left group"
            >
              <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-150">
                <LogOut className="w-4 h-4 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-600">
                  Sign Out
                </p>
                <p className="text-xs text-gray-500">
                  Sign out of your account
                </p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfileDropdown
