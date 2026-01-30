import axios from 'axios';

// Mock API endpoints
const USERS_API_URL = 'https://64de102a825d19d9bfb1f7ba.mockapi.io/users';
const TRANSACTIONS_API_URL = 'https://64de102a825d19d9bfb1f7ba.mockapi.io/transactions';

// User API functions
export const userApi = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(USERS_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (id: string) => {
    try {
      const response = await axios.get(`${USERS_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  createUser: async (userData: any) => {
    try {
      const response = await axios.post(USERS_API_URL, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (id: string, userData: any) => {
    try {
      const response = await axios.put(`${USERS_API_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const response = await axios.delete(`${USERS_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },
};

// Transaction API functions
export const transactionApi = {
  getAllTransactions: async () => {
    try {
      const response = await axios.get(TRANSACTIONS_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  getTransactionsByUserId: async (userId: string) => {
    try {
      const response = await axios.get(`${TRANSACTIONS_API_URL}?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transactions for user ${userId}:`, error);
      throw error;
    }
  },

  getTransactionById: async (id: string) => {
    try {
      const response = await axios.get(`${TRANSACTIONS_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error);
      throw error;
    }
  },

  createTransaction: async (transactionData: any) => {
    try {
      const response = await axios.post(TRANSACTIONS_API_URL, transactionData);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  updateTransaction: async (id: string, transactionData: any) => {
    try {
      const response = await axios.put(`${TRANSACTIONS_API_URL}/${id}`, transactionData);
      return response.data;
    } catch (error) {
      console.error(`Error updating transaction ${id}:`, error);
      throw error;
    }
  },

  deleteTransaction: async (id: string) => {
    try {
      const response = await axios.delete(`${TRANSACTIONS_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting transaction ${id}:`, error);
      throw error;
    }
  },
};