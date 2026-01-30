import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { transactionApi } from '../services/api';

const Transactions: React.FC = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  // Load transactions for the user
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (user) {
          const userTransactions = await transactionApi.getTransactionsByUserId(user.id);
          setTransactions(userTransactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        // Start with empty array if API fails
        setTransactions([]);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const handleAddTransaction = async (transaction: any) => {
    try {
      if (user) {
        const transactionData = {
          ...transaction,
          userId: user.id, // Associate transaction with user
          amount: parseFloat(transaction.amount),
          createdAt: new Date().toISOString()
        };
        
        const createdTransaction = await transactionApi.createTransaction(transactionData);
        setTransactions([createdTransaction, ...transactions]);
      } else {
        // Fallback to local state if no user is logged in
        const newTransaction = {
          ...transaction,
          id: Date.now().toString(),
          amount: parseFloat(transaction.amount),
        };
        setTransactions([newTransaction, ...transactions]);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
      // Fallback to local state in case of API failure
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        amount: parseFloat(transaction.amount),
      };
      setTransactions([newTransaction, ...transactions]);
      setShowForm(false);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await transactionApi.deleteTransaction(id);
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      // Fallback to local state in case of API failure
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    }
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
                <span className="text-xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-800" onClick={() => window.location.href='/'}>Personal Finance Tracker</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language selector */}
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-3 py-1 text-xs font-medium rounded-l-lg ${
                    language === 'en'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-xs font-medium rounded-r-md ${
                    language === 'vi'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setLanguage('vi')}
                >
                  VI
                </button>
              </div>
              
              <div className="mr-2">
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