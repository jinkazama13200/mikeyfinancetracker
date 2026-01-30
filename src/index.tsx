import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Initialize sample data in localStorage if it doesn't exist
const initializeSampleData = () => {
  // Check if we already have transactions in localStorage
  const existingTransactions = localStorage.getItem('transactions');
  if (!existingTransactions) {
    // Sample transactions data
    const sampleTransactions = [
      {
        id: '1',
        userId: 'sample-user',
        type: 'income',
        amount: 2500000,
        description: 'Lương tháng',
        date: '2025-01-15',
        currency: 'VND',
        createdAt: '2025-01-15T00:00:00Z'
      },
      {
        id: '2',
        userId: 'sample-user',
        type: 'expense',
        amount: 150000,
        description: 'Tiền ăn trưa',
        date: '2025-01-16',
        currency: 'VND',
        createdAt: '2025-01-16T00:00:00Z'
      },
      {
        id: '3',
        userId: 'sample-user',
        type: 'expense',
        amount: 400000,
        description: 'Xăng xe',
        date: '2025-01-17',
        currency: 'VND',
        createdAt: '2025-01-17T00:00:00Z'
      },
      {
        id: '4',
        userId: 'sample-user',
        type: 'income',
        amount: 1000000,
        description: 'Làm thêm',
        date: '2025-01-18',
        currency: 'VND',
        createdAt: '2025-01-18T00:00:00Z'
      },
      {
        id: '5',
        userId: 'sample-user',
        type: 'expense',
        amount: 300000,
        description: 'Ăn tối',
        date: '2025-01-19',
        currency: 'VND',
        createdAt: '2025-01-19T00:00:00Z'
      },
      {
        id: '6',
        userId: 'sample-user',
        type: 'expense',
        amount: 50000,
        description: 'Cà phê',
        date: '2025-01-20',
        currency: 'VND',
        createdAt: '2025-01-20T00:00:00Z'
      },
      {
        id: '7',
        userId: 'sample-user',
        type: 'income',
        amount: 500000,
        description: 'Tiền thưởng',
        date: '2025-01-21',
        currency: 'VND',
        createdAt: '2025-01-21T00:00:00Z'
      }
    ];
    
    localStorage.setItem('transactions', JSON.stringify(sampleTransactions));
  }
  
  // Check if we have users in localStorage
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    // Sample user data
    const sampleUsers = [
      {
        id: 'sample-user',
        username: 'sample',
        email: 'sample@example.com',
        password: 'password123' // In a real app, this would be hashed
      }
    ];
    
    localStorage.setItem('users', JSON.stringify(sampleUsers));
  }
};

// Initialize sample data before rendering the app
initializeSampleData();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
