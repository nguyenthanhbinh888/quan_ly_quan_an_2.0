import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { DiningTable, DiningTableRequest, TableStatus } from '../types/table';
import { Order, OrderItem } from '../types/order';
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

  // State Modal Thanh toán & Biên lai (Giai đoạn 9)
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

  // -------------------------------------------------------------
  // Xử lý mở bàn & xem đơn
  // -------------------------------------------------------------
  const handleOpenTableOrder = async (table: DiningTable) => {
    setActiveTable(table);
    setOrderError(null);
    setOrderModalOpen(true);
    setOrderLoading(true);

    try {
      if (table.status === 'EMPTY') {
        // Mở đơn mới tự động cho bàn trống
        const newOrder = await orderService.createOrder({
          tableId: table.id,
          orderType: 'DINE_IN',
          note: `Khách ngồi ${table.name}`,
        });
        setActiveOrder(newOrder);
        // Refresh danh sách bàn để cập nhật trạng thái OCCUPIED
        loadTables();
      } else {
        // Tải đơn đang hoạt động của bàn
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
      // Xóa ghi chú tạm của món sau khi thêm
      setItemNotes(prev => ({ ...prev, [item.id]: '' }));
      loadTables();
    } catch (err: any) {
      setOrderError(err?.message || 'Không thể thêm món vào đơn');
    } finally {
      setOrderItemSubmitting(false);
    }
  };

  // Cập nhật số lượng món
  const handleUpdateItemQuantity = async (orderItem: OrderItem, delta: number) => {
    if (!activeOrder) return;
    const newQty = orderItem.quantity + delta;
    if (newQty <= 0) {
      // Nếu giảm về 0 thì hỏi xóa món
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

  // Xóa món khỏi đơn
  const handleRemoveItem = async (itemId: number) => {
    if (!activeOrder) return;
    try {
      setOrderItemSubmitting(true);
      setOrderError(null);
      const updated = await orderService.removeOrderItem(activeOrder.id, itemId);
      setActiveOrder(updated);
      loadTables();
    } catch (err: any) {
      setOrderError(err?.message || 'Không thể xóa món khỏi đơn');
    } finally {
      setOrderItemSubmitting(false);
    }
  };

  // Áp dụng giảm giá
  const handleApplyDiscountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrder) return;
    const amount = parseFloat(discountInput);
    if (isNaN(amount) || amount < 0) {
      setDiscountError('Số tiền giảm giá phải là số không âm');
      return;
    }
    if (amount > activeOrder.subtotalAmount) {
      setDiscountError(`Số tiền giảm giá không được vượt quá tổng tiền món (${formatCurrency(activeOrder.subtotalAmount)})`);
      return;
    }
    try {
      setDiscountSubmitting(true);
      setDiscountError(null);
      const updated = await orderService.applyDiscount(activeOrder.id, { discountAmount: amount });
      setActiveOrder(updated);
      setDiscountModalOpen(false);
      loadTables();
    } catch (err: any) {
      setDiscountError(err?.message || 'Không thể áp dụng giảm giá');
    } finally {
      setDiscountSubmitting(false);
    }
  };

  // Hủy toàn bộ đơn
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

  // -------------------------------------------------------------
  // Quản lý Bàn ăn (Admin CRUD)
  // -------------------------------------------------------------
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
      alert('Chỉ có thể xóa bàn khi đang ở trạng thái Trống (EMPTY)');
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
    <div className="pos-page">
      {/* Header Toolbar */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#f8fafc' }}>
            Sơ Đồ Bàn Ăn & Gọi Món (POS)
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>
            Quản lý vị trí bàn, mở đơn phục vụ tức thì và ghi nhận món ăn chính xác
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary" onClick={loadTables}>
            Làm mới
          </Button>
          {isAdmin && (
            <Button variant="primary" onClick={handleOpenAddTable}>
              + Thêm bàn mới
            </Button>
          )}
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#38bdf8' }}>
            🪑
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Tổng số bàn</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc' }}>{stats.total}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#22c55e' }}>
            🟢
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Bàn trống</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#22c55e' }}>{stats.empty}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#f59e0b' }}>
            🟠
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Đang dùng</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#f59e0b' }}>{stats.occupied}</div>
          </div>
        </div>

        <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: '#1e293b', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#6366f1' }}>
            🔵
          </div>
          <div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>Đã đặt trước</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#6366f1' }}>{stats.reserved}</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        <button
          className={`category-pill ${statusFilter === 'ALL' ? 'active' : ''}`}
          onClick={() => setStatusFilter('ALL')}
          style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: statusFilter === 'ALL' ? '#e11d48' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 500 }}
        >
          Tất cả ({tables.length})
        </button>
        <button
          className={`category-pill ${statusFilter === 'EMPTY' ? 'active' : ''}`}
          onClick={() => setStatusFilter('EMPTY')}
          style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: statusFilter === 'EMPTY' ? '#22c55e' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 500 }}
        >
          Bàn trống ({stats.empty})
        </button>
        <button
          className={`category-pill ${statusFilter === 'OCCUPIED' ? 'active' : ''}`}
          onClick={() => setStatusFilter('OCCUPIED')}
          style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: statusFilter === 'OCCUPIED' ? '#f59e0b' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 500 }}
        >
          Đang phục vụ ({stats.occupied})
        </button>
        <button
          className={`category-pill ${statusFilter === 'RESERVED' ? 'active' : ''}`}
          onClick={() => setStatusFilter('RESERVED')}
          style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', background: statusFilter === 'RESERVED' ? '#6366f1' : '#1e293b', color: '#fff', cursor: 'pointer', fontWeight: 500 }}
        >
          Đã đặt ({stats.reserved})
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <LoadingSpinner />
          <p style={{ marginTop: '12px', color: '#94a3b8' }}>Đang tải danh sách bàn ăn...</p>
        </div>
      ) : filteredTables.length === 0 ? (
        <EmptyState
          title="Không tìm thấy bàn nào"
          description={statusFilter === 'ALL' ? 'Chưa có dữ liệu bàn ăn.' : 'Không có bàn nào phù hợp với bộ lọc đã chọn.'}
        />
      ) : (
        /* Table Grid */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {filteredTables.map(table => {
            const isOccupied = table.status === 'OCCUPIED';
            const isReserved = table.status === 'RESERVED';

            return (
              <div
                key={table.id}
                className="table-card"
                onClick={() => handleOpenTableOrder(table)}
                style={{
                  background: '#1e293b',
                  borderRadius: '16px',
                  border: isOccupied ? '2px solid #f59e0b' : isReserved ? '1px solid #6366f1' : '1px solid #334155',
                  padding: '20px',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '180px',
                  boxShadow: isOccupied ? '0 4px 20px rgba(245, 158, 11, 0.12)' : 'none',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', background: '#334155', padding: '4px 10px', borderRadius: '8px' }}>
                        {table.code}
                      </span>
                      <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                        👥 {table.capacity} chỗ
                      </span>
                    </div>

                    <Badge variant={isOccupied ? 'warning' : isReserved ? 'info' : 'success'}>
                      {isOccupied ? 'ĐANG DÙNG' : isReserved ? 'ĐÃ ĐẶT' : 'TRỐNG'}
                    </Badge>
                  </div>

                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600, color: '#e2e8f0' }}>
                    {table.name}
                  </h3>

                  {isOccupied && (
                    <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '8px 12px', borderRadius: '8px', marginTop: '8px' }}>
                      <div style={{ fontSize: '11px', color: '#f59e0b', fontWeight: 600 }}>
                        {table.currentOrderCode || 'ĐƠN HOẠT ĐỘNG'}
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                        {formatCurrency(table.currentOrderTotal)}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #334155', paddingTop: '12px' }}>
                  <Button
                    variant={isOccupied ? 'warning' : 'primary'}
                    size="sm"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handleOpenTableOrder(table);
                    }}
                  >
                    {isOccupied ? 'Xem & Gọi món' : 'Mở bàn / Gọi món'}
                  </Button>

                  {isAdmin && (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button
                        title="Sửa bàn"
                        onClick={(e) => handleOpenEditTable(table, e)}
                        style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px', fontSize: '14px' }}
                      >
                        ✏️
                      </button>
                      {table.status === 'EMPTY' && (
                        <button
                          title="Xóa bàn"
                          onClick={(e) => handleDeleteTable(table, e)}
                          style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px', fontSize: '14px' }}
                        >
                          🗑
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
          title={`Gọi Món — ${activeTable.name} (${activeTable.code})`}
        >
          <div style={{ minWidth: '850px', maxWidth: '1050px', maxHeight: '75vh', display: 'flex', flexDirection: 'column' }}>
            {orderError && (
              <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '12px', fontSize: '13px' }}>
                {orderError}
              </div>
            )}

            {orderLoading ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <LoadingSpinner />
                <p style={{ marginTop: '10px', color: '#94a3b8' }}>Đang tải thông tin đơn hàng...</p>
              </div>
            ) : !activeOrder ? (
              <EmptyState title="Không có đơn hàng hoạt động" description="Không thể tìm thấy hoặc khởi tạo đơn hàng cho bàn này." />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, overflow: 'hidden' }}>
                {/* CỘT TRÁI: THỰC ĐƠN CHỌN MÓN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm món nhanh..."
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }}
                    />
                  </div>

                  {/* Category Filter Pills */}
                  <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedCategoryId('ALL')}
                      style={{
                        padding: '6px 12px',
                        fontSize: '12px',
                        borderRadius: '16px',
                        border: 'none',
                        background: selectedCategoryId === 'ALL' ? '#e11d48' : '#334155',
                        color: '#fff',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Tất cả
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategoryId(cat.id)}
                        style={{
                          padding: '6px 12px',
                          fontSize: '12px',
                          borderRadius: '16px',
                          border: 'none',
                          background: selectedCategoryId === cat.id ? '#e11d48' : '#334155',
                          color: '#fff',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Danh sách món ăn có thể gọi */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', paddingRight: '4px' }}>
                    {filteredMenuItems.map(item => {
                      const isAvailable = item.status === 'AVAILABLE';
                      return (
                        <div
                          key={item.id}
                          style={{
                            background: '#0f172a',
                            borderRadius: '10px',
                            border: '1px solid #334155',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            opacity: isAvailable ? 1 : 0.6,
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '14px', color: '#f8fafc', marginBottom: '4px' }}>
                              {item.name}
                            </div>
                            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                              {formatCurrency(item.price)}
                            </div>
                          </div>

                          {isAvailable ? (
                            <div>
                              <input
                                type="text"
                                placeholder="Ghi chú (ít cay...)"
                                value={itemNotes[item.id] || ''}
                                onChange={(e) => setItemNotes({ ...itemNotes, [item.id]: e.target.value })}
                                style={{ width: '100%', boxSizing: 'border-box', padding: '4px 8px', fontSize: '11px', borderRadius: '4px', background: '#1e293b', border: '1px solid #334155', color: '#fff', marginBottom: '6px' }}
                              />
                              <Button
                                variant="primary"
                                size="sm"
                                disabled={orderItemSubmitting}
                                onClick={() => handleAddItemToOrder(item)}
                                style={{ width: '100%', fontSize: '12px', padding: '6px 0' }}
                              >
                                + Thêm vào đơn
                              </Button>
                            </div>
                          ) : (
                            <div style={{ textAlign: 'center', padding: '4px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                              HẾT MÓN
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CỘT PHẢI: CHI TIẾT ĐƠN HÀNG ĐANG PHỤC VỤ */}
                <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', borderRadius: '12px', border: '1px solid #334155', padding: '16px', overflow: 'hidden' }}>
                  {/* Order Meta Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '10px', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>MÃ ĐƠN HÀNG</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b' }}>{activeOrder.orderCode}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>NHÂN VIÊN</div>
                      <div style={{ fontSize: '13px', color: '#f8fafc' }}>{activeOrder.createdByName}</div>
                    </div>
                  </div>

                  {/* List of ordered items */}
                  <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
                    {activeOrder.items.length === 0 ? (
                      <div style={{ textAlign: 'center', color: '#64748b', padding: '30px 0' }}>
                        Chưa có món nào trong đơn.
                        <br />
                        <span style={{ fontSize: '12px' }}>Chọn món từ thực đơn bên trái để thêm vào.</span>
                      </div>
                    ) : (
                      activeOrder.items.map(item => (
                        <div
                          key={item.id}
                          style={{
                            background: '#1e293b',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: '13px', color: '#f8fafc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {item.itemName}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                              {formatCurrency(item.priceAtOrder)}
                              {item.note && <span style={{ color: '#f59e0b', marginLeft: '6px' }}>({item.note})</span>}
                            </div>
                          </div>

                          {/* Quantity control */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              type="button"
                              disabled={orderItemSubmitting}
                              onClick={() => handleUpdateItemQuantity(item, -1)}
                              style={{ width: '24px', height: '24px', borderRadius: '4px', background: '#334155', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              -
                            </button>
                            <span style={{ fontSize: '13px', fontWeight: 700, minWidth: '18px', textAlign: 'center', color: '#f8fafc' }}>
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              disabled={orderItemSubmitting}
                              onClick={() => handleUpdateItemQuantity(item, 1)}
                              style={{ width: '24px', height: '24px', borderRadius: '4px', background: '#334155', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              +
                            </button>
                          </div>

                          {/* Line subtotal */}
                          <div style={{ minWidth: '70px', textAlign: 'right', fontWeight: 700, fontSize: '13px', color: '#38bdf8' }}>
                            {formatCurrency(item.subtotal)}
                          </div>

                          {/* Delete item */}
                          <button
                            type="button"
                            title="Xóa món"
                            disabled={orderItemSubmitting}
                            onClick={() => handleRemoveItem(item.id)}
                            style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Financial Summary (Backend Calculated) */}
                  <div style={{ borderTop: '1px solid #334155', paddingTop: '12px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>
                      <span>Tiền món (Tạm tính):</span>
                      <span style={{ fontWeight: 600, color: '#f8fafc' }}>{formatCurrency(activeOrder.subtotalAmount)}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
                      <span>
                        Giảm giá:
                        <button
                          type="button"
                          onClick={() => {
                            setDiscountInput(activeOrder.discountAmount ? activeOrder.discountAmount.toString() : '');
                            setDiscountError(null);
                            setDiscountModalOpen(true);
                          }}
                          style={{ marginLeft: '8px', background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px' }}
                        >
                          {activeOrder.discountAmount > 0 ? 'Sửa' : '+ Thêm'}
                        </button>
                      </span>
                      <span style={{ fontWeight: 600, color: '#22c55e' }}>-{formatCurrency(activeOrder.discountAmount)}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: '#f8fafc', borderTop: '1px dashed #334155', paddingTop: '8px' }}>
                      <span>Tổng thanh toán:</span>
                      <span style={{ color: '#f59e0b' }}>{formatCurrency(activeOrder.finalAmount)}</span>
                    </div>
                  </div>

                  {/* Order Footer Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
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
                      style={{ flex: 2, background: '#10b981', borderColor: '#10b981', color: '#fff', fontWeight: 700 }}
                    >
                      💳 Thanh toán
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
        >
          <form onSubmit={handleTableSubmit} style={{ width: '400px' }}>
            {tableFormError && (
              <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px', color: '#ef4444', marginBottom: '14px', fontSize: '13px' }}>
                {tableFormError}
              </div>
            )}

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                Mã bàn * (Ví dụ: B11, VIP02)
              </label>
              <input
                type="text"
                className="form-control"
                value={tableForm.code}
                onChange={(e) => setTableForm({ ...tableForm, code: e.target.value })}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }}
              />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                Tên hiển thị * (Ví dụ: Bàn 11 - Tầng 2)
              </label>
              <input
                type="text"
                className="form-control"
                value={tableForm.name}
                onChange={(e) => setTableForm({ ...tableForm, name: e.target.value })}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                Sức chứa / Số ghế *
              </label>
              <input
                type="number"
                min="1"
                max="50"
                className="form-control"
                value={tableForm.capacity}
                onChange={(e) => setTableForm({ ...tableForm, capacity: parseInt(e.target.value) || 1 })}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
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
      {/* MODAL ÁP DỤNG GIẢM GIÁ                                    */}
      {/* ========================================================= */}
      {discountModalOpen && (
        <Modal
          isOpen={discountModalOpen}
          onClose={() => setDiscountModalOpen(false)}
          title="Áp dụng giảm giá cho đơn hàng"
        >
          <form onSubmit={handleApplyDiscountSubmit} style={{ width: '360px' }}>
            {discountError && (
              <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px', color: '#ef4444', marginBottom: '12px', fontSize: '13px' }}>
                {discountError}
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                Số tiền giảm giá (VNĐ)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                placeholder="Nhập số tiền giảm (vd: 20000)"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
                autoFocus
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }}
              />
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Tối đa: {formatCurrency(activeOrder?.subtotalAmount)}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
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
          title="Xác nhận hủy đơn hàng"
        >
          <form onSubmit={handleCancelOrderSubmit} style={{ width: '380px' }}>
            {cancelError && (
              <div style={{ padding: '8px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px', color: '#ef4444', marginBottom: '12px', fontSize: '13px' }}>
                {cancelError}
              </div>
            )}

            <p style={{ color: '#e2e8f0', fontSize: '14px', marginBottom: '12px' }}>
              Bạn có chắc chắn muốn hủy đơn hàng <strong>{activeOrder?.orderCode}</strong> tại <strong>{activeTable?.name}</strong>? Bàn ăn sẽ được giải phóng về trạng thái Trống.
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                Lý do hủy đơn *
              </label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Ví dụ: Khách đổi ý, khách có việc gấp ra về..."
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                required
                style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
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
      {/* MODAL THANH TOÁN (GIAI ĐOẠN 9 - CASH & QR TRANSFER)      */}
      {/* ========================================================= */}
      {paymentModalOpen && paymentPreview && (
        <Modal
          isOpen={paymentModalOpen}
          onClose={() => {
            if (!paymentSubmitting) setPaymentModalOpen(false);
          }}
          title={`Thanh Toán — ${paymentPreview.orderCode} (${paymentPreview.tableName})`}
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
            style={{ width: '460px' }}
          >
            {paymentError && (
              <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '14px', fontSize: '13px' }}>
                {paymentError}
              </div>
            )}

            {/* Bill Preview Total */}
            <div style={{ background: '#0f172a', padding: '14px 18px', borderRadius: '10px', border: '1px solid #334155', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                <span>Tiền món:</span>
                <span>{formatCurrency(paymentPreview.subtotalAmount)}</span>
              </div>
              {paymentPreview.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#22c55e', marginBottom: '4px' }}>
                  <span>Giảm giá:</span>
                  <span>-{formatCurrency(paymentPreview.discountAmount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#f59e0b', borderTop: '1px solid #334155', paddingTop: '8px', marginTop: '6px' }}>
                <span>Cần thanh toán:</span>
                <span>{formatCurrency(paymentPreview.finalAmount)}</span>
              </div>
            </div>

            {/* Phương thức thanh toán */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                Hình thức thanh toán *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('CASH')}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: paymentMethod === 'CASH' ? '2px solid #22c55e' : '1px solid #334155',
                    background: paymentMethod === 'CASH' ? 'rgba(34, 197, 94, 0.12)' : '#0f172a',
                    color: paymentMethod === 'CASH' ? '#22c55e' : '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  💵 Tiền mặt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('BANK_TRANSFER');
                    setAmountPaidInput(paymentPreview.finalAmount.toString());
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: paymentMethod === 'BANK_TRANSFER' ? '2px solid #38bdf8' : '1px solid #334155',
                    background: paymentMethod === 'BANK_TRANSFER' ? 'rgba(56, 189, 248, 0.12)' : '#0f172a',
                    color: paymentMethod === 'BANK_TRANSFER' ? '#38bdf8' : '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  💳 Chuyển khoản QR
                </button>
              </div>
            </div>

            {/* Khối tiền mặt */}
            {paymentMethod === 'CASH' ? (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#94a3b8', marginBottom: '6px' }}>
                  Tiền khách đưa (VNĐ)
                </label>
                <input
                  type="number"
                  min={paymentPreview.finalAmount}
                  step="1000"
                  value={amountPaidInput}
                  onChange={(e) => setAmountPaidInput(e.target.value)}
                  required
                  style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '16px', fontWeight: 700 }}
                />

                {/* Quick Cash Buttons */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setAmountPaidInput(paymentPreview.finalAmount.toString())}
                    style={{ padding: '4px 8px', borderRadius: '4px', background: '#334155', border: 'none', color: '#fff', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Đủ tiền
                  </button>
                  {[50000, 100000, 200000, 500000].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmountPaidInput(val.toString())}
                      style={{ padding: '4px 8px', borderRadius: '4px', background: '#334155', border: 'none', color: '#fff', fontSize: '12px', cursor: 'pointer' }}
                    >
                      {formatCurrency(val)}
                    </button>
                  ))}
                </div>

                {/* Tiền thừa tính tự động */}
                <div style={{ marginTop: '12px', background: 'rgba(56, 189, 248, 0.08)', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>Tiền thừa trả khách:</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#38bdf8' }}>
                    {formatCurrency(Math.max(0, (parseFloat(amountPaidInput) || 0) - paymentPreview.finalAmount))}
                  </span>
                </div>
              </div>
            ) : (
              /* Khối chuyển khoản QR */
              <div style={{ textAlign: 'center', background: '#0f172a', padding: '16px', borderRadius: '10px', border: '1px solid #334155', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>
                  Quét mã QR để chuyển khoản chính xác:
                </div>
                <div style={{ width: '130px', height: '130px', margin: '0 auto 10px', background: '#fff', borderRadius: '8px', padding: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Mô phỏng VietQR */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=REST_PAY_${paymentPreview.orderCode}_${paymentPreview.finalAmount}`}
                    alt="VietQR Payment"
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div style={{ fontSize: '12px', color: '#f8fafc', fontWeight: 600 }}>
                  Ngân hàng: MB Bank (Quân Đội) — STK: 8888.9999.6868
                </div>
                <div style={{ fontSize: '12px', color: '#38bdf8', marginTop: '2px' }}>
                  Nội dung CK: <strong>{paymentPreview.orderCode}</strong>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button variant="secondary" type="button" onClick={() => setPaymentModalOpen(false)}>
                Hủy bỏ
              </Button>
              <Button variant="primary" type="submit" disabled={paymentSubmitting} style={{ background: '#10b981', borderColor: '#10b981' }}>
                {paymentSubmitting ? 'Đang thanh toán...' : 'Xác nhận thanh toán'}
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
          title={`Biên Lai Thanh Toán — ${completedPayment.invoiceCode}`}
        >
          <div style={{ width: '420px', background: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #334155', color: '#f8fafc' }}>
            <div style={{ textAlign: 'center', borderBottom: '1px dashed #334155', paddingBottom: '14px', marginBottom: '14px' }}>
              <div style={{ fontSize: '28px', marginBottom: '4px' }}>✅</div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#22c55e' }}>
                THANH TOÁN THÀNH CÔNG!
              </h2>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Mã hóa đơn: <strong>{completedPayment.invoiceCode}</strong></div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Bàn: <strong>{completedPayment.tableName || 'Mang về'}</strong> đã được giải phóng về TRỐNG.</div>
            </div>

            <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Tổng tiền món:</span>
                <span>{formatCurrency(completedPayment.subtotalAmount)}</span>
              </div>
              {completedPayment.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#22c55e' }}>
                  <span>Giảm giá:</span>
                  <span>-{formatCurrency(completedPayment.discountAmount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: '#f59e0b', borderTop: '1px solid #334155', paddingTop: '8px' }}>
                <span>Thực thu:</span>
                <span>{formatCurrency(completedPayment.finalAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Hình thức:</span>
                <span>{completedPayment.paymentMethod === 'CASH' ? 'Tiền mặt' : 'Chuyển khoản QR'}</span>
              </div>
              {completedPayment.paymentMethod === 'CASH' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#38bdf8', fontWeight: 600 }}>
                  <span>Tiền thối lại:</span>
                  <span>{formatCurrency(completedPayment.changeAmount)}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setReceiptModalOpen(false)}
                style={{ flex: 1 }}
              >
                Đóng
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.print()}
                style={{ flex: 1 }}
              >
                🖨 In hóa đơn
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
