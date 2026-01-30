// i18n.ts - Internationalization configuration
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define available languages
type Language = 'en' | 'vi';

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
    cancel: "Cancel",
    delete: "Delete",
    confirm: "Confirm",
    close: "Close",
    
    // Navigation
    dashboard: "Dashboard",
    transactions: "Transactions",
    reports: "Reports",
    settings: "Settings",
    
    // Authentication
    signIn: "Sign in",
    signUp: "Sign up",
    signOut: "Sign out",
    username: "Username",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    registerHere: "Register here",
    signInHere: "Sign in here",
    invalidCredentials: "Invalid username or password",
    passwordsNotMatch: "Passwords do not match",
    
    // Dashboard
    balance: "Balance",
    income: "Income",
    expenses: "Expenses",
    totalIncome: "Total Income",
    totalExpenses: "Total Expenses",
    recentTransactions: "Recent Transactions",
    viewAll: "View all",
    
    // Transactions
    addTransaction: "Add Transaction",
    transactionType: "Transaction Type",
    amount: "Amount",
    description: "Description",
    date: "Date",
    category: "Category",
    income: "Income",
    expense: "Expense",
    add: "Add",
    edit: "Edit",
    remove: "Remove",
    deleteConfirmation: "Are you sure you want to delete this transaction?",
    
    // Categories
    food: "Food",
    transport: "Transport",
    shopping: "Shopping",
    entertainment: "Entertainment",
    bills: "Bills",
    salary: "Salary",
    gift: "Gift",
    other: "Other",
    
    // Buttons
    save: "Save",
    update: "Update",
    search: "Search",
    filter: "Filter",
    reset: "Reset",
    
    // Messages
    success: "Success",
    error: "Error",
    loading: "Loading...",
    noData: "No data available",
    tryAgain: "Please try again",
    
    // Forms
    requiredField: "This field is required",
    invalidEmail: "Please enter a valid email",
    minLength: "Must be at least {{count}} characters",
    maxLength: "Must be less than {{count}} characters",
  },
  vi: {
    // General
    financeTracker: "Quản Lý Tài Chính Cá Nhân",
    welcome: "Chào mừng,",
    logout: "Đăng xuất",
    cancel: "Hủy",
    delete: "Xóa",
    confirm: "Xác nhận",
    close: "Đóng",
    
    // Navigation
    dashboard: "Bảng điều khiển",
    transactions: "Giao dịch",
    reports: "Báo cáo",
    settings: "Cài đặt",
    
    // Authentication
    signIn: "Đăng nhập",
    signUp: "Đăng ký",
    signOut: "Đăng xuất",
    username: "Tên đăng nhập",
    email: "Email",
    password: "Mật khẩu",
    confirmPassword: "Xác nhận mật khẩu",
    forgotPassword: "Quên mật khẩu?",
    dontHaveAccount: "Chưa có tài khoản?",
    alreadyHaveAccount: "Đã có tài khoản?",
    registerHere: "Đăng ký tại đây",
    signInHere: "Đăng nhập tại đây",
    invalidCredentials: "Tên đăng nhập hoặc mật khẩu không đúng",
    passwordsNotMatch: "Mật khẩu không khớp",
    
    // Dashboard
    balance: "Số dư",
    income: "Thu nhập",
    expenses: "Chi tiêu",
    totalIncome: "Tổng thu nhập",
    totalExpenses: "Tổng chi tiêu",
    recentTransactions: "Giao dịch gần đây",
    viewAll: "Xem tất cả",
    
    // Transactions
    addTransaction: "Thêm giao dịch",
    transactionType: "Loại giao dịch",
    amount: "Số tiền",
    description: "Mô tả",
    date: "Ngày",
    category: "Danh mục",
    income: "Thu nhập",
    expense: "Chi tiêu",
    add: "Thêm",
    edit: "Sửa",
    remove: "Xóa",
    deleteConfirmation: "Bạn có chắc chắn muốn xóa giao dịch này?",
    
    // Categories
    food: "Đồ ăn",
    transport: "Giao thông",
    shopping: "Mua sắm",
    entertainment: "Giải trí",
    bills: "Hóa đơn",
    salary: "Lương",
    gift: "Quà tặng",
    other: "Khác",
    
    // Buttons
    save: "Lưu",
    update: "Cập nhật",
    search: "Tìm kiếm",
    filter: "Lọc",
    reset: "Đặt lại",
    
    // Messages
    success: "Thành công",
    error: "Lỗi",
    loading: "Đang tải...",
    noData: "Không có dữ liệu",
    tryAgain: "Vui lòng thử lại",
    
    // Forms
    requiredField: "Trường này là bắt buộc",
    invalidEmail: "Vui lòng nhập email hợp lệ",
    minLength: "Phải có ít nhất {{count}} ký tự",
    maxLength: "Phải ít hơn {{count}} ký tự",
  }
};

// Create context
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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
  const t = (key: string): string => {
    const translation = resources[language][key];
    return translation || key; // Return key if translation not found
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};