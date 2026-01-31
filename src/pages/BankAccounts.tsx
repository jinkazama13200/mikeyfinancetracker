import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n';
import BankAccountManager from '../components/BankAccountManager';
import { bankAccountApi, BankAccount } from '../services/api';

const BankAccounts: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage } = useTranslation();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  // Load bank accounts for the user
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (user) {
          const userAccounts = await bankAccountApi.getAccountsByUserId(user.id);
          setAccounts(userAccounts);
        }
      } catch (error) {
        console.error('Error fetching bank accounts:', error);
        // Start with empty array if API fails
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAccounts();
    }
  }, [user]);

  const handleAddAccount = async (accountData: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    try {
      if (user) {
        const accountPayload = {
          ...accountData,
          userId: user.id,
        };
        
        const createdAccount = await bankAccountApi.createAccount(accountPayload);
        setAccounts([...accounts, createdAccount]);
      } else {
        // Fallback to local state if no user is logged in
        const newAccount = {
          ...accountData,
          id: Date.now().toString(),
          userId: 'unknown',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setAccounts([...accounts, newAccount]);
      }
    } catch (error) {
      console.error('Error adding bank account:', error);
      // Fallback to local state in case of API failure
      const newAccount = {
        ...accountData,
        id: Date.now().toString(),
        userId: user?.id || 'unknown',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setAccounts([...accounts, newAccount]);
    }
  };

  const handleUpdateAccount = async (id: string, updatedAccount: Partial<BankAccount>) => {
    try {
      const updated = await bankAccountApi.updateAccount(id, updatedAccount);
      setAccounts(accounts.map(acc => acc.id === id ? updated : acc));
    } catch (error) {
      console.error('Error updating bank account:', error);
      // Fallback to local state in case of API failure
      setAccounts(accounts.map(acc => acc.id === id ? {...acc, ...updatedAccount} : acc));
    }
  };

  const handleDeleteAccount = async (id: string) => {
    try {
      await bankAccountApi.deleteAccount(id);
      setAccounts(accounts.filter(acc => acc.id !== id));
    } catch (error) {
      console.error('Error deleting bank account:', error);
      // Fallback to local state in case of API failure
      setAccounts(accounts.filter(acc => acc.id !== id));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{language === 'en' ? 'Loading bank accounts...' : 'Đang tải tài khoản ngân hàng...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            {language === 'en' ? 'Bank Accounts Management' : 'Quản lý tài khoản ngân hàng'}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === 'en' ? 'Track and manage your bank accounts and wallets' : 'Theo dõi và quản lý tài khoản ngân hàng và ví tiền của bạn'}
          </p>
        </div>

        <BankAccountManager 
          accounts={accounts}
          onAddAccount={handleAddAccount}
          onUpdateAccount={handleUpdateAccount}
          onDeleteAccount={handleDeleteAccount}
        />
      </main>
    </div>
  );
};

export default BankAccounts;