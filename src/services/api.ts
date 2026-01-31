import axios from 'axios';

// MockAPI endpoint - sử dụng endpoint của bạn
const MOCK_API_BASE_URL = 'https://64de102a825d19d9bfb1f7ba.mockapi.io';

// Tự động thêm '/api/v1' hoặc các tiền tố khác nếu cần
// MockAPI.io thường sử dụng endpoint gốc trực tiếp

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
  getAllTransactions: async () => {
    try {
      const response = await apiClient.get('/transactions');
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  // Lấy giao dịch theo ID
  getTransactionById: async (id: string) => {
    try {
      const response = await apiClient.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction with id ${id}:`, error);
      throw error;
    }
  },

  // Lấy giao dịch theo userId
  getTransactionsByUserId: async (userId: string) => {
    try {
      const response = await apiClient.get(`/transactions`, {
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
  createTransaction: async (transaction: any) => {
    try {
      const response = await apiClient.post('/transactions', transaction);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  // Cập nhật giao dịch
  updateTransaction: async (id: string, transaction: any) => {
    try {
      const response = await apiClient.put(`/transactions/${id}`, transaction);
      return response.data;
    } catch (error) {
      console.error(`Error updating transaction with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa giao dịch
  deleteTransaction: async (id: string) => {
    try {
      const response = await apiClient.delete(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting transaction with id ${id}:`, error);
      throw error;
    }
  }
};

// User API functions
export const userApi = {
  // Lấy tất cả người dùng
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Lấy người dùng theo ID
  getUserById: async (id: string) => {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  // Tạo người dùng mới
  createUser: async (user: any) => {
    try {
      const response = await apiClient.post('/users', user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Cập nhật người dùng
  updateUser: async (id: string, user: any) => {
    try {
      const response = await apiClient.put(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  // Xóa người dùng
  deleteUser: async (id: string) => {
    try {
      const response = await apiClient.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }
};