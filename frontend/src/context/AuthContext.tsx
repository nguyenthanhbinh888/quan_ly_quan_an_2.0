import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, LoginResponse } from '../types/api'
import { authService } from '../services/authService'
import { getAuthToken, setAuthToken, removeAuthToken } from '../services/apiClient'

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  login: (username: string, password: string) => Promise<LoginResponse>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(getAuthToken())
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getAuthToken()
      if (storedToken) {
        try {
          const currentUser = await authService.getCurrentUser()
          setUser(currentUser)
          setToken(storedToken)
        } catch {
          removeAuthToken()
          setUser(null)
          setToken(null)
        }
      }
      setLoading(false)
    }

    initAuth()

    const handleUnauthorized = () => {
      setUser(null)
      setToken(null)
    }

    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized)
  }, [])

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await authService.login(username, password)
    setAuthToken(response.token)
    setToken(response.token)
    setUser(response.user)
    return response
  }

  const logout = () => {
    removeAuthToken()
    setToken(null)
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'ADMIN',
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
