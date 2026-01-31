import axios from 'axios';

// MockAPI endpoint - sử dụng endpoint của bạn
const MOCK_API_BASE_URL = 'https://64de102a825d19d9bfb1f7ba.mockapi.io';

// Tự động thêm '/api/v1' hoặc các tiền tố khác nếu cần
// MockAPI.io thường sử dụng endpoint gốc trực tiếp

// Định nghĩa kiểu dữ liệu
export interface Transaction {
  id: string;
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  currency?: string;
  createdAt?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt?: string;
}

// Tạo axios instance với cấu hình mặc định
const apiClient = axios.create({
  baseURL: MOCK_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Transaction API functions
export const transactionApi = {
  // Lấy tất cả giao dịch
  getAllTransactions: async (): Promise<Transaction[]> => {
    try {
      const response = await apiClient.get<Transaction[]>('/transactions');
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // Lấy giao dịch theo ID
  getTransactionById: async (id: string): Promise<Transaction> => {
    try {
      const response = await apiClient.get<Transaction>(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction with id ${id}:`, error);
      throw error;
    }
  },

  // Lấy giao dịch theo userId
  getTransactionsByUserId: async (userId: string): Promise<Transaction[]> => {
    try {
      const response = await apiClient.get<Transaction[]>(`/transactions`, {
        params: {
          userId: userId
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching transactions for user ${userId}:`, error);
      throw error;
    }
  },

  // Tạo giao dịch mới
  createTransaction: async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
    try {
      const response = await apiClient.post<Transaction>('/transactions', transaction);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Cập nhật giao dịch
  updateTransaction: async (id: string, transaction: Partial<Transaction>): Promise<Transaction> => {
    try {
      const response = await apiClient.put<Transaction>(`/transactions/${id}`, transaction);
      return response.data;
    } catch (error) {
      console.error(`Error updating transaction with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa giao dịch
  deleteTransaction: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/transactions/${id}`);
    } catch (error) {
      console.error(`Error deleting transaction with id ${id}:`, error);
      throw error;
    }
  }
};

// User API functions
export const userApi = {
  // Lấy tất cả người dùng
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await apiClient.get<User[]>('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Lấy người dùng theo ID
  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await apiClient.get<User>(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo người dùng mới
  createUser: async (user: Omit<User, 'id'>): Promise<User> => {
    try {
      const response = await apiClient.post<User>('/users', user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Cập nhật người dùng
  updateUser: async (id: string, user: Partial<User>): Promise<User> => {
    try {
      const response = await apiClient.put<User>(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa người dùng
  deleteUser: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/users/${id}`);
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }
};