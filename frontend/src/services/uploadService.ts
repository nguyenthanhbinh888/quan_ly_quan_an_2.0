import { getAuthToken } from './apiClient'

export interface UploadResult {
  url: string
  filename: string
  originalFilename: string
  size: number
  contentType: string
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export const uploadService = {
  async uploadImage(file: File): Promise<UploadResult> {
    const formData = new FormData()
    formData.append('file', file)

    const token = getAuthToken()
    const headers: Record<string, string> = {}
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const endpoint = `${BASE_URL}/uploads`
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      const message = result?.message || result?.error || 'Tải ảnh lên máy chủ thất bại'
      throw new Error(message)
    }

    return (result?.data || result) as UploadResult
  },
}
