export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp: string
}

export interface ApiValidationError {
  field: string
  rejectedValue: unknown
  message: string
}

export interface ApiErrorResponse {
  success: false
  errorCode: string
  message: string
  errors?: ApiValidationError[]
  timestamp: string
}

export interface User {
  id: number
  username: string
  fullName: string
  phone?: string
  role: 'ADMIN' | 'STAFF'
  status: 'ACTIVE' | 'INACTIVE'
}

export interface LoginResponse {
  token: string
  tokenType: string
  expiresIn: number
  user: User
}
