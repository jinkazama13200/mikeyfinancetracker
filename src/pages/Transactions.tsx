import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n';
import TransactionForm, { TransactionFormData } from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { transactionApi, Transaction } from '../services/api';

const Transactions: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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

  const handleAddTransaction = async (transaction: TransactionFormData) => {
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
          userId: 'unknown',
          createdAt: new Date().toISOString()
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
        userId: user?.id || 'unknown',
        createdAt: new Date().toISOString()
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

  const handleUpdateTransaction = async (id: string, updatedTransaction: Partial<Transaction>) => {
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
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <nav className="backdrop-blur-sm sticky top-0 z-10 shadow-sm border-b border-[var(--border-color)] relative overflow-hidden">
        <div className="absolute inset-0 glass-effect z-0 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-xl bg-[var(--expense-color)] flex items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/dashboard')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-bold text-[var(--text-primary)]">
                {language === 'en' ? 'Transactions' : 'Giao dịch'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-[var(--bg-card-lighter)] text-[var(--text-primary)] shadow-inner'
                      : 'bg-[var(--bg-card-lighter)] text-[var(--text-primary)] hover:bg-[var(--income-color)]/80'
                  }`}
                  onClick={() => setLanguage('en')}
                >
                  EN
                </button>
                <button
                  type="button"
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
                    language === 'vi'
                      ? 'bg-[var(--bg-card-lighter)] text-[var(--text-primary)] shadow-inner'
                      : 'bg-[var(--bg-card-lighter)] text-[var(--text-primary)] hover:bg-[var(--income-color)]/80'
                  }`}
                  onClick={() => setLanguage('vi')}
                >
                  VI
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">{language === 'en' ? 'Welcome,' : 'Chào mừng,'}</span>
                  <span className="text-xs sm:text-sm color-expense font-medium truncate max-w-[120px]">{user?.username}</span>
                </div>
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[var(--bg-card-lighter)] flex items-center justify-center border-2 border-[var(--expense-color)]/80">
                  <span className="color-expense font-bold text-sm">{user?.username?.charAt(0)?.toUpperCase()}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn-animated px-4 py-2 text-xs sm:text-sm border border-transparent font-medium rounded-lg text-white bg-[var(--expense-color)] hover:bg-[var(--expense-color)]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--expense-color)] shadow-sm hover:shadow-md transition-all duration-300"
              >
                {language === 'en' ? 'Logout' : 'Đăng xuất'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-[var(--text-primary)]">{language === 'en' ? 'Transactions' : 'Giao dịch'}</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-animated bg-[var(--income-color)] text-white px-7 py-3.5 rounded-xl hover:bg-[var(--income-color)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--income-color)] shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {showForm ? (language === 'en' ? 'Cancel' : 'Hủy') : (language === 'en' ? 'Add Transaction' : 'Thêm giao dịch')}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-10 backdrop-blur-sm rounded-2xl p-7 border border-[var(--border-color)] card-hover bg-[var(--bg-card-lighter)]">
            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 color-income" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {language === 'en' ? 'Add New Transaction' : 'Thêm giao dịch mới'}
            </h2>
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
        )}

        <div className="backdrop-blur-sm rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card-lighter)]">
          <div className="px-7 py-6 border-b border-[var(--border-color)] bg-[var(--bg-card-lightest)]">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 color-income" viewBox="0 0 20 20" fill="currentColor">
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