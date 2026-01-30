import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Language dictionary
  const translations = {
    en: {
      signIn: "Sign in to your account",
      username: "Username",
      password: "Password",
      signInButton: "Sign in",
      noAccount: "Don't have an account?",
      registerHere: "Register here",
      invalidCredentials: "Invalid username or password",
      welcomeBack: "Welcome Back!",
      financeTracker: "Personal Finance Tracker"
    },
    vi: {
      signIn: "Đăng nhập vào tài khoản của bạn",
      username: "Tên đăng nhập",
      password: "Mật khẩu",
      signInButton: "Đăng nhập",
      noAccount: "Chưa có tài khoản?",
      registerHere: "Đăng ký tại đây",
      invalidCredentials: "Tên đăng nhập hoặc mật khẩu không đúng",
      welcomeBack: "Chào mừng trở lại!",
      financeTracker: "Quản Lý Tài Chính Cá Nhân"
    }
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError(t.invalidCredentials);
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t.financeTracker}
          </h2>
          <p className="mt-2 text-gray-600">
            {t.welcomeBack}
          </p>
        </div>
        
        {/* Language selector */}
        <div className="flex justify-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-xs font-medium rounded-l-lg ${
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
              className={`px-4 py-2 text-xs font-medium rounded-r-md ${
                language === 'vi'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setLanguage('vi')}
            >
              VI
            </button>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4 animate-pulse">
              <div className="text-sm text-red-700 text-center">{error}</div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                {t.username}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 sm:text-sm"
                placeholder={t.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 sm:text-sm"
                placeholder={t.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              {t.signInButton}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {t.noAccount}{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-300">
              {t.registerHere}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;