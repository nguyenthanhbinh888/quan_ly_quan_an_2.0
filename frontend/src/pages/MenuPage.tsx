import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { menuService } from '../services/menuService'
import { Category, MenuItem, MenuItemStatus } from '../types/menu'
import { Button } from '../components/common/Button'
import { Badge } from '../components/common/Badge'
import { Modal } from '../components/common/Modal'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { EmptyState } from '../components/common/EmptyState'
import { ApiError, getImageUrl } from '../services/apiClient'
import { ImageUploadPicker } from '../components/common/ImageUploadPicker'
import {
  IconPlus,
  IconUtensils,
  IconSearch,
  IconClose,
  IconEdit,
  IconTrash,
  IconCheckCircle,
  IconAlertCircle,
  IconRefresh,
} from '../components/common/Icons'

export const MenuPage: React.FC = () => {
  const { isAdmin } = useAuth()

  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [searchKeyword, setSearchKeyword] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(true)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Item Modal State
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [itemFormData, setItemFormData] = useState({
    categoryId: 1,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    status: 'AVAILABLE' as MenuItemStatus,
  })

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
    displayOrder: 1,
  })

  // Delete Confirm State
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    type: 'ITEM' | 'CATEGORY'
    id: number
    name: string
  } | null>(null)

  const showToast = (msg: string) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(null), 3500)
  }

  const loadData = useCallback(async () => {
    setLoading(true)
    setErrorMessage(null)
    try {
      const [cats, items] = await Promise.all([
        menuService.getCategories(false),
        menuService.getMenuItems({
          categoryId: selectedCategoryId || undefined,
          status: statusFilter === 'ALL' ? undefined : (statusFilter as MenuItemStatus),
          keyword: searchKeyword.trim() || undefined,
        }),
      ])
      setCategories(cats)
      setMenuItems(items)
      if (cats.length > 0 && !itemFormData.categoryId) {
        setItemFormData((prev) => ({ ...prev, categoryId: cats[0].id }))
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Không thể tải dữ liệu thực đơn.')
    } finally {
      setLoading(false)
    }
  }, [selectedCategoryId, statusFilter, searchKeyword, itemFormData.categoryId])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Open Create Item Modal
  const handleOpenCreateItem = () => {
    setEditingItem(null)
    setItemFormData({
      categoryId: selectedCategoryId || (categories[0]?.id ?? 1),
      name: '',
      description: '',
      price: 50000,
      imageUrl: '',
      status: 'AVAILABLE',
    })
    setIsItemModalOpen(true)
  }

  // Open Edit Item Modal
  const handleOpenEditItem = (item: MenuItem) => {
    setEditingItem(item)
    setItemFormData({
      categoryId: item.categoryId,
      name: item.name,
      description: item.description || '',
      price: item.price,
      imageUrl: item.imageUrl || '',
      status: item.status,
    })
    setIsItemModalOpen(true)
  }

  // Submit Item Form
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!itemFormData.name.trim()) {
      alert('Vui lòng nhập tên món ăn')
      return
    }
    if (itemFormData.price < 0) {
      alert('Đơn giá không được nhỏ hơn 0')
      return
    }

    setActionLoading(true)
    try {
      if (editingItem) {
        await menuService.updateMenuItem(editingItem.id, itemFormData)
        showToast(`Đã cập nhật món "${itemFormData.name}" thành công!`)
      } else {
        await menuService.createMenuItem(itemFormData)
        showToast(`Đã thêm món "${itemFormData.name}" vào thực đơn!`)
      }
      setIsItemModalOpen(false)
      loadData()
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Lỗi khi lưu món ăn')
    } finally {
      setActionLoading(false)
    }
  }

  // Quick Toggle Status
  const handleToggleStatus = async (item: MenuItem) => {
    const nextStatus: MenuItemStatus = item.status === 'AVAILABLE' ? 'OUT_OF_STOCK' : 'AVAILABLE'
    try {
      await menuService.updateMenuItemStatus(item.id, nextStatus)
      showToast(`Đã đổi trạng thái "${item.name}" sang ${nextStatus === 'AVAILABLE' ? 'Còn bán' : 'Hết món'}`)
      loadData()
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Lỗi khi đổi trạng thái món ăn')
    }
  }

  // Open Category Manager Modal
  const handleOpenCategoryManager = () => {
    setEditingCategory(null)
    setCategoryFormData({ name: '', description: '', displayOrder: categories.length + 1 })
    setIsCategoryModalOpen(true)
  }

  // Start Editing Category
  const handleStartEditCategory = (cat: Category) => {
    setEditingCategory(cat)
    setCategoryFormData({
      name: cat.name,
      description: cat.description || '',
      displayOrder: cat.displayOrder,
    })
  }

  // Cancel Editing Category
  const handleCancelEditCategory = () => {
    setEditingCategory(null)
    setCategoryFormData({ name: '', description: '', displayOrder: categories.length + 1 })
  }

  // Submit Category Form (Create or Update)
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryFormData.name.trim()) {
      alert('Vui lòng nhập tên danh mục')
      return
    }

    setActionLoading(true)
    try {
      if (editingCategory) {
        await menuService.updateCategory(editingCategory.id, categoryFormData)
        showToast(`Đã cập nhật danh mục "${categoryFormData.name}" thành công!`)
        setEditingCategory(null)
      } else {
        await menuService.createCategory(categoryFormData)
        showToast(`Đã tạo danh mục "${categoryFormData.name}" thành công!`)
      }
      setCategoryFormData({ name: '', description: '', displayOrder: categories.length + 1 })
      loadData()
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Lỗi khi lưu danh mục')
    } finally {
      setActionLoading(false)
    }
  }

  // Request Delete Category
  const handleRequestDeleteCategory = (cat: Category) => {
    if ((cat.itemCount || 0) > 0) {
      alert(
        `Không thể xóa danh mục "${cat.name}" vì đang có ${cat.itemCount} món ăn.\n\nVui lòng xóa hoặc chuyển các món ăn thuộc danh mục này trước khi thực hiện xóa.`
      )
      return
    }
    setDeleteConfirmTarget({
      type: 'CATEGORY',
      id: cat.id,
      name: cat.name,
    })
  }

  // Confirm Delete
  const handleExecuteDelete = async () => {
    if (!deleteConfirmTarget) return
    setActionLoading(true)
    try {
      if (deleteConfirmTarget.type === 'ITEM') {
        await menuService.deleteMenuItem(deleteConfirmTarget.id)
        showToast(`Đã xóa món "${deleteConfirmTarget.name}"`)
      } else {
        await menuService.deleteCategory(deleteConfirmTarget.id)
        showToast(`Đã xóa danh mục "${deleteConfirmTarget.name}"`)
        if (selectedCategoryId === deleteConfirmTarget.id) {
          setSelectedCategoryId(null)
        }
      }
      setDeleteConfirmTarget(null)
      loadData()
    } catch (err: unknown) {
      alert(err instanceof ApiError ? err.message : 'Không thể xóa mục này')
    } finally {
      setActionLoading(false)
    }
  }

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  return (
    <div className="page-container">
      {/* Toast Notification */}
      {successMessage && (
        <div className="toast-notification">
          <IconCheckCircle size={18} strokeWidth={2} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản Lý Thực Đơn & Món Ăn</h1>
          <p className="page-subtitle">Danh mục phân loại, bảng giá niêm yết và trạng thái tồn kho của món ăn</p>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem' }}>
          {isAdmin && (
            <>
              <Button
                variant="secondary"
                size="md"
                onClick={handleOpenCategoryManager}
                icon={<IconPlus size={16} />}
              >
                Quản lý danh mục
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleOpenCreateItem}
                icon={<IconUtensils size={16} />}
              >
                Thêm món mới
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Categories Tabs Bar */}
      <div className="categories-tab-bar">
        <button
          type="button"
          className={`category-pill ${selectedCategoryId === null ? 'category-pill-active' : ''}`}
          onClick={() => setSelectedCategoryId(null)}
        >
          Tất cả ({categories.reduce((acc, c) => acc + (c.itemCount || 0), 0)})
        </button>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`category-pill-group ${selectedCategoryId === cat.id ? 'active' : ''}`}
          >
            <button
              type="button"
              className={`category-pill ${selectedCategoryId === cat.id ? 'category-pill-active' : ''}`}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              {cat.name} ({cat.itemCount || 0})
            </button>
            {isAdmin && (
              <button
                type="button"
                className="category-pill-remove-btn"
                title={
                  (cat.itemCount || 0) > 0
                    ? `Danh mục có ${cat.itemCount} món ăn (Cần xóa hoặc chuyển món trước)`
                    : `Xóa danh mục "${cat.name}"`
                }
                onClick={(e) => {
                  e.stopPropagation()
                  handleRequestDeleteCategory(cat)
                }}
                aria-label={`Xóa danh mục ${cat.name}`}
              >
                <IconClose size={12} strokeWidth={2.5} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="menu-filter-toolbar">
        <div className="search-input-wrap">
          <IconSearch size={16} className="text-dim" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm món ăn theo tên..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          {searchKeyword && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchKeyword('')}
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <IconClose size={14} />
            </button>
          )}
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Trạng thái bán:</label>
          <select
            id="status-filter"
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="AVAILABLE">Còn bán</option>
            <option value="OUT_OF_STOCK">Hết món</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <LoadingSpinner text="Đang tải danh sách món ăn..." />
      ) : errorMessage ? (
        <div className="alert alert-danger" style={{ marginTop: '1rem' }}>
          <IconAlertCircle size={18} />
          <span>{errorMessage}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            style={{ marginLeft: '1rem' }}
            icon={<IconRefresh size={14} />}
          >
            Thử lại
          </Button>
        </div>
      ) : menuItems.length === 0 ? (
        <EmptyState
          icon={<IconUtensils size={44} strokeWidth={1.5} />}
          title="Không tìm thấy món ăn nào"
          description={
            searchKeyword || selectedCategoryId || statusFilter !== 'ALL'
              ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để xem các món ăn khác.'
              : 'Thực đơn hiện chưa có món ăn nào. Nhấn Thêm món mới để bắt đầu thiết lập thực đơn.'
          }
          action={
            isAdmin
              ? {
                  label: 'Thêm món đầu tiên',
                  onClick: handleOpenCreateItem,
                }
              : undefined
          }
        />
      ) : (
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className={`dish-card ${item.status === 'OUT_OF_STOCK' ? 'dish-out-of-stock' : ''}`}>
              <div className="dish-image-wrap">
                {item.imageUrl ? (
                  <img
                    src={getImageUrl(item.imageUrl)}
                    alt={item.name}
                    className="dish-image"
                    onError={(e) => {
                      ;(e.target as HTMLElement).style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="dish-image-fallback">
                    <IconUtensils size={36} strokeWidth={1.5} />
                  </div>
                )}
                <div className="dish-status-overlay">
                  <Badge variant={item.status === 'AVAILABLE' ? 'success' : 'danger'} dot>
                    {item.status === 'AVAILABLE' ? 'Còn bán' : 'Hết món'}
                  </Badge>
                </div>
              </div>

              <div className="dish-content">
                <div className="dish-category-tag">{item.categoryName}</div>
                <h3 className="dish-name">{item.name}</h3>
                {item.description && <p className="dish-description">{item.description}</p>}
                <div className="dish-price tabular-nums">{formatVND(item.price)}</div>

                <div className="dish-actions">
                  <button
                    type="button"
                    className={`btn-action-status ${item.status === 'AVAILABLE' ? 'btn-status-red' : 'btn-status-green'}`}
                    onClick={() => handleToggleStatus(item)}
                    title={item.status === 'AVAILABLE' ? 'Báo hết món' : 'Báo còn bán'}
                  >
                    {item.status === 'AVAILABLE' ? 'Báo hết món' : 'Mở bán lại'}
                  </button>

                  {isAdmin && (
                    <div className="admin-dish-btns">
                      <button
                        type="button"
                        className="btn-icon-edit"
                        onClick={() => handleOpenEditItem(item)}
                        title="Chỉnh sửa món ăn"
                        aria-label="Chỉnh sửa"
                      >
                        <IconEdit size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon-delete"
                        onClick={() =>
                          setDeleteConfirmTarget({
                            type: 'ITEM',
                            id: item.id,
                            name: item.name,
                          })
                        }
                        title="Xóa món ăn"
                        aria-label="Xóa"
                      >
                        <IconTrash size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Modal (Create / Edit) */}
      <Modal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        title={editingItem ? 'Chỉnh Sửa Món Ăn' : 'Thêm Món Ăn Mới'}
        maxWidth="540px"
      >
        <form onSubmit={handleSaveItem} className="modal-form">
          <div className="form-group">
            <label htmlFor="item-category">Danh mục món ăn *</label>
            <select
              id="item-category"
              className="form-control"
              value={itemFormData.categoryId}
              onChange={(e) => setItemFormData({ ...itemFormData, categoryId: Number(e.target.value) })}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="item-name">Tên món ăn *</label>
            <input
              id="item-name"
              type="text"
              className="form-control"
              placeholder="Ví dụ: Bò Lúc Lắc Khoai Tây"
              value={itemFormData.name}
              onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="item-price">Đơn giá niêm yết (VNĐ) *</label>
            <input
              id="item-price"
              type="number"
              step="1000"
              min="0"
              className="form-control tabular-nums"
              placeholder="Ví dụ: 125000"
              value={itemFormData.price}
              onChange={(e) => setItemFormData({ ...itemFormData, price: Number(e.target.value) })}
              required
            />
          </div>

          <div className="form-group">
            <ImageUploadPicker
              label="Hình ảnh món ăn"
              value={itemFormData.imageUrl}
              onChange={(url) => setItemFormData({ ...itemFormData, imageUrl: url })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="item-desc">Mô tả tóm tắt món ăn</label>
            <textarea
              id="item-desc"
              rows={3}
              className="form-control"
              placeholder="Thành phần, đặc điểm, gợi ý thưởng thức..."
              value={itemFormData.description}
              onChange={(e) => setItemFormData({ ...itemFormData, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="item-status">Trạng thái bán</label>
            <select
              id="item-status"
              className="form-control"
              value={itemFormData.status}
              onChange={(e) => setItemFormData({ ...itemFormData, status: e.target.value as MenuItemStatus })}
            >
              <option value="AVAILABLE">Còn bán (Phục vụ bình thường)</option>
              <option value="OUT_OF_STOCK">Hết món (Tạm ngừng nhận đơn)</option>
            </select>
          </div>

          <div className="modal-actions">
            <Button type="button" variant="secondary" onClick={() => setIsItemModalOpen(false)}>
              Hủy
            </Button>
            <Button type="submit" variant="primary" isLoading={actionLoading}>
              {editingItem ? 'Lưu thay đổi' : 'Tạo món ăn'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Category Manager Modal */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false)
          setEditingCategory(null)
        }}
        title={editingCategory ? 'Chỉnh Sửa Danh Mục' : 'Quản Lý & Thêm Danh Mục'}
        maxWidth="540px"
      >
        <form onSubmit={handleSaveCategory} className="modal-form">
          <div className="form-group">
            <label htmlFor="cat-name">Tên danh mục *</label>
            <input
              id="cat-name"
              type="text"
              className="form-control"
              placeholder="Ví dụ: Món Nướng Than Hoa"
              value={categoryFormData.name}
              onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cat-desc">Mô tả danh mục</label>
            <input
              id="cat-desc"
              type="text"
              className="form-control"
              placeholder="Mô tả nhóm món ăn..."
              value={categoryFormData.description}
              onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            {editingCategory && (
              <Button type="button" variant="secondary" onClick={handleCancelEditCategory}>
                Hủy sửa
              </Button>
            )}
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsCategoryModalOpen(false)
                setEditingCategory(null)
              }}
            >
              Đóng
            </Button>
            <Button type="submit" variant="primary" isLoading={actionLoading}>
              {editingCategory ? 'Lưu thay đổi' : 'Thêm danh mục'}
            </Button>
          </div>
        </form>

        {/* Existing Categories Table/List */}
        <div className="category-manager-section">
          <div className="category-manager-header">
            <span>Danh sách danh mục hiện có ({categories.length})</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-muted)' }}>
              Chỉ xóa được danh mục có 0 món ăn
            </span>
          </div>

          <div className="category-manager-list">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`category-manager-item ${editingCategory?.id === cat.id ? 'editing' : ''}`}
              >
                <div className="category-item-info">
                  <span className="category-item-name" title={cat.name}>
                    {cat.name}
                  </span>
                  <span
                    className={`category-item-badge ${(cat.itemCount || 0) > 0 ? 'has-items' : ''}`}
                  >
                    {cat.itemCount || 0} món
                  </span>
                </div>

                <div className="category-item-actions">
                  <button
                    type="button"
                    className="btn-cat-action"
                    onClick={() => handleStartEditCategory(cat)}
                    title="Chỉnh sửa tên danh mục"
                  >
                    <IconEdit size={13} />
                  </button>
                  <button
                    type="button"
                    className="btn-cat-action btn-cat-delete"
                    onClick={() => handleRequestDeleteCategory(cat)}
                    title={
                      (cat.itemCount || 0) > 0
                        ? `Không thể xóa (Đang có ${cat.itemCount} món)`
                        : `Xóa danh mục "${cat.name}"`
                    }
                  >
                    <IconTrash size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirmTarget}
        onClose={() => setDeleteConfirmTarget(null)}
        title="Xác Nhận Xóa"
        maxWidth="440px"
      >
        <div style={{ lineHeight: 1.6 }}>
          Bạn có chắc chắn muốn xóa {deleteConfirmTarget?.type === 'ITEM' ? 'món ăn' : 'danh mục'}:{' '}
          <strong>"{deleteConfirmTarget?.name}"</strong>?
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            {deleteConfirmTarget?.type === 'CATEGORY'
              ? 'Lưu ý: Chỉ có thể xóa danh mục khi không còn món ăn nào thuộc danh mục này.'
              : 'Thao tác này sẽ xóa món khỏi thực đơn và không thể hoàn tác.'}
          </p>
        </div>

        <div className="modal-actions" style={{ marginTop: '1.5rem' }}>
          <Button variant="secondary" onClick={() => setDeleteConfirmTarget(null)}>
            Hủy
          </Button>
          <Button variant="danger" isLoading={actionLoading} onClick={handleExecuteDelete}>
            Đồng ý xóa
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default MenuPage
