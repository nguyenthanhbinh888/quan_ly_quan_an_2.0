export type OrderType = 'DINE_IN' | 'TAKEAWAY';
export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';
export type OrderItemStatus = 'PENDING' | 'COOKING' | 'SERVED' | 'CANCELLED';

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  itemName: string;
  imageUrl?: string;
  priceAtOrder: number;
  quantity: number;
  subtotal: number;
  note?: string;
  status: OrderItemStatus;
  createdAt: string;
}

export interface Order {
  id: number;
  orderCode: string;
  tableId?: number;
  tableCode?: string;
  tableName?: string;
  orderType: OrderType;
  status: OrderStatus;
  createdByUserId: number;
  createdByName: string;
  subtotalAmount: number;
  discountAmount: number;
  finalAmount: number;
  note?: string;
  cancelReason?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  tableId?: number;
  orderType: OrderType;
  note?: string;
}

export interface AddOrderItemRequest {
  menuItemId: number;
  quantity: number;
  note?: string;
}

export interface UpdateOrderItemRequest {
  quantity: number;
  note?: string;
  status?: OrderItemStatus;
}

export interface DiscountOrderRequest {
  discountAmount: number;
}

export interface CancelOrderRequest {
  cancelReason: string;
}
