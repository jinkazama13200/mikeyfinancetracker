import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { transactionApi } from '../services/api';

const Transactions: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [language, setLanguage] = useState<'en' | 'vi'>('en');

  // Language dictionary
  const translations = {
    en: {
      transactions: "Transactions",
      addTransaction: "+ Add Transaction",
      cancel: "Cancel",
      addNewTransaction: "Add New Transaction",
      allTransactions: "All Transactions",
      financeTracker: "Personal Finance Tracker",
      logout: "Logout",
      welcome: "Welcome,",
      deleteConfirmation: "Are you sure you want to delete this transaction?"
    },
    vi: {
      transactions: "Giao Dịch",
      addTransaction: "+ Thêm Giao Dịch",
      cancel: "Hủy",
      addNewTransaction: "Thêm Giao Dịch Mới",
      allTransactions: "Tất Cả Giao Dịch",
      financeTracker: "Quản Lý Tài Chính Cá Nhân",
      logout: "Đăng Xuất",
      welcome: "Chào mừng,",
      deleteConfirmation: "Bạn có chắc chắn muốn xóa giao dịch này?"
    }
  };

  const t = translations[language];

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
        // Fallback to mock data if API fails
        setTransactions([
          { id: '1', type: 'income' as const, amount: 2500000, description: 'Lương', date: '2023-05-15', currency: 'VND' },
          { id: '2', type: 'expense' as const, amount: 150000, description: 'Tiền ăn', date: '2023-05-16', currency: 'VND' },
          { id: '3', type: 'expense' as const, amount: 400000, description: 'Xăng xe', date: '2023-05-17', currency: 'VND' },
          { id: '4', type: 'income' as const, amount: 1000000, description: 'Làm thêm', date: '2023-05-18', currency: 'VND' },
          { id: '5', type: 'expense' as const, amount: 300000, description: 'Ăn tối', date: '2023-05-19', currency: 'VND' },
          { id: '6', type: 'expense' as const, amount: 50000, description: 'Cà phê', date: '2023-05-20', currency: 'VND' },
          { id: '7', type: 'income' as const, amount: 500000, description: 'Quà tặng', date: '2023-05-21', currency: 'VND' },
        ]);
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
    if (window.confirm(t.deleteConfirmation)) {
      try {
        await transactionApi.deleteTransaction(id);
        setTransactions(transactions.filter(transaction => transaction.id !== id));
      } catch (error) {
        console.error('Error deleting transaction:', error);
        // Fallback to local state in case of API failure
        setTransactions(transactions.filter(transaction => transaction.id !== id));
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
                <span className="ml-2 text-xl font-bold text-gray-900">{t.financeTracker}</span>
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
                <span className="text-sm font-medium text-gray-700">{t.welcome} {user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md hover:shadow-lg transition duration-300"
              >
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">{t.transactions}</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition duration-300"
            >
              {showForm ? t.cancel : t.addTransaction}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8 bg-white shadow-xl rounded-lg p-6 transform transition duration-500 hover:scale-[1.01]">
            <h2 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {t.addNewTransaction}
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
              {t.allTransactions}
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

export default Transactions;