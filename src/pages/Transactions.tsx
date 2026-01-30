import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import axios from 'axios';

const API_URL = 'https://64de102a825d19d9bfb1f7ba.mockapi.io/users';

const Transactions: React.FC = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Load transactions for the user
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Since our mock API doesn't have a transactions endpoint, we'll use mock data
        // In a real application, we would fetch user's transactions from the API
        setTransactions([
          { id: '1', type: 'income' as const, amount: 2500, description: 'Salary', date: '2023-05-15' },
          { id: '2', type: 'expense' as const, amount: 50, description: 'Groceries', date: '2023-05-16' },
          { id: '3', type: 'expense' as const, amount: 120, description: 'Gas', date: '2023-05-17' },
          { id: '4', type: 'income' as const, amount: 300, description: 'Freelance work', date: '2023-05-18' },
          { id: '5', type: 'expense' as const, amount: 80, description: 'Dinner', date: '2023-05-19' },
          { id: '6', type: 'expense' as const, amount: 25, description: 'Coffee', date: '2023-05-20' },
          { id: '7', type: 'income' as const, amount: 150, description: 'Gift', date: '2023-05-21' },
        ]);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const handleAddTransaction = (transaction: any) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString() // Using timestamp for unique ID
    };
    setTransactions([newTransaction, ...transactions]);
    setShowForm(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="ml-6 flex items-center">
                <span className="text-xl font-bold text-indigo-600">Personal Finance Tracker</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-sm font-medium text-gray-700">Welcome, {user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {showForm ? 'Cancel' : '+ Add Transaction'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Transaction</h2>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">All Transactions</h2>
          <TransactionList 
            transactions={transactions} 
            onDeleteTransaction={handleDeleteTransaction} 
          />
        </div>
      </main>
    </div>
  );
};

export default Transactions;