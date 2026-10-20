export interface Category {
  id: number
  name: string
  description?: string
  displayOrder: number
  active: boolean
  itemCount: number
}

export type MenuItemStatus = 'AVAILABLE' | 'OUT_OF_STOCK'

export interface MenuItem {
  id: number
  categoryId: number
  categoryName: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  status: MenuItemStatus
  createdAt: string
}

export interface CreateMenuItemPayload {
  categoryId: number
  name: string
  description?: string
  price: number
  imageUrl?: string
  status: MenuItemStatus
}

export interface CreateCategoryPayload {
  name: string
  description?: string
  displayOrder?: number
  active?: boolean
}
