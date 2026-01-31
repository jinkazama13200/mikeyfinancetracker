import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();
  const { language } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError(language === 'en' ? 'Passwords do not match' : 'Mật khẩu không khớp');
      return;
    }
    
    try {
      const success = await register(username, email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError(language === 'en' ? 'Registration failed. Please try again.' : 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      setError(language === 'en' ? 'An error occurred during registration.' : 'Đã xảy ra lỗi trong quá trình đăng ký.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {language === 'en' ? 'Personal Finance Tracker' : 'Quản Lý Tài Chính Cá Nhân'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {language === 'en' ? 'Create a new account' : 'Tạo tài khoản mới'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                {language === 'en' ? 'Username' : 'Tên đăng nhập'}
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={language === 'en' ? 'Username' : 'Tên đăng nhập'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                {language === 'en' ? 'Email' : 'Email'}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={language === 'en' ? 'Email' : 'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {language === 'en' ? 'Password' : 'Mật khẩu'}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={language === 'en' ? 'Password' : 'Mật khẩu'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                {language === 'en' ? 'Confirm Password' : 'Xác nhận mật khẩu'}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={language === 'en' ? 'Confirm Password' : 'Xác nhận mật khẩu'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md hover:shadow-lg transition duration-300"
            >
              {language === 'en' ? 'Register' : 'Đăng ký'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            {language === 'en' ? 'Already have an account? Sign in' : 'Đã có tài khoản? Đăng nhập'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;