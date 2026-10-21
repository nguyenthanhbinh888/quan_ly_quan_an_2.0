import React, { useState, useEffect } from 'react';
import { Payment } from '../types/payment';
import { paymentService } from '../services/paymentService';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import {
  IconReceipt,
  IconRefresh,
  IconFilter,
  IconPrinter,
  IconCash,
  IconQr,
  IconAlertCircle,
} from '../components/common/Icons';

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
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Lịch Sử Hóa Đơn & Giao Dịch</h1>
          <p className="page-subtitle">
            Tra cứu toàn bộ hóa đơn đã tất toán, phương thức thu tiền và chi tiết từng bàn ăn
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem' }}>
          <Button
            variant="secondary"
            size="md"
            onClick={() => loadPayments(currentPage)}
            icon={<IconRefresh size={16} />}
          >
            Làm mới
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <form onSubmit={handleFilterSubmit} className="card" style={{ padding: '0.85rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label className="form-label" style={{ marginBottom: 0 }}>Từ ngày:</label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ padding: '0.4rem 0.65rem', width: 'auto' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label className="form-label" style={{ marginBottom: 0 }}>Đến ngày:</label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ padding: '0.4rem 0.65rem', width: 'auto' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              icon={<IconFilter size={14} />}
            >
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

          <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Tìm thấy <strong className="tabular-nums">{totalElements}</strong> hóa đơn
          </div>
        </div>
      </form>

      {/* Error state */}
      {error && (
        <div className="alert alert-danger">
          <IconAlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Content Table */}
      {loading ? (
        <LoadingSpinner text="Đang tải danh sách hóa đơn thanh toán..." />
      ) : payments.length === 0 ? (
        <EmptyState
          icon={<IconReceipt size={44} strokeWidth={1.5} />}
          title="Không tìm thấy hóa đơn nào"
          description="Chưa có giao dịch thanh toán nào được ghi nhận trong khoảng thời gian đã chọn."
        />
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã Hóa Đơn</th>
                <th>Mã Đơn / Bàn</th>
                <th>Thời Gian Thanh Toán</th>
                <th>Phương Thức</th>
                <th>Thu Ngân</th>
                <th className="text-right">Tổng Thực Thu</th>
                <th className="text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }} className="tabular-nums">
                      {p.invoiceCode}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.orderCode}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.tableName || 'Mang về'}</div>
                  </td>
                  <td className="tabular-nums" style={{ color: 'var(--text-muted)' }}>
                    {formatDateTime(p.paidAt)}
                  </td>
                  <td>
                    <Badge variant={p.paymentMethod === 'CASH' ? 'success' : 'info'}>
                      {p.paymentMethod === 'CASH' ? (
                        <>
                          <IconCash size={14} />
                          <span>Tiền mặt</span>
                        </>
                      ) : (
                        <>
                          <IconQr size={14} />
                          <span>Chuyển khoản QR</span>
                        </>
                      )}
                    </Badge>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    {p.processedByName || 'Nhân viên'}
                  </td>
                  <td className="text-right tabular-nums" style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
                    {formatCurrency(p.finalAmount)}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleViewReceipt(p)}
                      icon={<IconReceipt size={14} />}
                    >
                      Biên lai
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1.25rem',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface-subtle)',
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }} className="tabular-nums">
                Trang {currentPage + 1} / {totalPages}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage === 0}
                  onClick={() => loadPayments(currentPage - 1)}
                >
                  Trang trước
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => loadPayments(currentPage + 1)}
                >
                  Trang sau
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
          title={`Hóa Đơn Bán Lẻ — ${selectedInvoice.invoiceCode}`}
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
              <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                HƯƠNG VIỆT RESTAURANT
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Địa chỉ: 123 Đường Ẩm Thực, Quận 1, TP.HCM</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Hotline: 0901.234.567</div>
              <div style={{ marginTop: '0.65rem', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                HÓA ĐƠN THANH TOÁN
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.85rem', borderBottom: '1px dashed var(--border-strong)', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Số hóa đơn:</span>
                <strong className="tabular-nums">{selectedInvoice.invoiceCode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Mã đơn:</span>
                <span className="tabular-nums">{selectedInvoice.orderCode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Bàn phục vụ:</span>
                <span>{selectedInvoice.tableName || 'Mang về'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Thời gian:</span>
                <span className="tabular-nums">{formatDateTime(selectedInvoice.paidAt)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Thu ngân:</span>
                <span>{selectedInvoice.processedByName}</span>
              </div>
            </div>

            {/* Danh sách món */}
            <div style={{ marginBottom: '0.85rem', borderBottom: '1px dashed var(--border-strong)', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                <span style={{ flex: 2 }}>Món ăn</span>
                <span style={{ width: '40px', textAlign: 'center' }}>SL</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Thành tiền</span>
              </div>
              {selectedInvoice.items?.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                  <span style={{ flex: 2 }}>{item.itemName}</span>
                  <span style={{ width: '40px', textAlign: 'center' }} className="tabular-nums">{item.quantity}</span>
                  <span style={{ flex: 1, textAlign: 'right' }} className="tabular-nums">{formatCurrency(item.subtotal)}</span>
                </div>
              ))}
            </div>

            {/* Chi tiết thanh toán */}
            <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Tiền món:</span>
                <span className="tabular-nums">{formatCurrency(selectedInvoice.subtotalAmount)}</span>
              </div>
              {selectedInvoice.discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--status-empty)' }}>
                  <span>Chiết khấu / Giảm giá:</span>
                  <span className="tabular-nums">-{formatCurrency(selectedInvoice.discountAmount)}</span>
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.5rem',
                }}
              >
                <span>Tổng cộng:</span>
                <span className="tabular-nums">{formatCurrency(selectedInvoice.finalAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Hình thức:</span>
                <span>{selectedInvoice.paymentMethod === 'CASH' ? 'Tiền mặt' : 'Chuyển khoản QR'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Tiền khách trả:</span>
                <span className="tabular-nums">{formatCurrency(selectedInvoice.amountPaid)}</span>
              </div>
              {selectedInvoice.paymentMethod === 'CASH' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--status-empty)', fontWeight: 600 }}>
                  <span>Tiền thối lại:</span>
                  <span className="tabular-nums">{formatCurrency(selectedInvoice.changeAmount)}</span>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
              Cảm ơn quý khách và hẹn gặp lại!
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

export default OrdersPage;
