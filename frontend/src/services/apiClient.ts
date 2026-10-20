import { ApiResponse, ApiErrorResponse } from '../types/api'

export class ApiError extends Error {
  public errorCode: string
  public status: number
  public validationErrors?: ApiErrorResponse['errors']

  constructor(status: number, errorCode: string, message: string, validationErrors?: ApiErrorResponse['errors']) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errorCode = errorCode
    this.validationErrors = validationErrors
  }
}

const TOKEN_KEY = 'restaurant_auth_token'

export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

interface RequestOptions extends RequestInit {
  timeout?: number
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { timeout = 10000, headers = {}, ...customConfig } = options

  const token = getAuthToken()
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`

  try {
    const response = await fetch(url, {
      ...customConfig,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.status === 401) {
      removeAuthToken()
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
    }

    const contentType = response.headers.get('content-type')
    const isJson = contentType && contentType.includes('application/json')
    const data = isJson ? await response.json() : null

    if (!response.ok) {
      const errorData = data as ApiErrorResponse | null
      throw new ApiError(
        response.status,
        errorData?.errorCode || `HTTP_${response.status}`,
        errorData?.message || response.statusText || 'Yêu cầu không thành công',
        errorData?.errors
      )
    }

    return (data as ApiResponse<T>).data !== undefined ? (data as ApiResponse<T>).data : (data as T)
  } catch (error: unknown) {
    clearTimeout(timeoutId)
    if (error instanceof ApiError) {
      throw error
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(408, 'REQUEST_TIMEOUT', 'Yêu cầu quá thời gian chờ (Timeout). Vui lòng thử lại.')
    }
    throw new ApiError(
      0,
      'NETWORK_ERROR',
      error instanceof Error ? error.message : 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.'
    )
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(endpoint: string, options?: RequestOptions) => request<T>(endpoint, { ...options, method: 'DELETE' }),
}

export default api;
