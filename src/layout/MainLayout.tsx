import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n';
import MobileOptionsMenu from '../components/MobileOptionsMenu';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            {/* Logo and Title - Start aligned */}
            <div className="flex items-center justify-start">
              <div className="h-10 w-10 rounded-xl bg-[var(--expense-color)] flex items-center justify-center shadow-md cursor-pointer" onClick={() => navigate('/dashboard')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="ml-3 text-xl font-bold text-[var(--text-primary)] hidden sm:block">
                {language === 'en' ? 'Tracker' : 'Trình theo dõi'}
              </h1>
            </div>
            
            {/* Right side content - End aligned */}
            <div className="flex items-center space-x-3 justify-end">
              {/* Desktop view - language selector only */}
              <div className="hidden sm:flex items-center space-x-4">
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
              </div>
              
              {/* User info - always visible but compacted on mobile */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">{language === 'en' ? 'Welcome,' : 'Chào mừng,'}</span>
                  <span className="text-xs sm:text-sm color-expense font-medium truncate max-w-[120px]">{user?.username}</span>
                </div>
                <div className="sm:hidden flex flex-col items-end">
                  <span className="text-xs font-medium text-[var(--text-primary)] truncate max-w-[80px]">{user?.username}</span>
                </div>
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-[var(--bg-card-lighter)] flex items-center justify-center border-2 border-[var(--expense-color)]/80">
                  <span className="color-expense font-bold text-sm">{user?.username?.charAt(0)?.toUpperCase()}</span>
                </div>
                
                {/* Mobile menu button - shown only on small screens, now at the end */}
                <div className="sm:hidden flex items-center">
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="p-2 rounded-lg bg-[var(--bg-card-lighter)] text-[var(--text-primary)] hover:bg-[var(--income-color)] hover:text-white transition-all duration-300"
                    aria-label="Menu options"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                
                {/* Desktop menu button - now at the end */}
                <div className="hidden sm:flex items-center">
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="p-2 rounded-lg bg-[var(--bg-card-lighter)] text-[var(--text-primary)] hover:bg-[var(--income-color)] hover:text-white transition-all duration-300"
                    aria-label="Menu options"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Options Menu */}
      <MobileOptionsMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onLogout={handleLogout}
        language={language}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;