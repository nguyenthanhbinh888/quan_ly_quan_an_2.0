import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from '../context/RouterContext'
import { Button } from '../components/common/Button'
import { ApiError } from '../services/apiClient'

export const LoginPage: React.FC = () => {
  const { login } = useAuth()
  const { navigate } = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password) {
      setErrorMessage('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.')
      return
    }

    setLoading(true)
    setErrorMessage(null)

    try {
      await login(username.trim(), password)
      navigate('/')
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message)
      } else if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage('Đã xảy ra lỗi không xác định khi đăng nhập.')
      }
    } finally {
      setLoading(false)
    }
  }

  const fillCredentials = (user: string, pass: string) => {
    setUsername(user)
    setPassword(pass)
    setErrorMessage(null)
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🍽️</div>
          <h1 className="login-title">Quản Lý Quán Ăn</h1>
          <p className="login-subtitle">Đăng nhập hệ thống vận hành và thu ngân</p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            <span className="alert-icon">⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              className="form-control"
              placeholder="Nhập username (ví dụ: admin)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={loading} style={{ width: '100%', marginTop: '0.75rem' }}>
            Đăng Nhập
          </Button>
        </form>

        <div className="quick-login-box">
          <span className="quick-login-title">⚡ Tài khoản thử nghiệm nhanh:</span>
          <div className="quick-buttons">
            <button
              type="button"
              className="quick-btn"
              onClick={() => fillCredentials('admin', 'Admin123@')}
              disabled={loading}
            >
              👑 Admin (Chủ quán)
            </button>
            <button
              type="button"
              className="quick-btn"
              onClick={() => fillCredentials('staff01', 'Admin123@')}
              disabled={loading}
            >
              👔 Staff (Nhân viên)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
