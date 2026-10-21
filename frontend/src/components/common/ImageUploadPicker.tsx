import React, { useState, useRef } from 'react'
import { uploadService } from '../../services/uploadService'
import { getImageUrl } from '../../services/apiClient'
import { IconUpload, IconImage, IconTrash, IconEdit, IconCheckCircle, IconAlertCircle } from './Icons'
import { LoadingSpinner } from './LoadingSpinner'

interface ImageUploadPickerProps {
  value?: string
  onChange: (url: string) => void
  disabled?: boolean
  label?: string
}

export const ImageUploadPicker: React.FC<ImageUploadPickerProps> = ({
  value = '',
  onChange,
  disabled = false,
  label = 'Hình ảnh món ăn',
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [previewError, setPreviewError] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    // Client-side validation
    const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      setUploadError('Định dạng tệp không được hỗ trợ. Vui lòng chọn ảnh PNG, JPG, JPEG, WEBP hoặc GIF.')
      return
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      setUploadError('Dung lượng tệp vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn.')
      return
    }

    setUploadError(null)
    setIsUploading(true)
    setPreviewError(false)

    try {
      const result = await uploadService.uploadImage(file)
      onChange(result.url)
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : 'Tải ảnh lên máy chủ thất bại')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled && !isUploading) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (disabled || isUploading) return

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleRemoveImage = () => {
    onChange('')
    setUploadError(null)
    setPreviewError(false)
  }

  const resolvedImageUrl = getImageUrl(value)

  return (
    <div className="image-upload-picker">
      <div className="image-picker-header">
        <label className="image-picker-label">{label}</label>
        <button
          type="button"
          className="image-picker-toggle-btn"
          onClick={() => {
            setMode(mode === 'upload' ? 'url' : 'upload')
            setUploadError(null)
          }}
          disabled={disabled || isUploading}
        >
          {mode === 'upload' ? 'Hoặc nhập link URL' : 'Tải ảnh từ máy tính'}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/png,image/jpeg,image/webp,image/gif"
        style={{ display: 'none' }}
        disabled={disabled || isUploading}
      />

      {value ? (
        /* Image Preview Box */
        <div className="image-preview-card">
          {!previewError && resolvedImageUrl ? (
            <img
              src={resolvedImageUrl}
              alt="Món ăn"
              className="image-preview-thumb"
              onError={() => setPreviewError(true)}
            />
          ) : (
            <div className="image-preview-thumb image-preview-fallback">
              <IconImage size={24} />
            </div>
          )}

          <div className="image-preview-info">
            <span className="image-preview-name" title={value}>
              {value.startsWith('/api/uploads/')
                ? value.replace('/api/uploads/', '')
                : value.length > 40
                  ? value.substring(0, 37) + '...'
                  : value}
            </span>
            <span className="image-preview-badge">
              <IconCheckCircle size={13} />
              {value.startsWith('/api/uploads/') ? 'Đã tải lên máy chủ' : 'Ảnh từ liên kết'}
            </span>
          </div>

          <div className="image-preview-actions">
            <button
              type="button"
              className="btn-icon-action"
              onClick={() => fileInputRef.current?.click()}
              title="Chọn ảnh khác từ máy"
              disabled={disabled || isUploading}
            >
              <IconEdit size={15} />
              <span>Đổi ảnh</span>
            </button>
            <button
              type="button"
              className="btn-icon-action btn-icon-remove"
              onClick={handleRemoveImage}
              title="Xóa ảnh"
              disabled={disabled || isUploading}
            >
              <IconTrash size={15} />
              <span>Xóa</span>
            </button>
          </div>
        </div>
      ) : mode === 'upload' ? (
        /* Drag and Drop Zone */
        <div
          className={`image-dropzone ${isDragging ? 'dragging' : ''} ${isUploading ? 'uploading' : ''}`}
          onClick={() => !isUploading && !disabled && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileInputRef.current?.click()
            }
          }}
        >
          {isUploading ? (
            <div className="dropzone-uploading">
              <LoadingSpinner size="md" />
              <p className="dropzone-title" style={{ marginTop: '0.5rem' }}>
                Đang tải ảnh lên máy chủ...
              </p>
              <p className="dropzone-hint">Vui lòng chờ trong giây lát</p>
            </div>
          ) : (
            <>
              <div className="dropzone-icon-wrap">
                <IconUpload size={22} strokeWidth={2} />
              </div>
              <p className="dropzone-title">
                <span>Nhấn để chọn ảnh từ máy</span> hoặc kéo thả vào đây
              </p>
              <p className="dropzone-hint">Hỗ trợ PNG, JPG, JPEG, WEBP, GIF (Tối đa 5MB)</p>
            </>
          )}
        </div>
      ) : (
        /* URL Input Field */
        <div className="image-url-input-wrap">
          <input
            id="item-image-url-input"
            type="url"
            className="form-control"
            placeholder="https://example.com/anh_mon_an.jpg"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
          <p className="form-help-text">Dán đường dẫn ảnh trực tiếp từ internet.</p>
        </div>
      )}

      {uploadError && (
        <div className="image-upload-error">
          <IconAlertCircle size={14} />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  )
}
