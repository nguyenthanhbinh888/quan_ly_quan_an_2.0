import React, { useState, useEffect } from 'react';
import { Payment } from '../types/payment';
import { paymentService } from '../services/paymentService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';

export const OrdersPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Bộ lọc ngày
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Phân trang
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);

  // Chi tiết hóa đơn xem lại
  const [selectedInvoice, setSelectedInvoice] = useState<Payment | null>(null);
  const [receiptModalOpen, setReceiptModalOpen] = useState<boolean>(false);

  const formatCurrency = (val: number | null | undefined): string => {
    if (val == null) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  const formatDateTime = (dtStr: string): string => {
    try {
      const d = new Date(dtStr);
      return d.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dtStr;
    }
  };

  const loadPayments = async (page = 0) => {
    try {
      setLoading(true);
      setError(null);
      const res = await paymentService.getPaymentHistory(
        startDate || undefined,
        endDate || undefined,
        page,
        15
      );
      setPayments(res.content);
      setTotalPages(res.totalPages || 1);
      setTotalElements(res.totalElements || 0);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err?.message || 'Không thể tải lịch sử hóa đơn');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments(0);
  }, []);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadPayments(0);
  };

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    setTimeout(() => {
      loadPayments(0);
    }, 0);
  };

  const handleSetToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
    setTimeout(() => {
      loadPayments(0);
    }, 0);
  };

  const handleViewReceipt = (payment: Payment) => {
    setSelectedInvoice(payment);
    setReceiptModalOpen(true);
  };

  return (
    <div className="orders-page" style={{ paddingBottom: '40px' }}>
      {/* Page Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#f8fafc' }}>
            Lịch Sử Hóa Đơn & Thanh Toán
          </h1>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '14px' }}>
            Tra cứu tất cả hóa đơn đã thanh toán, phương thức tiền mặt và chuyển khoản QR
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" onClick={() => loadPayments(currentPage)}>
            Làm mới
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <form
        onSubmit={handleFilterSubmit}
        style={{
          background: '#1e293b',
          borderRadius: '12px',
          padding: '16px 20px',
          border: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Từ ngày:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>Đến ngày:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary" size="sm" type="submit">
            Lọc hóa đơn
          </Button>
          <Button variant="secondary" size="sm" type="button" onClick={handleSetToday}>
            Hôm nay
          </Button>
          {(startDate || endDate) && (
            <Button variant="outline" size="sm" type="button" onClick={handleResetFilter}>
              Xóa bộ lọc
            </Button>
          )}
        </div>

        <div style={{ marginLeft: 'auto', fontSize: '13px', color: '#94a3b8' }}>
          Tìm thấy <strong>{totalElements}</strong> hóa đơn
        </div>
      </form>

      {/* Error state */}
      {error && (
        <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {/* Content Table */}
      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <LoadingSpinner />
          <p style={{ marginTop: '12px', color: '#94a3b8' }}>Đang tải lịch sử hóa đơn...</p>
        </div>
      ) : payments.length === 0 ? (
        <EmptyState
          title="Không có hóa đơn nào"
          description="Chưa có lượt thanh toán nào phù hợp với khoảng thời gian đã chọn."
        />
      ) : (
        <div style={{ background: '#1e293b', borderRadius: '12px', border: '1px solid #334155', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#0f172a', borderBottom: '1px solid #334155', color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 16px' }}>Mã Hóa Đơn</th>
                <th style={{ padding: '14px 16px' }}>Mã Đơn / Bàn</th>
                <th style={{ padding: '14px 16px' }}>Thời Gian</th>
                <th style={{ padding: '14px 16px' }}>Phương Thức</th>
                <th style={{ padding: '14px 16px' }}>Thu Ngân</th>
                <th style={{ padding: '14px 16px', textAlign: 'right' }}>Tổng Thực Thu</th>
                <th style={{ padding: '14px 16px', textAlign: 'center' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #334155', color: '#f8fafc' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#f59e0b' }}>
                    🧾 {p.invoiceCode}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600 }}>{p.orderCode}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{p.tableName || 'Mang về'}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>
                    {formatDateTime(p.paidAt)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Badge variant={p.paymentMethod === 'CASH' ? 'success' : 'info'}>
                      {p.paymentMethod === 'CASH' ? '💵 Tiền mặt' : '💳 Chuyển khoản QR'}
                    </Badge>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>
                    {p.processedByName || 'Nhân viên'}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 700, color: '#22c55e', fontSize: '15px' }}>
                    {formatCurrency(p.finalAmount)}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <Button variant="secondary" size="sm" onClick={() => handleViewReceipt(p)}>
                      Xem biên lai
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderTop: '1px solid #334155' }}>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>
                Trang {currentPage + 1} / {totalPages}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === 0}
                  onClick={() => loadPayments(currentPage - 1)}
                >
                  ← Trang trước
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => loadPayments(currentPage + 1)}
                >
                  Trang sau →
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL BIÊN LAI / HÓA ĐƠN XEM LẠI                          */}
      {/* ========================================================= */}
      {receiptModalOpen && selectedInvoice && (
        <Modal
          isOpen={receiptModalOpen}
          onClose={() => setReceiptModalOpen(false)}
          title={`Hóa Đơn — ${selectedInvoice.invoiceCode}`}
        >
          <div style={{ width: '420px', background: '#0f172a', padding: '20px', borderRadius: '12px', border: '1px solid #334155', color: '#f8fafc' }}>
            <div style={{ textAlign: 'center', borderBottom: '1px dashed #334155', paddingBottom: '14px', marginBottom: '14px' }}>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 800, color: '#f59e0b' }}>
                NHÀ HÀNG QUÁN ĂN VIỆT
              </h2>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Địa chỉ: 123 Đường Ẩm Thực, Quận 1, TP.HCM</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Hotline: 0901.234.567</div>
              <div style={{ marginTop: '10px', fontSize: '14px', fontWeight: 700, color: '#22c55e' }}>
                HÓA ĐƠN THANH TOÁN
              </div>
            </div>

            <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px', borderBottom: '1px dashed #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Số hóa đơn:</span>
                <strong>{selectedInvoice.invoiceCode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Mã đơn:</span>
                <span>{selectedInvoice.orderCode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Bàn ăn:</span>
                <span>{selectedInvoice.tableName || 'Mang về'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Thời gian:</span>
                <span>{formatDateTime(selectedInvoice.paidAt)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Thu ngân:</span>
                <span>{selectedInvoice.processedByName}</span>
              </div>
            </div>

            {/* Danh sách món */}
            <div style={{ marginBottom: '14px', borderBottom: '1px dashed #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '8px' }}>
                <span style={{ flex: 2 }}>Món ăn</span>
                <span style={{ width: '40px', textAlign: 'center' }}>SL</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Thành tiền</span>
              </div>
              {selectedInvoice.items?.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ flex: 2 }}>{item.itemName}</span>
                  <span style={{ width: '40px', textAlign: 'center' }}>{item.quantity}</span>
                  <span style={{ flex: 1, textAlign: 'right' }}>{formatCurrency(item.subtotal)}</span>
                </div>
              ))}
            </div>

            {/* Chi tiết thanh toán */}
            <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8' }}>
                <span>Tiền món:</span>
                <span>{formatCurrency(selectedInvoice.subtotalAmount)}</span>
              </div>
              {selectedInvoice.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#22c55e' }}>
                  <span>Giảm giá:</span>
                  <span>-{formatCurrency(selectedInvoice.discountAmount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: '#f59e0b', borderTop: '1px solid #334155', paddingTop: '8px' }}>
                <span>Tổng cộng:</span>
                <span>{formatCurrency(selectedInvoice.finalAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Hình thức:</span>
                <span>{selectedInvoice.paymentMethod === 'CASH' ? 'Tiền mặt' : 'Chuyển khoản QR'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                <span>Tiền khách trả:</span>
                <span>{formatCurrency(selectedInvoice.amountPaid)}</span>
              </div>
              {selectedInvoice.paymentMethod === 'CASH' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#38bdf8', fontWeight: 600 }}>
                  <span>Tiền thừa thối lại:</span>
                  <span>{formatCurrency(selectedInvoice.changeAmount)}</span>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', marginBottom: '16px' }}>
              Cảm ơn quý khách và hẹn gặp lại!
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
