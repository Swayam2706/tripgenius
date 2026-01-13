import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import Button from '../ui/button'
import AuthDialog from '../auth/AuthDialog'
import UserProfileDropdown from '../auth/UserProfileDropdown'
import { Sparkles } from 'lucide-react'

function Header() {
  const { isAuthenticated } = useAuth()
  const [openDialog, setOpenDialog] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <>
      <div className={`sticky top-0 z-50 w-full shadow-lg transition-all duration-300 ${
        isHomePage 
          ? 'bg-white/95 backdrop-blur-md border-b border-[#f39c12]/20' 
          : 'bg-white shadow-xl'
      }`}>
        <div className='w-full px-6 sm:px-8 lg:px-12 py-6'>
          <div className='flex justify-between items-center w-full'>
            {/* Logo - Leftmost Corner */}
            <div className="flex items-center flex-shrink-0">
              <Link 
                to="/" 
                className='group flex items-center gap-4 transition-transform hover:scale-105'
              >
                <img
                  src='/logo.svg'
                  className='h-16 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-lg'
                  alt="TripGenius Logo"
                />
                {isHomePage && (
                  <div className='hidden lg:flex items-center gap-3 text-[#f39c12] opacity-0 group-hover:opacity-100 transition-opacity'>
                    <Sparkles className='w-6 h-6 animate-pulse' />
                    <span className='text-xl font-bold'>AI Travel Planner</span>
                  </div>
                )}
              </Link>
            </div>
            
            {/* Profile Dropdown - Rightmost Corner */}
            <div className="flex items-center flex-shrink-0">
              {isAuthenticated ? (
                <UserProfileDropdown />
              ) : (
                <Button 
                  onClick={() => setOpenDialog(true)}
                  className="group relative px-10 py-4 bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden rounded-full text-lg"
                >
                  <span className='relative z-10'>Sign In</span>
                  <div className='absolute inset-0 bg-gradient-to-r from-[#e67e22] to-[#f39c12] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog 
        open={openDialog} 
        onOpenChange={setOpenDialog}
        onAuthSuccess={() => {
          setOpenDialog(false)
          window.location.reload()
        }}
      />
    </>
  )
}

export default Header