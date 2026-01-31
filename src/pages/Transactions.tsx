import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { transactionApi } from '../services/api';

const Transactions: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage } = useTranslation();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

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
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900 cursor-pointer hover:text-indigo-700" onClick={() => window.location.href='/dashboard'}>Personal Finance Tracker</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    className={`px-4 py-2 text-xs font-medium rounded-l-lg ${
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
                    className={`px-4 py-2 text-xs font-medium rounded-r-md ${
                      language === 'vi'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setLanguage('vi')}
                  >
                    VI
                  </button>
                </div>
              </div>
              
              <div className="mr-2">
                <span className="text-sm font-medium text-gray-700">Welcome, {user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md hover:shadow-lg transition duration-300"
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
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition duration-300"
            >
              {showForm ? 'Cancel' : '+ Add Transaction'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8 bg-white shadow-xl rounded-lg p-6 transform transition duration-500 hover:scale-[1.01]">
            <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New Transaction
            </h2>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
        )}

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              All Transactions
            </h2>
          </div>
          <div className="p-6">
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

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