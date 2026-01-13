import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '@/components/ui/button'
import { Input } from "@/components/ui/input"

const SignUpForm = ({ onSignUpSuccess, onSwitchToSignIn }) => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

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
    
    if (!formData.name) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
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
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      // Simulate registration (in real app, this would call your backend)
      console.log('Signing up with:', formData)
      
      // Mock user data for demo
      const userData = {
        id: 'user_' + Date.now(),
        email: formData.email,
        name: formData.name,
        picture: `https://ui-avatars.com/api/?name=${formData.name}&background=f39c12&color=fff&size=128`,
        verified: false,
        createdAt: new Date().toISOString()
      }
      
      // Login user after successful registration
      login(userData)
      
      // Call success callback
      if (onSignUpSuccess) {
        onSignUpSuccess(userData)
      }
      
    } catch (error) {
      console.error('Sign up error:', error)
      setErrors({
        general: 'Registration failed. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#2c3e50] to-[#f39c12] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[#2c3e50] mb-2">Create Account</h2>
        <p className="text-gray-600">Join TripGenius and start planning</p>
      </div>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-[#f39c12] focus:ring-[#f39c12]/20"
              placeholder="Enter your full name"
              disabled={loading}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

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
              placeholder="Create a password"
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

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#f39c12] focus:ring-[#f39c12]/20"
              placeholder="Confirm your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        {/* Sign Up Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-gradient-to-r from-[#f39c12] to-[#e67e22] hover:from-[#e67e22] hover:to-[#f39c12] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating account...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              Create Account
            </div>
          )}
        </Button>

        {/* Terms */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <span className="text-[#f39c12] hover:text-[#e67e22] cursor-pointer">Terms of Service</span>{' '}
            and{' '}
            <span className="text-[#f39c12] hover:text-[#e67e22] cursor-pointer">Privacy Policy</span>
          </p>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        {/* Social Sign Up */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full h-12 border-2 border-gray-200 hover:border-[#f39c12] hover:bg-[#f39c12]/5 transition-all duration-300 rounded-xl flex items-center justify-center gap-3"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="text-[#2c3e50] font-medium">Continue with Google</span>
          </button>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignIn}
              className="text-[#f39c12] hover:text-[#e67e22] font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
