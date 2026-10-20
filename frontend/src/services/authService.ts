import { api } from './apiClient'
import { LoginResponse, User } from '../types/api'

export const authService = {
  async login(username: string, password: string):Promise<LoginResponse> {
    return api.post<LoginResponse>('/auth/login', { username, password })
  },

  async getCurrentUser(): Promise<User> {
    return api.get<User>('/auth/me')
  },
}
