import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { language } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError(language === 'en' ? 'Invalid credentials. Please try again.' : 'Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.');
      }
    } catch (err) {
      setError(language === 'en' ? 'An error occurred during login.' : 'Đã xảy ra lỗi trong quá trình đăng nhập.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Personal Finance Tracker' : 'Quản Lý Tài Chính Cá Nhân'}
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            {language === 'en' ? 'Sign in to your account' : 'Đăng nhập vào tài khoản của bạn'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-100 shadow-sm animate-pulse">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Username' : 'Tên đăng nhập'}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="input-focus block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300"
                placeholder={language === 'en' ? 'Enter your username' : 'Nhập tên đăng nhập'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {language === 'en' ? 'Password' : 'Mật khẩu'}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-focus block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300"
                placeholder={language === 'en' ? 'Enter your password' : 'Nhập mật khẩu'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-animated w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5"
            >
              {language === 'en' ? 'Sign in' : 'Đăng nhập'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link 
            to="/register" 
            className="btn-animated inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 text-base px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
          >
            {language === 'en' ? "Don't have an account? Register here" : "Chưa có tài khoản? Đăng ký tại đây"}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;