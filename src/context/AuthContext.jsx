import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing user on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log("AuthContext - Checking for existing user...")
        const storedUser = localStorage.getItem("user")
        console.log("AuthContext - Raw localStorage user:", storedUser)
        
        if (storedUser && storedUser !== 'null' && storedUser !== 'undefined') {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          console.log("AuthContext - User found and set:", parsedUser)
        } else {
          setUser(null)
          localStorage.removeItem("user")
          console.log("AuthContext - No user found, cleared localStorage")
        }
      } catch (error) {
        console.error("AuthContext - Error checking auth:", error)
        setUser(null)
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
        console.log("AuthContext - Auth check completed, loading:", false)
      }
    }

    checkAuth()
  }, [])

  const login = (userData) => {
    try {
      console.log("AuthContext - Logging in user:", userData)
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      console.log("AuthContext - User logged in successfully")
    } catch (error) {
      console.error("AuthContext - Error logging in:", error)
      throw error
    }
  }

  const logout = () => {
    try {
      console.log("AuthContext - Logging out user")
      setUser(null)
      localStorage.removeItem("user")
      console.log("AuthContext - User logged out successfully")
    } catch (error) {
      console.error("AuthContext - Error logging out:", error)
    }
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }

  console.log("AuthContext - Current state:", { user: !!user, loading, isAuthenticated: !!user })

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
