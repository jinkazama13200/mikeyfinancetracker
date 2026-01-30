// i18n.ts - Internationalization configuration
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'vi';

// Define translation structure
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Translation resources
const resources: Translations = {
  en: {
    // General
    financeTracker: "Personal Finance Tracker",
    welcome: "Welcome,",
    logout: "Logout",
    
    // Authentication
    signIn: "Sign in",
    signUp: "Sign up",
    username: "Username",
    email: "Email",
    password: "Password",
    
    // Dashboard
    balance: "Balance",
    income: "Income",
    expenses: "Expenses",
    
    // Transactions
    addTransaction: "Add Transaction",
    transactionType: "Transaction Type",
    amount: "Amount",
    description: "Description",
    date: "Date",
    incomeLabel: "Income",  // Changed from 'income' to avoid conflict
    expenseLabel: "Expense", // Changed from 'expense' to avoid conflict
    add: "Add",
    edit: "Edit",
    remove: "Remove",
    deleteConfirmation: "Are you sure you want to delete this transaction?",
    
    // Categories
    food: "Food",
    other: "Other",
    
    // Buttons
    save: "Save",
    update: "Update",
    
    // Messages
    success: "Success",
    error: "Error",
    noData: "No data available",
    tryAgain: "Please try again",
  },
  vi: {
    // General
    financeTracker: "Quản Lý Tài Chính Cá Nhân",
    welcome: "Chào mừng,",
    logout: "Đăng xuất",
    
    // Authentication
    signIn: "Đăng nhập",
    signUp: "Đăng ký",
    username: "Tên đăng nhập",
    email: "Email",
    password: "Mật khẩu",
    
    // Dashboard
    balance: "Số dư",
    income: "Thu nhập",
    expenses: "Chi tiêu",
    
    // Transactions
    addTransaction: "Thêm giao dịch",
    transactionType: "Loại giao dịch",
    amount: "Số tiền",
    description: "Mô tả",
    date: "Ngày",
    incomeLabel: "Thu nhập",  // Changed from 'income' to avoid conflict
    expenseLabel: "Chi tiêu", // Changed from 'expense' to avoid conflict
    add: "Thêm",
    edit: "Sửa",
    remove: "Xóa",
    deleteConfirmation: "Bạn có chắc chắn muốn xóa giao dịch này?",
    
    // Categories
    food: "Đồ ăn",
    other: "Khác",
    
    // Buttons
    save: "Lưu",
    update: "Cập nhật",
    
    // Messages
    success: "Thành công",
    error: "Lỗi",
    noData: "Không có dữ liệu",
    tryAgain: "Vui lòng thử lại",
  }
};

// Create context
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: { defaultValue?: string }) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Hook to use translation
export const useTranslation = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

// Provider component
export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language preference or default to 'en'
    const savedLang = localStorage.getItem('language');
    return (savedLang === 'en' || savedLang === 'vi') ? savedLang as Language : 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string, options?: { defaultValue?: string }): string => {
    const translation = resources[language][key];
    return translation || options?.defaultValue || key; // Return translation, default value, or key if not found
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return React.createElement(
    I18nContext.Provider,
    { value: value },
    children
  );
};