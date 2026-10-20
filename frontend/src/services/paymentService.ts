import { api } from './apiClient';
import { Payment, PaymentPreview, PaymentRequest } from '../types/payment';

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const paymentService = {
  async getPaymentPreview(orderId: number): Promise<PaymentPreview> {
    return api.get<PaymentPreview>(`/payments/preview/${orderId}`);
  },

  async processPayment(data: PaymentRequest): Promise<Payment> {
    return api.post<Payment>('/payments', data);
  },

  async getPaymentByOrderId(orderId: number): Promise<Payment> {
    return api.get<Payment>(`/payments/by-order/${orderId}`);
  },

  async getPaymentByInvoiceCode(invoiceCode: string): Promise<Payment> {
    return api.get<Payment>(`/payments/invoice/${invoiceCode}`);
  },

  async getPaymentHistory(startDate?: string, endDate?: string, page = 0, size = 20): Promise<PageResponse<Payment>> {
    let query = `/payments?page=${page}&size=${size}`;
    if (startDate) query += `&startDate=${startDate}`;
    if (endDate) query += `&endDate=${endDate}`;
    return api.get<PageResponse<Payment>>(query);
  },
};
