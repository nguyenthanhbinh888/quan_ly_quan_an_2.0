import { api } from './apiClient'
import {
  Category,
  MenuItem,
  CreateCategoryPayload,
  CreateMenuItemPayload,
  MenuItemStatus,
} from '../types/menu'

export const menuService = {
  // Categories
  async getCategories(onlyActive = false): Promise<Category[]> {
    return api.get<Category[]>(`/categories?onlyActive=${onlyActive}`)
  },

  async createCategory(payload: CreateCategoryPayload): Promise<Category> {
    return api.post<Category>('/categories', payload)
  },

  async updateCategory(id: number, payload: CreateCategoryPayload): Promise<Category> {
    return api.put<Category>(`/categories/${id}`, payload)
  },

  async deleteCategory(id: number): Promise<void> {
    return api.delete<void>(`/categories/${id}`)
  },

  // Menu Items
  async getMenuItems(params?: {
    categoryId?: number
    status?: MenuItemStatus
    keyword?: string
  }): Promise<MenuItem[]> {
    const searchParams = new URLSearchParams()
    if (params?.categoryId) searchParams.append('categoryId', params.categoryId.toString())
    if (params?.status) searchParams.append('status', params.status)
    if (params?.keyword) searchParams.append('keyword', params.keyword)

    const query = searchParams.toString()
    const endpoint = query ? `/menu-items?${query}` : '/menu-items'
    return api.get<MenuItem[]>(endpoint)
  },

  async createMenuItem(payload: CreateMenuItemPayload): Promise<MenuItem> {
    return api.post<MenuItem>('/menu-items', payload)
  },

  async updateMenuItem(id: number, payload: CreateMenuItemPayload): Promise<MenuItem> {
    return api.put<MenuItem>(`/menu-items/${id}`, payload)
  },

  async updateMenuItemStatus(id: number, status: MenuItemStatus): Promise<MenuItem> {
    return api.patch<MenuItem>(`/menu-items/${id}/status`, { status })
  },

  async deleteMenuItem(id: number): Promise<void> {
    return api.delete<void>(`/menu-items/${id}`)
  },
}
