import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n';
import { useTheme } from '../context/ThemeContext';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { language, setLanguage } = useTranslation();

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
                {language === 'en' ? 'Tracker' : 'Trình theo dõi'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-[var(--bg-card-lighter)] text-[var(--text-primary)] hover:bg-[var(--income-color)] hover:text-white transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
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
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;