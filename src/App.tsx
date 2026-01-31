import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './i18n';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import './App.css';
import './responsive.css';

function App() {
  const [key, setKey] = useState(0); // State to force re-render when language changes
  
  // Listen for language changes to trigger re-render
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language') {
        setKey(prev => prev + 1); // Increment key to force re-render
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <I18nProvider key={key}>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
