import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, User, LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import Button from '@/components/ui/Button'
import { Input } from "@/components/ui/input"

const SignInForm = ({ onSignInSuccess, onSwitchToSignUp }) => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("SignInForm - Google Login Success:", tokenResponse)
      setGoogleLoading(true)

      try {
        // Get user profile from Google
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: "Application/json"
          }
        })

        const userData = response.data
        console.log("SignInForm - Google User Profile:", userData)

        // Login to app
        login(userData)

        // Call success callback
        if (onSignInSuccess) {
          onSignInSuccess(userData)
        }

      } catch (error) {
        console.error("SignInForm - Error getting Google user profile:", error)
        setErrors({
          general: 'Failed to sign in with Google. Please try again.'
        })
      } finally {
        setGoogleLoading(false)
      }
    },
    onError: (error) => {
      console.log("SignInForm - Google Login Error:", error)
      setErrors({
        general: 'Google sign-in failed. Please try again.'
      })
      setGoogleLoading(false)
    },
    scope: 'openid email profile'
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('SignInForm - handleSubmit called')
    console.log('SignInForm - formData:', formData)

    if (!validateForm()) {
      console.log('SignInForm - validation failed')
      return
    }

    console.log('SignInForm - validation passed, starting sign in')
    setLoading(true)

    try {
      // Simulate authentication (in real app, this would call your backend)
      console.log('SignInForm - Signing in with:', formData)

      // Mock user data for demo
      const userData = {
        id: 'user_' + Date.now(),
        email: formData.email,
        name: formData.email.split('@')[0],
        picture: `https://ui-avatars.com/api/?name=${formData.email.split('@')[0]}&background=f39c12&color=fff&size=128`,
        verified: true
      }

      console.log('SignInForm - Created userData:', userData)

      // Login user
      console.log('SignInForm - Calling login function...')
      login(userData)
      console.log('SignInForm - Login function called successfully')

      // Call success callback
      if (onSignInSuccess) {
        console.log('SignInForm - Calling onSignInSuccess callback...')
        onSignInSuccess(userData)
        console.log('SignInForm - onSignInSuccess callback completed')
      }

    } catch (error) {
      console.error('SignInForm - Sign in error:', error)
      setErrors({
        general: 'Invalid email or password. Please try again.'
      })
    } finally {
      console.log('SignInForm - Setting loading to false')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#2c3e50] to-[#f39c12] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to continue your journey</p>
      </div>

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-[#f39c12] focus:ring-[#f39c12]/20"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#f39c12] focus:ring-[#f39c12]/20"
              placeholder="Enter your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        {/* Sign In Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-[#2c3e50] to-[#34495e] hover:from-[#34495e] hover:to-[#2c3e50] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <LogIn className="w-5 h-5" />
              Sign In
            </div>
          )}
        </Button>

        {/* Forgot Password */}
        <div className="text-center">
          <button
            type="button"
            className="text-sm text-[#f39c12] hover:text-[#e67e22] font-medium"
          >
            Forgot your password?
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Sign In */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => googleLogin()}
            disabled={googleLoading}
            className="w-full h-12 border-2 border-gray-200 hover:border-[#f39c12] hover:bg-[#f39c12]/5 transition-all duration-300 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-[#f39c12] border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[#2c3e50] font-medium">Signing in with Google...</span>
              </div>
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span className="text-[#2c3e50] font-medium">Continue with Google</span>
              </>
            )}
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-[#f39c12] hover:text-[#e67e22] font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
