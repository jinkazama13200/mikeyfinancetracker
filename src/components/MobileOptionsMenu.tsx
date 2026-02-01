import React from 'react';
import { useTranslation } from '../i18n';
import { useTheme } from '../context/ThemeContext';

interface MobileOptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  language: string;
}

const MobileOptionsMenu: React.FC<MobileOptionsMenuProps> = ({ isOpen, onClose, onLogout, language }) => {
  const { setLanguage } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  const handleLanguageChange = (lang: 'en' | 'vi') => {
    setLanguage(lang);
    setTimeout(() => onClose(), 300);
  };

  const handleLogoutClick = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Menu */}
      <div className="relative bg-[var(--bg-primary)] rounded-2xl shadow-xl border border-[var(--border-color)] w-4/5 max-w-sm p-6 mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {language === 'en' ? 'Options' : 'Tùy chọn'}
          </h3>
          <button 
            onClick={onClose}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-5">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              {language === 'en' ? 'Language' : 'Ngôn ngữ'}
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-[var(--bg-card-lighter)] text-[var(--text-primary)] shadow-inner'
                    : 'bg-[var(--bg-card-lighter)] text-[var(--text-primary)] hover:bg-[var(--income-color)]/80'
                }`}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
              <button
                type="button"
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  language === 'vi'
                    ? 'bg-[var(--bg-card-lighter)] text-[var(--text-primary)] shadow-inner'
                    : 'bg-[var(--bg-card-lighter)] text-[var(--text-primary)] hover:bg-[var(--income-color)]/80'
                }`}
                onClick={() => handleLanguageChange('vi')}
              >
                Tiếng Việt
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
              {language === 'en' ? 'Theme' : 'Chủ đề'}
            </label>
            <button
              onClick={toggleTheme}
              className="w-full p-3 rounded-lg bg-[var(--bg-card-lighter)] text-[var(--text-primary)] hover:bg-[var(--income-color)] hover:text-white transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  {language === 'en' ? 'Dark Mode' : 'Chế độ tối'}
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1zm" clipRule="evenodd" />
                  </svg>
                  {language === 'en' ? 'Light Mode' : 'Chế độ sáng'}
                </>
              )}
            </button>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogoutClick}
              className="w-full p-3 rounded-lg bg-[var(--expense-color)] text-white hover:bg-[var(--expense-color)]/80 transition-all duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              {language === 'en' ? 'Logout' : 'Đăng xuất'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileOptionsMenu;