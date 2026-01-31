import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n';
import TransactionList from '../components/TransactionList';
import SummaryCard from '../components/SummaryCard';
import ExpenseChart from '../components/ExpenseChart';
import BankRatesTracker from '../components/BankRatesTracker';
import { transactionApi, Transaction } from '../services/api';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage } = useTranslation();
  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  useEffect(() => {
    // Calculate summary values
    let totalIncome = 0;
    let totalExpenses = 0;
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
      }
    });
    
    setIncome(totalIncome);
    setExpenses(totalExpenses);
    // Balance is calculated as income minus expenses (can be negative if expenses exceed income)
    setBalance(totalIncome - totalExpenses);
  }, [transactions]);

  const handleLogout = () => {
    logout();
    navigate('/login');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="bg-transparent sticky top-0 z-10 shadow-sm border-b border-gray-200/50 relative overflow-hidden">
        <div className="absolute inset-0 glass-effect z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/dashboard')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {language === 'en' ? 'Tracker' : 'Trình theo dõi'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
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
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300 ${
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
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{language === 'en' ? 'Welcome,' : 'Chào mừng,'}</span>
                  <span className="text-xs sm:text-sm text-indigo-600 font-medium truncate max-w-[120px]">{user?.username}</span>
                </div>
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center border-2 border-indigo-200">
                  <span className="text-indigo-600 font-bold text-sm">{user?.username?.charAt(0)?.toUpperCase()}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn-animated px-4 py-2 text-xs sm:text-sm border border-transparent font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {language === 'en' ? 'Logout' : 'Đăng xuất'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {language === 'en' ? 'Dashboard' : 'Bảng điều khiển'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' ? 'Welcome back! Here\'s your financial overview.' : 'Chào mừng trở lại! Đây là tổng quan tài chính của bạn.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <SummaryCard title={language === 'en' ? 'Balance' : 'Số dư'} value={balance} type="balance" />
          <SummaryCard title={language === 'en' ? 'Income' : 'Thu nhập'} value={income} type="income" />
          <SummaryCard title={language === 'en' ? 'Expenses' : 'Chi tiêu'} value={expenses} type="expense" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 shadow-lg shadow-gray-200/30">
            <div className="px-4 sm:px-6 lg:px-7 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-gray-200/30">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {language === 'en' ? 'Recent Transactions' : 'Giao dịch gần đây'}
                  </h2>
                </div>
                <Link
                  to="/transactions"
                  className="mt-2 sm:mt-0 btn-animated text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center py-2 px-4 rounded-lg hover:bg-indigo-50/80 transition-all duration-300 w-fit"
                >
                  {language === 'en' ? 'View all' : 'Xem tất cả'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-7">
              <TransactionList 
                transactions={transactions.slice(0, 5)} 
                onDeleteTransaction={handleDeleteTransaction}
                onUpdateTransaction={handleUpdateTransaction}
              />
            </div>
          </div>

          <ExpenseChart 
            transactions={transactions}
          />
        </div>

        <div className="mb-6">
          <BankRatesTracker />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;