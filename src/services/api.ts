// LocalStorage-based API functions

// Helper functions for localStorage
const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (key: string, data: any[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// User API functions
export const userApi = {
  getAllUsers: async () => {
    try {
      return getFromLocalStorage('users');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  getUserById: async (id: string) => {
    try {
      const users = getFromLocalStorage('users');
      return users.find((user: any) => user.id === id) || null;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  createUser: async (userData: any) => {
    try {
      const users = getFromLocalStorage('users');
      const newUser = {
        ...userData,
        id: Date.now().toString(), // Generate a unique ID
      };
      users.push(newUser);
      saveToLocalStorage('users', users);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (id: string, userData: any) => {
    try {
      const users = getFromLocalStorage('users');
      const userIndex = users.findIndex((user: any) => user.id === id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        saveToLocalStorage('users', users);
        return users[userIndex];
      } else {
        throw new Error(`User with id ${id} not found`);
      }
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  deleteUser: async (id: string) => {
    try {
      const users = getFromLocalStorage('users');
      const filteredUsers = users.filter((user: any) => user.id !== id);
      saveToLocalStorage('users', filteredUsers);
      return { id };
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
      return getFromLocalStorage('transactions');
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  getTransactionsByUserId: async (userId: string) => {
    try {
      const transactions = getFromLocalStorage('transactions');
      return transactions.filter((transaction: any) => transaction.userId === userId);
    } catch (error) {
      console.error(`Error fetching transactions for user ${userId}:`, error);
      throw error;
    }
  },

  getTransactionById: async (id: string) => {
    try {
      const transactions = getFromLocalStorage('transactions');
      return transactions.find((transaction: any) => transaction.id === id) || null;
    } catch (error) {
      console.error(`Error fetching transaction ${id}:`, error);
      throw error;
    }
  },

  createTransaction: async (transactionData: any) => {
    try {
      const transactions = getFromLocalStorage('transactions');
      const newTransaction = {
        ...transactionData,
        id: Date.now().toString(), // Generate a unique ID
        createdAt: new Date().toISOString(),
      };
      transactions.push(newTransaction);
      saveToLocalStorage('transactions', transactions);
      return newTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },

  updateTransaction: async (id: string, transactionData: any) => {
    try {
      const transactions = getFromLocalStorage('transactions');
      const transactionIndex = transactions.findIndex((transaction: any) => transaction.id === id);
      if (transactionIndex !== -1) {
        transactions[transactionIndex] = { ...transactions[transactionIndex], ...transactionData };
        saveToLocalStorage('transactions', transactions);
        return transactions[transactionIndex];
      } else {
        throw new Error(`Transaction with id ${id} not found`);
      }
    } catch (error) {
      console.error(`Error updating transaction ${id}:`, error);
      throw error;
    }
  },

  deleteTransaction: async (id: string) => {
    try {
      const transactions = getFromLocalStorage('transactions');
      const filteredTransactions = transactions.filter((transaction: any) => transaction.id !== id);
      saveToLocalStorage('transactions', filteredTransactions);
      return { id };
    } catch (error) {
      console.error(`Error deleting transaction ${id}:`, error);
      throw error;
    }
  },
};