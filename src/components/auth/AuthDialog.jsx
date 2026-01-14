import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const AuthDialog = ({ open, onOpenChange, onAuthSuccess, defaultView = 'signin' }) => {
  const { login } = useAuth()
  const [currentView, setCurrentView] = useState(defaultView) // 'signin' or 'signup'

  // Debug logging
  React.useEffect(() => {
    console.log("AuthDialog - open state:", open)
    if (open) {
      setCurrentView(defaultView)
    }
  }, [open, defaultView])

  // Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse)

      try {
        // Get user profile from Google
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: "Application/json"
          }
        })

        const userData = response.data
        console.log("User Profile:", userData)

        // Sync user with backend
        // We'll try to find the API URL from environment, or default to localhost:5000
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

        try {
          console.log("Syncing user with backend...");
          await axios.post(`${API_URL}/api/users/sync`, {
            email: userData.email,
            googleId: userData.id,
            name: userData.name,
            picture: userData.picture
          });
          console.log("User synced with backend successfully");
        } catch (syncError) {
          // Verify if it's a network error or server error, but don't block login?
          // User asked for persistence, so maybe we should at least log it loudly.
          console.error("Failed to sync user with backend:", syncError);
        }

        // Login to app (update local context)
        login(userData)

        // Close dialog
        onOpenChange(false)

        // Callback for success
        if (onAuthSuccess) {
          onAuthSuccess(userData)
        }

      } catch (error) {
        console.error("Error getting user profile:", error)
      }
    },
    onError: (error) => {
      console.log("Google Login Error:", error)
    },
    scope: 'openid email profile'
  })

  const handleSignInSuccess = (userData) => {
    console.log("AuthDialog - handleSignInSuccess called with:", userData)
    console.log("AuthDialog - Closing dialog...")
    onOpenChange(false)
    console.log("AuthDialog - Dialog closed")
    if (onAuthSuccess) {
      console.log("AuthDialog - Calling onAuthSuccess callback...")
      onAuthSuccess(userData)
      console.log("AuthDialog - onAuthSuccess callback completed")
    } else {
      console.log("AuthDialog - No onAuthSuccess callback provided")
    }
  }

  const handleSignUpSuccess = (userData) => {
    console.log("AuthDialog - handleSignUpSuccess called with:", userData)
    console.log("AuthDialog - Closing dialog...")
    onOpenChange(false)
    if (onAuthSuccess) {
      console.log("AuthDialog - Calling onAuthSuccess callback...")
      onAuthSuccess(userData)
      console.log("AuthDialog - onAuthSuccess callback completed")
    } else {
      console.log("AuthDialog - No onAuthSuccess callback provided")
    }
  }

  const switchToSignUp = () => {
    setCurrentView('signup')
  }

  const switchToSignIn = () => {
    setCurrentView('signin')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-auto border border-gray-100 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-2xl font-bold text-[#2c3e50] flex items-center justify-center gap-2">
            <span className="text-3xl">✈️</span>
            {currentView === 'signin' ? 'Welcome Back' : 'Join TripGenius'}
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-base">
            {currentView === 'signin'
              ? 'Sign in to continue your travel journey'
              : 'Create an account to start planning amazing trips'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {currentView === 'signin' ? (
            <SignInForm
              onSignInSuccess={handleSignInSuccess}
              onSwitchToSignUp={switchToSignUp}
            />
          ) : (
            <SignUpForm
              onSignUpSuccess={handleSignUpSuccess}
              onSwitchToSignIn={switchToSignIn}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog
