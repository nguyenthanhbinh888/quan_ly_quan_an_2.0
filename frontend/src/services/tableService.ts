import { api } from './apiClient';
import { DiningTable, DiningTableRequest, TableStatus } from '../types/table';

export const tableService = {
  async getAllTables(): Promise<DiningTable[]> {
    return api.get<DiningTable[]>('/tables');
  },

  async getTableById(id: number): Promise<DiningTable> {
    return api.get<DiningTable>(`/tables/${id}`);
  },

  async createTable(data: DiningTableRequest): Promise<DiningTable> {
    return api.post<DiningTable>('/tables', data);
  },

  async updateTable(id: number, data: DiningTableRequest): Promise<DiningTable> {
    return api.put<DiningTable>(`/tables/${id}`, data);
  },

  async deleteTable(id: number): Promise<void> {
    await api.delete<void>(`/tables/${id}`);
  },

  async updateTableStatus(id: number, status: TableStatus): Promise<DiningTable> {
    return api.patch<DiningTable>(`/tables/${id}/status?status=${status}`);
  },
};
