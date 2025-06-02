import { useState, useEffect } from "react"
import { authService } from "../services/authService"
import type { User, LoginRequest } from "../types"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true)
      setError(null)
      const response = await authService.login(credentials)
      setUser(response.user)
      return response
    } catch (error: any) {
      setError("Falha no login. Verifique suas credenciais.")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const register = async (userData: any) => {
    try {
      setLoading(true)
      setError(null)
      const response = await authService.register(userData)
      return response
    } catch (error: any) {
      setError("Falha no cadastro. Tente novamente.")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user
  }
}