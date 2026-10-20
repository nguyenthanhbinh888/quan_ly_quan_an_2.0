import { api } from './apiClient';
import {
  Order,
  CreateOrderRequest,
  AddOrderItemRequest,
  UpdateOrderItemRequest,
  DiscountOrderRequest,
  CancelOrderRequest,
} from '../types/order';

export const orderService = {
  async createOrder(data: CreateOrderRequest): Promise<Order> {
    return api.post<Order>('/orders', data);
  },

  async getOrderById(id: number): Promise<Order> {
    return api.get<Order>(`/orders/${id}`);
  },

  async getActiveOrderByTableId(tableId: number): Promise<Order> {
    return api.get<Order>(`/orders/active-by-table/${tableId}`);
  },

  async addOrderItem(orderId: number, data: AddOrderItemRequest): Promise<Order> {
    return api.post<Order>(`/orders/${orderId}/items`, data);
  },

  async updateOrderItem(orderId: number, itemId: number, data: UpdateOrderItemRequest): Promise<Order> {
    return api.put<Order>(`/orders/${orderId}/items/${itemId}`, data);
  },

  async removeOrderItem(orderId: number, itemId: number): Promise<Order> {
    return api.delete<Order>(`/orders/${orderId}/items/${itemId}`);
  },

  async applyDiscount(orderId: number, data: DiscountOrderRequest): Promise<Order> {
    return api.post<Order>(`/orders/${orderId}/discount`, data);
  },

  async cancelOrder(orderId: number, data: CancelOrderRequest): Promise<Order> {
    return api.post<Order>(`/orders/${orderId}/cancel`, data);
  },
};
