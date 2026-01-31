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

  const handleUpdateTransaction = async (id: string, updatedTransaction: Partial<any>) => {
    try {
      const updated = await transactionApi.updateTransaction(id, updatedTransaction);
      setTransactions(transactions.map(t => t.id === id ? updated : t));
    } catch (error) {
      console.error('Error updating transaction:', error);
      // Fallback to local state in case of API failure
      setTransactions(transactions.map(t => t.id === id ? {...t, ...updatedTransaction} : t));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <nav className="bg-white shadow-lg shadow-gray-200/50 backdrop-blur-sm bg-opacity-90 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg cursor-pointer" onClick={() => navigate('/dashboard')}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-indigo-100 text-indigo-700 shadow-inner'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    language === 'vi'
                      ? 'bg-indigo-100 text-indigo-700 shadow-inner'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setLanguage('vi')}
                >
                  VI
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-700">{language === 'en' ? 'Welcome,' : 'Chào mừng,'}</span>
                  <span className="text-sm text-indigo-600 font-medium truncate max-w-[120px]">{user?.username}</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center border-2 border-indigo-200">
                  <span className="text-indigo-600 font-bold text-sm">{user?.username?.charAt(0)?.toUpperCase()}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn-animated px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {language === 'en' ? 'Logout' : 'Đăng xuất'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 slide-up">
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-900">{language === 'en' ? 'Transactions' : 'Giao dịch'}</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-animated bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-7 py-3.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {showForm ? (language === 'en' ? 'Cancel' : 'Hủy') : (language === 'en' ? 'Add Transaction' : 'Thêm giao dịch')}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-10 bg-white shadow-xl rounded-2xl p-7 border border-gray-100 shadow-gray-200/30 card-hover">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {language === 'en' ? 'Add New Transaction' : 'Thêm giao dịch mới'}
            </h2>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
        )}

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 shadow-gray-200/30">
          <div className="px-7 py-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {language === 'en' ? 'All Transactions' : 'Tất cả giao dịch'}
            </h2>
          </div>
          <div className="p-7">
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={handleDeleteTransaction}
              onUpdateTransaction={handleUpdateTransaction}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;