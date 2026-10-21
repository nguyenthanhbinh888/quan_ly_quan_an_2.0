import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { DiningTable, DiningTableRequest, TableStatus } from '../types/table';
import { Order } from '../types/order';
import { MenuItem, Category } from '../types/menu';
import { tableService } from '../services/tableService';
import { orderService } from '../services/orderService';
import { menuService } from '../services/menuService';
import { paymentService } from '../services/paymentService';
import { Payment, PaymentPreview, PaymentMethod } from '../types/payment';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import {
  IconTable,
  IconUsers,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconClose,
  IconEdit,
  IconTrash,
  IconCash,
  IconQr,
  IconPrinter,
  IconCheckCircle,
  IconAlertCircle,
  IconDiscount,
  IconCalendar,
  IconClock,
} from '../components/common/Icons';

export const PosPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  // State bàn ăn
  const [tables, setTables] = useState<DiningTable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | TableStatus>('ALL');

  // State menu & categories phục vụ gọi món
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'ALL'>('ALL');
  const [menuSearch, setMenuSearch] = useState<string>('');

  // State Modal POS Order
  const [activeTable, setActiveTable] = useState<DiningTable | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [orderItemSubmitting, setOrderItemSubmitting] = useState<boolean>(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // State ghi chú món đang thêm
  const [itemNotes, setItemNotes] = useState<Record<number, string>>({});

  // State Modal Bàn (Admin)
  const [tableModalOpen, setTableModalOpen] = useState<boolean>(false);
  const [tableEditing, setTableEditing] = useState<DiningTable | null>(null);
  const [tableForm, setTableForm] = useState<DiningTableRequest>({ code: '', name: '', capacity: 4, status: 'EMPTY' });
  const [tableSubmitting, setTableSubmitting] = useState<boolean>(false);
  const [tableFormError, setTableFormError] = useState<string | null>(null);

  // State Modal Đặt Bàn / Giữ Chỗ
  const [reserveModalOpen, setReserveModalOpen] = useState<boolean>(false);
  const [tableToReserve, setTableToReserve] = useState<DiningTable | null>(null);
  const [reserveSubmitting, setReserveSubmitting] = useState<boolean>(false);

  // State Modal Giảm giá
  const [discountModalOpen, setDiscountModalOpen] = useState<boolean>(false);
  const [discountInput, setDiscountInput] = useState<string>('');
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [discountSubmitting, setDiscountSubmitting] = useState<boolean>(false);

  // State Modal Hủy đơn
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [cancelSubmitting, setCancelSubmitting] = useState<boolean>(false);

  // State Modal Thanh toán & Biên lai
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [paymentPreview, setPaymentPreview] = useState<PaymentPreview | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CASH');
  const [amountPaidInput, setAmountPaidInput] = useState<string>('');
  const [paymentSubmitting, setPaymentSubmitting] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState<boolean>(false);
  const [completedPayment, setCompletedPayment] = useState<Payment | null>(null);

  // Load danh sách bàn và thực đơn
  const loadTables = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tableService.getAllTables();
      setTables(data);
    } catch (err: any) {
      setError(err?.message || 'Không thể tải danh sách bàn ăn');
    } finally {
      setLoading(false);
    }
  };

  const loadMenuData = async () => {
    try {
      const [cats, items] = await Promise.all([
        menuService.getCategories(),
        menuService.getMenuItems(),
      ]);
      setCategories(cats);
      setMenuItems(items);
    } catch (err: any) {
      console.error('Lỗi tải thực đơn POS:', err);
    }
  };

  useEffect(() => {
    loadTables();
    loadMenuData();
  }, []);

  // Format tiền tệ VND
  const formatCurrency = (val: number | null | undefined): string => {
    if (val == null) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  // Thống kê nhanh
  const stats = useMemo(() => {
    return {
      total: tables.length,
      empty: tables.filter(t => t.status === 'EMPTY').length,
      occupied: tables.filter(t => t.status === 'OCCUPIED').length,
      reserved: tables.filter(t => t.status === 'RESERVED').length,
    };
  }, [tables]);

  // Lọc bàn hiển thị
  const filteredTables = useMemo(() => {
    if (statusFilter === 'ALL') return tables;
    return tables.filter(t => t.status === statusFilter);
  }, [tables, statusFilter]);

  // Lọc thực đơn bên trong POS
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchCategory = selectedCategoryId === 'ALL' || item.categoryId === selectedCategoryId;
      const matchSearch = !menuSearch || item.name.toLowerCase().includes(menuSearch.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [menuItems, selectedCategoryId, menuSearch]);

  // Xử lý mở bàn & xem đơn
  const handleOpenTableOrder = async (table: DiningTable) => {
    setActiveTable(table);
    setOrderModalOpen(true);
    setOrderLoading(true);
    setOrderError(null);

    try {
      if (table.status === 'EMPTY' || table.status === 'RESERVED') {
        const newOrder = await orderService.createOrder({
          tableId: table.id,
          orderType: 'DINE_IN',
          note: `Khách ngồi ${table.name}`,
        });
        setActiveOrder(newOrder);
        loadTables();
      } else {
        const currentOrder = await orderService.getActiveOrderByTableId(table.id);
        setActiveOrder(currentOrder);
      }
    } catch (err: any) {
      setOrderError(err?.message || 'Không thể mở đơn hàng cho bàn này');
    } finally {
      setOrderLoading(false);
    }
  };

  // Thêm món vào đơn
  const handleAddItemToOrder = async (item: MenuItem) => {
    if (!activeOrder) return;
    try {
      setOrderItemSubmitting(true);
      setOrderError(null);
      const note = itemNotes[item.id] || '';
      const updated = await orderService.addOrderItem(activeOrder.id, {
        menuItemId: item.id,
        quantity: 1,
        note: note.trim() ? note.trim() : undefined,
      });
      setActiveOrder(updated);
      setItemNotes(prev => ({ ...prev, [item.id]: '' }));
      loadTables();
    } catch (err: any) {
      setOrderError(err?.message || 'Không thể thêm món vào đơn');
    } finally {
      setOrderItemSubmitting(false);
    }
  };

  // Tăng/giảm số lượng
  const handleUpdateItemQuantity = async (orderItem: any, delta: number) => {
    if (!activeOrder) return;
    const newQty = orderItem.quantity + delta;
    if (newQty <= 0) {
      handleRemoveItem(orderItem.id);
      return;
    }
    try {
      setOrderItemSubmitting(true);
      setOrderError(null);
      const updated = await orderService.updateOrderItem(activeOrder.id, orderItem.id, {
        quantity: newQty,
        note: orderItem.note,
        status: orderItem.status,
      });
      setActiveOrder(updated);
      loadTables();
    } catch (err: any) {
      setOrderError(err?.message || 'Không thể cập nhật số lượng món');
    } finally {
      setOrderItemSubmitting(false);
    }
  };

  // Xóa món
  const handleRemoveItem = async (orderItemId: number) => {
    if (!activeOrder) return;
    try {
      setOrderItemSubmitting(true);
      setOrderError(null);
      const updated = await orderService.removeOrderItem(activeOrder.id, orderItemId);
      setActiveOrder(updated);
      loadTables();
    } catch (err: any) {
      setOrderError(err?.message || 'Không thể xóa món khỏi đơn');
    } finally {
      setOrderItemSubmitting(false);
    }
  };

  // Giảm giá
  const handleApplyDiscountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) return;
    const val = parseFloat(discountInput) || 0;
    if (val < 0) {
      setDiscountError('Số tiền giảm giá không được âm');
      return;
    }
    if (val > activeOrder.subtotalAmount) {
      setDiscountError(`Số tiền giảm giá không được vượt quá tiền món (${formatCurrency(activeOrder.subtotalAmount)})`);
      return;
    }
    try {
      setDiscountSubmitting(true);
      setDiscountError(null);
      const updated = await orderService.applyDiscount(activeOrder.id, { discountAmount: val });
      setActiveOrder(updated);
      setDiscountModalOpen(false);
      loadTables();
    } catch (err: any) {
      setDiscountError(err?.message || 'Không thể áp dụng giảm giá');
    } finally {
      setDiscountSubmitting(false);
    }
  };

  // Hủy đơn
  const handleCancelOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) return;
    if (!cancelReason.trim()) {
      setCancelError('Vui lòng nhập lý do hủy đơn hàng');
      return;
    }
    try {
      setCancelSubmitting(true);
      setCancelError(null);
      await orderService.cancelOrder(activeOrder.id, { cancelReason: cancelReason.trim() });
      setCancelModalOpen(false);
      setOrderModalOpen(false);
      setActiveOrder(null);
      setActiveTable(null);
      loadTables();
    } catch (err: any) {
      setCancelError(err?.message || 'Không thể hủy đơn hàng');
    } finally {
      setCancelSubmitting(false);
    }
  };

  // Quản lý bàn ăn (Admin)
  const handleOpenAddTable = () => {
    setTableEditing(null);
    setTableForm({ code: '', name: '', capacity: 4, status: 'EMPTY' });
    setTableFormError(null);
    setTableModalOpen(true);
  };

  const handleOpenEditTable = (table: DiningTable, e: React.MouseEvent) => {
    e.stopPropagation();
    setTableEditing(table);
    setTableForm({
      code: table.code,
      name: table.name,
      capacity: table.capacity,
      status: table.status,
    });
    setTableFormError(null);
    setTableModalOpen(true);
  };

  const handleDeleteTable = async (table: DiningTable, e: React.MouseEvent) => {
    e.stopPropagation();
    if (table.status !== 'EMPTY') {
      alert('Chỉ có thể xóa bàn khi đang ở trạng thái Trống');
      return;
    }
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bàn "${table.name}" (${table.code}) không?`)) {
      return;
    }
    try {
      await tableService.deleteTable(table.id);
      loadTables();
    } catch (err: any) {
      alert(err?.message || 'Lỗi khi xóa bàn');
    }
  };

  // Đặt bàn / Giữ chỗ
  const handlePromptReserveTable = (table: DiningTable, e: React.MouseEvent) => {
    e.stopPropagation();
    setTableToReserve(table);
    setReserveModalOpen(true);
  };

  const handleConfirmReserveTable = async () => {
    if (!tableToReserve) return;
    try {
      setReserveSubmitting(true);
      await tableService.updateTableStatus(tableToReserve.id, 'RESERVED');
      setReserveModalOpen(false);
      setTableToReserve(null);
      loadTables();
    } catch (err: any) {
      alert(err?.message || 'Lỗi khi đặt bàn');
    } finally {
      setReserveSubmitting(false);
    }
  };

  // Hủy giữ chỗ bàn
  const handleCancelReservation = async (table: DiningTable, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Bạn có chắc chắn muốn hủy đặt bàn cho ${table.name} (${table.code}) và trả về bàn Trống không?`)) {
      return;
    }
    try {
      await tableService.updateTableStatus(table.id, 'EMPTY');
      loadTables();
    } catch (err: any) {
      alert(err?.message || 'Lỗi khi hủy đặt bàn');
    }
  };

  const handleTableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableForm.code.trim()) {
      setTableFormError('Mã bàn không được để trống');
      return;
    }
    if (!tableForm.name.trim()) {
      setTableFormError('Tên bàn không được để trống');
      return;
    }
    if (!tableForm.capacity || tableForm.capacity < 1) {
      setTableFormError('Sức chứa tối thiểu là 1 người');
      return;
    }

    try {
      setTableSubmitting(true);
      setTableFormError(null);
      if (tableEditing) {
        await tableService.updateTable(tableEditing.id, tableForm);
      } else {
        await tableService.createTable(tableForm);
      }
      setTableModalOpen(false);
      loadTables();
    } catch (err: any) {
      setTableFormError(err?.message || 'Lỗi lưu thông tin bàn');
    } finally {
      setTableSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      {/* Header Toolbar */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Sơ Đồ Bàn Ăn & Gọi Món (POS)</h1>
          <p className="page-subtitle">
            Giám sát trạng thái bàn ăn, thao tác gọi món tốc độ cao và xử lý thanh toán quầy thu ngân
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <Button
            variant="secondary"
            size="md"
            onClick={loadTables}
            icon={<IconRefresh size={16} />}
          >
            Làm mới
          </Button>
          {isAdmin && (
            <Button
              variant="primary"
              size="md"
              onClick={handleOpenAddTable}
              icon={<IconPlus size={16} />}
            >
              Thêm bàn mới
            </Button>
          )}
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="stat-cards-grid">
        <div className="stat-card">
          <div className="stat-icon blue-bg">
            <IconTable size={22} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Tổng số bàn</span>
            <span className="stat-value tabular-nums">{stats.total} bàn</span>
            <span className="stat-hint">Quy mô phục vụ quầy</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green-bg">
            <IconCheckCircle size={22} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Bàn sẵn sàng</span>
            <span className="stat-value tabular-nums" style={{ color: 'var(--status-empty)' }}>
              {stats.empty} bàn
            </span>
            <span className="stat-hint">Sẵn sàng nhận khách mới</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange-bg">
            <IconUsers size={22} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Đang phục vụ</span>
            <span className="stat-value tabular-nums" style={{ color: 'var(--status-occupied)' }}>
              {stats.occupied} bàn
            </span>
            <span className="stat-hint">Có khách đang dùng bữa</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple-bg">
            <IconDiscount size={22} strokeWidth={2} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Đã đặt trước</span>
            <span className="stat-value tabular-nums" style={{ color: 'var(--status-reserved)' }}>
              {stats.reserved} bàn
            </span>
            <span className="stat-hint">Giữ chỗ trước giờ đón</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="categories-tab-bar">
        <button
          type="button"
          className={`category-pill ${statusFilter === 'ALL' ? 'category-pill-active' : ''}`}
          onClick={() => setStatusFilter('ALL')}
        >
          Tất cả bàn ({tables.length})
        </button>
        <button
          type="button"
          className={`category-pill ${statusFilter === 'EMPTY' ? 'category-pill-active' : ''}`}
          onClick={() => setStatusFilter('EMPTY')}
        >
          Bàn trống ({stats.empty})
        </button>
        <button
          type="button"
          className={`category-pill ${statusFilter === 'OCCUPIED' ? 'category-pill-active' : ''}`}
          onClick={() => setStatusFilter('OCCUPIED')}
        >
          Đang phục vụ ({stats.occupied})
        </button>
        <button
          type="button"
          className={`category-pill ${statusFilter === 'RESERVED' ? 'category-pill-active' : ''}`}
          onClick={() => setStatusFilter('RESERVED')}
        >
          Đã đặt trước ({stats.reserved})
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="alert alert-danger">
          <IconAlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <LoadingSpinner text="Đang tải sơ đồ bàn ăn..." />
      ) : filteredTables.length === 0 ? (
        <EmptyState
          icon={<IconTable size={44} strokeWidth={1.5} />}
          title="Không tìm thấy bàn nào"
          description={statusFilter === 'ALL' ? 'Chưa có dữ liệu bàn ăn.' : 'Không có bàn nào phù hợp với bộ lọc đã chọn.'}
        />
      ) : (
        /* Table Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {filteredTables.map(table => {
            const isOccupied = table.status === 'OCCUPIED';
            const isReserved = table.status === 'RESERVED';

            return (
              <div
                key={table.id}
                className="card"
                onClick={() => handleOpenTableOrder(table)}
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '190px',
                  borderColor: isOccupied ? 'var(--status-occupied-border)' : isReserved ? 'var(--status-reserved-border)' : 'var(--border-subtle)',
                  background: isOccupied ? 'var(--status-occupied-bg)' : isReserved ? 'var(--status-reserved-bg)' : '#ffffff',
                  boxShadow: isOccupied ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
                  transition: 'transform 0.15s ease, border-color 0.15s ease',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '1rem',
                          fontWeight: 800,
                          color: 'var(--text-main)',
                          background: isOccupied ? '#ffffff' : 'var(--bg-surface-subtle)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {table.code}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <IconUsers size={14} />
                        <span>{table.capacity} chỗ</span>
                      </span>
                    </div>

                    <Badge variant={isOccupied ? 'warning' : isReserved ? 'info' : 'success'} dot>
                      {isOccupied ? 'Đang dùng' : isReserved ? 'Đã đặt' : 'Trống'}
                    </Badge>
                  </div>

                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {table.name}
                  </h3>

                  {isOccupied && (
                    <div
                      style={{
                        background: '#ffffff',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--status-occupied-border)',
                        marginTop: '0.5rem',
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: 'var(--status-occupied)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {table.currentOrderCode || 'ĐƠN HOẠT ĐỘNG'}
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.1rem' }} className="tabular-nums">
                        {formatCurrency(table.currentOrderTotal)}
                      </div>
                    </div>
                  )}

                  {isReserved && (
                    <div
                      style={{
                        background: '#fffbeb',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--status-reserved-border)',
                        marginTop: '0.5rem',
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: 'var(--status-reserved)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <IconClock size={13} />
                        <span>ĐÃ ĐẶT TRƯỚC / GIỮ CHỖ</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        Đang giữ chỗ trước giờ đón khách
                      </div>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '0.75rem',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '0.4rem', flex: 1, flexWrap: 'wrap' }}>
                    {isOccupied ? (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          handleOpenTableOrder(table);
                        }}
                      >
                        Xem & Gọi món
                      </Button>
                    ) : isReserved ? (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            handleOpenTableOrder(table);
                          }}
                        >
                          Nhận bàn
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCancelReservation(table, e)}
                        >
                          Hủy giữ
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.stopPropagation();
                            handleOpenTableOrder(table);
                          }}
                        >
                          Mở bàn
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => handlePromptReserveTable(table, e)}
                          icon={<IconCalendar size={13} />}
                        >
                          Đặt bàn
                        </Button>
                      </>
                    )}
                  </div>

                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <button
                        type="button"
                        title="Sửa thông tin bàn"
                        onClick={(e) => handleOpenEditTable(table, e)}
                        className="btn-icon-edit"
                        aria-label="Sửa bàn"
                      >
                        <IconEdit size={14} />
                      </button>
                      {table.status === 'EMPTY' && (
                        <button
                          type="button"
                          title="Xóa bàn"
                          onClick={(e) => handleDeleteTable(table, e)}
                          className="btn-icon-delete"
                          aria-label="Xóa bàn"
                        >
                          <IconTrash size={14} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL POS GỌI MÓN (Order & Menu Split Interface)           */}
      {/* ========================================================= */}
      {orderModalOpen && activeTable && (
        <Modal
          isOpen={orderModalOpen}
          onClose={() => {
            if (!orderItemSubmitting) {
              setOrderModalOpen(false);
              loadTables();
            }
          }}
          title={`Bàn ${activeTable.name} (${activeTable.code}) — Bàn Điều Khiển Gọi Món`}
          maxWidth="1020px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '78vh' }}>
            {orderError && (
              <div className="alert alert-danger" style={{ marginBottom: '0.75rem' }}>
                <IconAlertCircle size={16} />
                <span>{orderError}</span>
              </div>
            )}

            {orderLoading ? (
              <div style={{ padding: '2.5rem', textAlign: 'center' }}>
                <LoadingSpinner text="Đang tải dữ liệu đơn hàng..." />
              </div>
            ) : !activeOrder ? (
              <EmptyState title="Không có đơn hàng hoạt động" description="Không thể tìm thấy hoặc khởi tạo đơn hàng cho bàn này." />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '1.25rem', overflow: 'hidden' }}>
                {/* CỘT TRÁI: THỰC ĐƠN CHỌN MÓN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflow: 'hidden' }}>
                  <div className="search-input-wrap">
                    <IconSearch size={16} className="text-dim" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Tìm kiếm món ăn theo tên..."
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                    />
                    {menuSearch && (
                      <button
                        type="button"
                        className="search-clear-btn"
                        onClick={() => setMenuSearch('')}
                      >
                        <IconClose size={14} />
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  <div className="categories-tab-bar" style={{ paddingBottom: '0.2rem' }}>
                    <button
                      type="button"
                      className={`category-pill ${selectedCategoryId === 'ALL' ? 'category-pill-active' : ''}`}
                      onClick={() => setSelectedCategoryId('ALL')}
                    >
                      Tất cả
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        className={`category-pill ${selectedCategoryId === cat.id ? 'category-pill-active' : ''}`}
                        onClick={() => setSelectedCategoryId(cat.id)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Danh sách món ăn có thể gọi */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem', paddingRight: '0.25rem', maxHeight: '420px' }}>
                    {filteredMenuItems.map(item => {
                      const isAvailable = item.status === 'AVAILABLE';
                      return (
                        <div
                          key={item.id}
                          className="card"
                          style={{
                            padding: '0.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            opacity: isAvailable ? 1 : 0.6,
                            background: isAvailable ? '#ffffff' : 'var(--bg-surface-subtle)',
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                              {item.name}
                            </div>
                            <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.88rem', marginBottom: '0.5rem' }} className="tabular-nums">
                              {formatCurrency(item.price)}
                            </div>
                          </div>

                          {isAvailable ? (
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Ghi chú (ít ngọt, không cay...)"
                                value={itemNotes[item.id] || ''}
                                onChange={(e) => setItemNotes({ ...itemNotes, [item.id]: e.target.value })}
                                style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem', marginBottom: '0.4rem' }}
                              />
                              <Button
                                variant="primary"
                                size="sm"
                                disabled={orderItemSubmitting}
                                onClick={() => handleAddItemToOrder(item)}
                                style={{ width: '100%', fontSize: '0.8rem' }}
                                icon={<IconPlus size={14} />}
                              >
                                Thêm vào đơn
                              </Button>
                            </div>
                          ) : (
                            <div style={{ textAlign: 'center', padding: '0.35rem', background: 'var(--danger-bg)', color: '#b91c1c', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: 700 }}>
                              HẾT MÓN
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CỘT PHẢI: CHI TIẾT ĐƠN HÀNG ĐANG PHỤC VỤ */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--bg-canvas)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-subtle)',
                    padding: '1rem',
                    overflow: 'hidden',
                  }}
                >
                  {/* Order Meta Header */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '0.65rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700 }}>MÃ ĐƠN HÀNG</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)' }} className="tabular-nums">
                        {activeOrder.orderCode}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700 }}>PHỤC VỤ</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {activeOrder.createdByName || user?.fullName}
                      </div>
                    </div>
                  </div>

                  {/* List of ordered items */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '0.25rem', maxHeight: '250px' }}>
                    {activeOrder.items.length === 0 ? (
                      <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
                        <p style={{ fontWeight: 600 }}>Chưa có món nào trong đơn.</p>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Nhấn vào món bên trái để thêm gọi món.</span>
                      </div>
                    ) : (
                      activeOrder.items.map(item => (
                        <div
                          key={item.id}
                          style={{
                            background: '#ffffff',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-subtle)',
                            padding: '0.6rem 0.75rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.itemName}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }} className="tabular-nums">
                              {formatCurrency(item.priceAtOrder)}
                              {item.note && <span style={{ color: 'var(--status-occupied)', marginLeft: '0.35rem' }}>({item.note})</span>}
                            </div>
                          </div>

                          {/* Quantity control */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <button
                              type="button"
                              disabled={orderItemSubmitting}
                              onClick={() => handleUpdateItemQuantity(item, -1)}
                              className="btn btn-secondary btn-sm"
                              style={{ width: '24px', height: '24px', padding: 0 }}
                              aria-label="Giảm"
                            >
                              -
                            </button>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800, minWidth: '20px', textAlign: 'center', color: 'var(--text-main)' }} className="tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              disabled={orderItemSubmitting}
                              onClick={() => handleUpdateItemQuantity(item, 1)}
                              className="btn btn-secondary btn-sm"
                              style={{ width: '24px', height: '24px', padding: 0 }}
                              aria-label="Tăng"
                            >
                              +
                            </button>
                          </div>

                          {/* Line subtotal */}
                          <div style={{ minWidth: '75px', textAlign: 'right', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)' }} className="tabular-nums">
                            {formatCurrency(item.subtotal)}
                          </div>

                          {/* Delete item */}
                          <button
                            type="button"
                            title="Xóa món"
                            disabled={orderItemSubmitting}
                            onClick={() => handleRemoveItem(item.id)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '0.2rem' }}
                            aria-label="Xóa món"
                          >
                            <IconClose size={15} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Financial Summary */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      <span>Tiền món (Tạm tính):</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)' }} className="tabular-nums">{formatCurrency(activeOrder.subtotalAmount)}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      <span>
                        Giảm giá:
                        <button
                          type="button"
                          onClick={() => {
                            setDiscountInput(activeOrder.discountAmount ? activeOrder.discountAmount.toString() : '');
                            setDiscountError(null);
                            setDiscountModalOpen(true);
                          }}
                          style={{ marginLeft: '0.5rem', background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.78rem', fontWeight: 600 }}
                        >
                          {activeOrder.discountAmount > 0 ? 'Sửa' : '+ Thêm'}
                        </button>
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--status-empty)' }} className="tabular-nums">-{formatCurrency(activeOrder.discountAmount)}</span>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: 'var(--text-main)',
                        borderTop: '1px dashed var(--border-strong)',
                        paddingTop: '0.5rem',
                      }}
                    >
                      <span>Tổng thanh toán:</span>
                      <span style={{ color: 'var(--primary)' }} className="tabular-nums">{formatCurrency(activeOrder.finalAmount)}</span>
                    </div>
                  </div>

                  {/* Order Footer Actions */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <Button
                      variant="danger"
                      size="sm"
                      disabled={orderItemSubmitting || paymentSubmitting}
                      onClick={() => {
                        setCancelReason('');
                        setCancelError(null);
                        setCancelModalOpen(true);
                      }}
                      style={{ flex: 1 }}
                    >
                      Hủy đơn
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={orderItemSubmitting || paymentSubmitting}
                      onClick={() => {
                        setOrderModalOpen(false);
                        loadTables();
                      }}
                      style={{ flex: 1 }}
                    >
                      Đóng
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                      disabled={orderItemSubmitting || paymentSubmitting || activeOrder.items.length === 0}
                      onClick={async () => {
                        try {
                          setPaymentSubmitting(true);
                          setPaymentError(null);
                          const preview = await paymentService.getPaymentPreview(activeOrder.id);
                          setPaymentPreview(preview);
                          setPaymentMethod('CASH');
                          setAmountPaidInput(preview.finalAmount.toString());
                          setPaymentModalOpen(true);
                        } catch (err: any) {
                          alert(err?.message || 'Không thể mở thanh toán');
                        } finally {
                          setPaymentSubmitting(false);
                        }
                      }}
                      style={{ flex: 2, background: 'var(--status-empty)', borderColor: 'var(--status-empty)' }}
                      icon={<IconCash size={16} />}
                    >
                      Thanh toán
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL THÊM / SỬA BÀN ĂN (ADMIN)                           */}
      {/* ========================================================= */}
      {tableModalOpen && (
        <Modal
          isOpen={tableModalOpen}
          onClose={() => setTableModalOpen(false)}
          title={tableEditing ? `Chỉnh sửa bàn: ${tableEditing.code}` : 'Thêm bàn ăn mới'}
          maxWidth="440px"
        >
          <form onSubmit={handleTableSubmit} className="modal-form">
            {tableFormError && (
              <div className="alert alert-danger">
                <IconAlertCircle size={16} />
                <span>{tableFormError}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="table-code">Mã bàn * (Ví dụ: B11, VIP02)</label>
              <input
                id="table-code"
                type="text"
                className="form-control"
                value={tableForm.code}
                onChange={(e) => setTableForm({ ...tableForm, code: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="table-name">Tên hiển thị * (Ví dụ: Bàn 11 - Tầng 2)</label>
              <input
                id="table-name"
                type="text"
                className="form-control"
                value={tableForm.name}
                onChange={(e) => setTableForm({ ...tableForm, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="table-capacity">Sức chứa / Số ghế *</label>
              <input
                id="table-capacity"
                type="number"
                min="1"
                max="50"
                className="form-control tabular-nums"
                value={tableForm.capacity}
                onChange={(e) => setTableForm({ ...tableForm, capacity: parseInt(e.target.value, 10) || 1 })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="table-status">Trạng thái bàn</label>
              <select
                id="table-status"
                className="form-control"
                value={tableForm.status || 'EMPTY'}
                onChange={(e) => setTableForm({ ...tableForm, status: e.target.value as TableStatus })}
              >
                <option value="EMPTY">Trống (Sẵn sàng phục vụ)</option>
                <option value="RESERVED">Đã đặt trước (Giữ chỗ)</option>
                <option value="OCCUPIED">Đang phục vụ (Có khách)</option>
              </select>
            </div>

            <div className="modal-actions">
              <Button variant="secondary" type="button" onClick={() => setTableModalOpen(false)}>
                Hủy bỏ
              </Button>
              <Button variant="primary" type="submit" disabled={tableSubmitting}>
                {tableSubmitting ? 'Đang lưu...' : 'Lưu bàn ăn'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL XÁC NHẬN ĐẶT BÀN / GIỮ CHỖ                          */}
      {/* ========================================================= */}
      {reserveModalOpen && tableToReserve && (
        <Modal
          isOpen={reserveModalOpen}
          onClose={() => setReserveModalOpen(false)}
          title={`Đặt Trước / Giữ Chỗ Bàn — ${tableToReserve.code}`}
          maxWidth="440px"
        >
          <div style={{ lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 1rem 0', color: 'var(--text-main)', fontSize: '0.9rem' }}>
              Bạn đang chuyển bàn <strong>{tableToReserve.name} ({tableToReserve.code})</strong> sang trạng thái <strong>Đã đặt trước (RESERVED)</strong> để giữ chỗ cho khách.
            </p>

            <div
              style={{
                background: 'var(--status-reserved-bg)',
                border: '1px solid var(--status-reserved-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                marginBottom: '1.25rem',
                fontSize: '0.825rem',
                color: 'var(--status-reserved)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
                <IconCalendar size={15} />
                <span>Quy mô: {tableToReserve.capacity} chỗ ngồi</span>
              </div>
              <p style={{ margin: '0.35rem 0 0 0', color: 'var(--text-main)', fontSize: '0.8rem' }}>
                Khi khách đến nhận bàn, nhấn nút <strong>"Nhận bàn"</strong> để mở đơn và gọi món phục vụ ngay.
              </p>
            </div>

            <div className="modal-actions">
              <Button variant="secondary" type="button" onClick={() => setReserveModalOpen(false)}>
                Hủy bỏ
              </Button>
              <Button
                variant="primary"
                type="button"
                isLoading={reserveSubmitting}
                onClick={handleConfirmReserveTable}
                icon={<IconCheckCircle size={16} />}
              >
                Xác nhận đặt bàn
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL ÁP DỤNG GIẢM GIÁ                                    */}
      {/* ========================================================= */}
      {discountModalOpen && (
        <Modal
          isOpen={discountModalOpen}
          onClose={() => setDiscountModalOpen(false)}
          title="Áp Dụng Giảm Giá Cho Đơn Hàng"
          maxWidth="400px"
        >
          <form onSubmit={handleApplyDiscountSubmit} className="modal-form">
            {discountError && (
              <div className="alert alert-danger">
                <IconAlertCircle size={16} />
                <span>{discountError}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="discount-amount">Số tiền giảm giá (VNĐ)</label>
              <input
                id="discount-amount"
                type="number"
                min="0"
                step="1000"
                placeholder="Nhập số tiền giảm (vd: 20000)"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
                autoFocus
                required
                className="form-control tabular-nums"
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                Tối đa: {formatCurrency(activeOrder?.subtotalAmount)}
              </span>
            </div>

            <div className="modal-actions">
              <Button variant="secondary" type="button" onClick={() => setDiscountModalOpen(false)}>
                Hủy
              </Button>
              <Button variant="primary" type="submit" disabled={discountSubmitting}>
                {discountSubmitting ? 'Đang lưu...' : 'Xác nhận giảm giá'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL XÁC NHẬN HỦY ĐƠN                                    */}
      {/* ========================================================= */}
      {cancelModalOpen && (
        <Modal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          title="Xác Nhận Hủy Đơn Hàng"
          maxWidth="420px"
        >
          <form onSubmit={handleCancelOrderSubmit} className="modal-form">
            {cancelError && (
              <div className="alert alert-danger">
                <IconAlertCircle size={16} />
                <span>{cancelError}</span>
              </div>
            )}

            <p style={{ color: 'var(--text-main)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              Bạn có chắc chắn muốn hủy đơn hàng <strong>{activeOrder?.orderCode}</strong> tại <strong>{activeTable?.name}</strong>? Bàn ăn sẽ được giải phóng về trạng thái Trống.
            </p>

            <div className="form-group">
              <label htmlFor="cancel-reason">Lý do hủy đơn *</label>
              <textarea
                id="cancel-reason"
                className="form-control"
                rows={3}
                placeholder="Ví dụ: Khách đổi ý, bàn chuyển chỗ..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                required
              />
            </div>

            <div className="modal-actions">
              <Button variant="secondary" type="button" onClick={() => setCancelModalOpen(false)}>
                Không hủy
              </Button>
              <Button variant="danger" type="submit" disabled={cancelSubmitting}>
                {cancelSubmitting ? 'Đang hủy...' : 'Đồng ý hủy đơn'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL THANH TOÁN (CASH & QR TRANSFER)                     */}
      {/* ========================================================= */}
      {paymentModalOpen && paymentPreview && (
        <Modal
          isOpen={paymentModalOpen}
          onClose={() => {
            if (!paymentSubmitting) setPaymentModalOpen(false);
          }}
          title={`Thanh Toán — ${paymentPreview.orderCode} (${paymentPreview.tableName})`}
          maxWidth="480px"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const paidVal = paymentMethod === 'BANK_TRANSFER' ? paymentPreview.finalAmount : parseFloat(amountPaidInput);
              if (isNaN(paidVal) || paidVal < paymentPreview.finalAmount) {
                setPaymentError(`Số tiền thanh toán phải tối thiểu là ${formatCurrency(paymentPreview.finalAmount)}`);
                return;
              }
              try {
                setPaymentSubmitting(true);
                setPaymentError(null);
                const payment = await paymentService.processPayment({
                  orderId: paymentPreview.orderId,
                  paymentMethod,
                  amountPaid: paidVal,
                });
                setCompletedPayment(payment);
                setPaymentModalOpen(false);
                setOrderModalOpen(false);
                setActiveOrder(null);
                setActiveTable(null);
                setReceiptModalOpen(true);
                loadTables();
              } catch (err: any) {
                setPaymentError(err?.message || 'Thanh toán thất bại');
              } finally {
                setPaymentSubmitting(false);
              }
            }}
            className="modal-form"
          >
            {paymentError && (
              <div className="alert alert-danger">
                <IconAlertCircle size={16} />
                <span>{paymentError}</span>
              </div>
            )}

            {/* Bill Preview Total */}
            <div
              style={{
                background: 'var(--bg-canvas)',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                <span>Tiền món:</span>
                <span className="tabular-nums">{formatCurrency(paymentPreview.subtotalAmount)}</span>
              </div>
              {paymentPreview.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--status-empty)', marginBottom: '0.25rem' }}>
                  <span>Giảm giá:</span>
                  <span className="tabular-nums">-{formatCurrency(paymentPreview.discountAmount)}</span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.5rem',
                  marginTop: '0.35rem',
                }}
              >
                <span>Cần thanh toán:</span>
                <span style={{ color: 'var(--primary)' }} className="tabular-nums">
                  {formatCurrency(paymentPreview.finalAmount)}
                </span>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div className="form-group">
              <label>Hình thức thanh toán *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CASH')}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'CASH' ? '2px solid var(--status-empty)' : '1px solid var(--border-strong)',
                    background: paymentMethod === 'CASH' ? 'var(--status-empty-bg)' : '#ffffff',
                    color: paymentMethod === 'CASH' ? 'var(--status-empty)' : 'var(--text-main)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    fontSize: '0.88rem',
                  }}
                >
                  <IconCash size={18} />
                  <span>Tiền mặt</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('BANK_TRANSFER');
                    setAmountPaidInput(paymentPreview.finalAmount.toString());
                  }}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: paymentMethod === 'BANK_TRANSFER' ? '2px solid var(--info)' : '1px solid var(--border-strong)',
                    background: paymentMethod === 'BANK_TRANSFER' ? 'var(--info-bg)' : '#ffffff',
                    color: paymentMethod === 'BANK_TRANSFER' ? 'var(--info)' : 'var(--text-main)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    fontSize: '0.88rem',
                  }}
                >
                  <IconQr size={18} />
                  <span>Chuyển khoản QR</span>
                </button>
              </div>
            </div>

            {/* Khối tiền mặt */}
            {paymentMethod === 'CASH' ? (
              <div className="form-group">
                <label htmlFor="amount-paid">Tiền khách đưa (VNĐ) *</label>
                <input
                  id="amount-paid"
                  type="number"
                  min={paymentPreview.finalAmount}
                  step="1000"
                  className="form-control tabular-nums"
                  value={amountPaidInput}
                  onChange={(e) => setAmountPaidInput(e.target.value)}
                  required
                  style={{ fontSize: '1.05rem', fontWeight: 700 }}
                />

                {/* Quick Cash Buttons */}
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                  <button
                    type="button"
                    className="quick-btn"
                    onClick={() => setAmountPaidInput(paymentPreview.finalAmount.toString())}
                  >
                    Đủ tiền
                  </button>
                  {[50000, 100000, 200000, 500000].map(val => (
                    <button
                      key={val}
                      type="button"
                      className="quick-btn tabular-nums"
                      onClick={() => setAmountPaidInput(val.toString())}
                    >
                      {formatCurrency(val)}
                    </button>
                  ))}
                </div>

                {/* Tiền thừa tính tự động */}
                <div
                  style={{
                    marginTop: '0.65rem',
                    background: 'var(--bg-canvas)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tiền thừa trả lại:</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--status-empty)' }} className="tabular-nums">
                    {formatCurrency(Math.max(0, (parseFloat(amountPaidInput) || 0) - paymentPreview.finalAmount))}
                  </span>
                </div>
              </div>
            ) : (
              /* Khối chuyển khoản QR */
              <div
                style={{
                  textAlign: 'center',
                  background: 'var(--bg-canvas)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  Quét mã QR qua ứng dụng ngân hàng:
                </div>
                <div
                  style={{
                    width: '130px',
                    height: '130px',
                    margin: '0 auto 0.65rem',
                    background: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=REST_PAY_${paymentPreview.orderCode}_${paymentPreview.finalAmount}`}
                    alt="VietQR Payment"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: 700 }}>
                  Ngân hàng: MB Bank • STK: 8888.9999.6868
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.15rem' }}>
                  Nội dung CK: <strong className="tabular-nums">{paymentPreview.orderCode}</strong>
                </div>
              </div>
            )}

            <div className="modal-actions">
              <Button variant="secondary" type="button" onClick={() => setPaymentModalOpen(false)}>
                Hủy bỏ
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={paymentSubmitting}
                style={{ background: 'var(--status-empty)', borderColor: 'var(--status-empty)' }}
                icon={<IconCheckCircle size={16} />}
              >
                {paymentSubmitting ? 'Đang ghi nhận...' : 'Xác nhận thu tiền'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL BIÊN LAI / HÓA ĐƠN HOÀN TẤT                         */}
      {/* ========================================================= */}
      {receiptModalOpen && completedPayment && (
        <Modal
          isOpen={receiptModalOpen}
          onClose={() => setReceiptModalOpen(false)}
          title={`Hóa Đơn Bán Hàng — ${completedPayment.invoiceCode}`}
          maxWidth="440px"
        >
          <div
            style={{
              background: '#ffffff',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-main)',
            }}
          >
            <div style={{ textAlign: 'center', borderBottom: '1px dashed var(--border-strong)', paddingBottom: '0.85rem', marginBottom: '0.85rem' }}>
              <div style={{ color: 'var(--status-empty)', marginBottom: '0.35rem' }}>
                <IconCheckCircle size={32} strokeWidth={2} />
              </div>
              <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                HƯƠNG VIỆT RESTAURANT
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mã hóa đơn: <strong className="tabular-nums">{completedPayment.invoiceCode}</strong></div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Bàn: <strong>{completedPayment.tableName || 'Mang về'}</strong> • Đã thanh toán và giải phóng bàn
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Tổng tiền món:</span>
                <span className="tabular-nums">{formatCurrency(completedPayment.subtotalAmount)}</span>
              </div>
              {completedPayment.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--status-empty)' }}>
                  <span>Chiết khấu / Giảm giá:</span>
                  <span className="tabular-nums">-{formatCurrency(completedPayment.discountAmount)}</span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  borderTop: '1px dashed var(--border-strong)',
                  paddingTop: '0.5rem',
                  marginTop: '0.2rem',
                }}
              >
                <span>Thực thu:</span>
                <span className="tabular-nums">{formatCurrency(completedPayment.finalAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Hình thức:</span>
                <span>{completedPayment.paymentMethod === 'CASH' ? 'Tiền mặt' : 'Chuyển khoản QR'}</span>
              </div>
              {completedPayment.paymentMethod === 'CASH' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--status-empty)', fontWeight: 600 }}>
                  <span>Tiền thối lại:</span>
                  <span className="tabular-nums">{formatCurrency(completedPayment.changeAmount)}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setReceiptModalOpen(false)}
                style={{ flex: 1 }}
              >
                Đóng
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => window.print()}
                style={{ flex: 1 }}
                icon={<IconPrinter size={16} />}
              >
                In hóa đơn
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PosPage;
