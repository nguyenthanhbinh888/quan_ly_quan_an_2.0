import { OrderItem } from './order';

export type PaymentMethod = 'CASH' | 'BANK_TRANSFER';
export type PaymentStatus = 'SUCCESS' | 'REFUNDED';

export interface PaymentRequest {
  orderId: number;
  paymentMethod: PaymentMethod;
  amountPaid: number;
}

export interface PaymentPreview {
  orderId: number;
  orderCode: string;
  tableId?: number;
  tableCode?: string;
  tableName?: string;
  subtotalAmount: number;
  discountAmount: number;
  finalAmount: number;
  items: OrderItem[];
}

export interface Payment {
  id: number;
  orderId: number;
  invoiceCode: string;
  orderCode: string;
  tableId?: number;
  tableCode?: string;
  tableName?: string;
  paymentMethod: PaymentMethod;
  subtotalAmount: number;
  discountAmount: number;
  finalAmount: number;
  amountPaid: number;
  changeAmount: number;
  paymentStatus: PaymentStatus;
  processedByUserId: number;
  processedByName: string;
  paidAt: string;
  items: OrderItem[];
}
