import { apiService } from "./api"

class AuthService {
  private currentUser: any = null
  private token: string | null = null

  async login(credentials: { email: string; password: string }) {
    try {
      const response = await apiService.post("/auth/login", credentials)
      this.token = response.token
      this.currentUser = response.user
      return response
    } catch (error: any) {
      throw new Error("Erro ao fazer login")
    }
  }

  async register(userData: any) {
    try {
      const response = await apiService.post("/auth/register", userData)
      return response
    } catch (error: any) {
      throw new Error("Erro ao criar conta")
    }
  }

  getCurrentUser() {
    return this.currentUser
  }

  isAuthenticated() {
    return !!this.token
  }

  logout() {
    this.token = null
    this.currentUser = null
  }
}

export const authService = new AuthService()