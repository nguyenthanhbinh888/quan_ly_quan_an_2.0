export type TableStatus = 'EMPTY' | 'OCCUPIED' | 'RESERVED';

export interface DiningTable {
  id: number;
  code: string;
  name: string;
  capacity: number;
  status: TableStatus;
  currentOrderId: number | null;
  currentOrderCode: string | null;
  currentOrderTotal: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface DiningTableRequest {
  code: string;
  name: string;
  capacity: number;
  status?: TableStatus;
}
