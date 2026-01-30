import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TransactionList from '../components/TransactionList';
import SummaryCard from '../components/SummaryCard';
import axios from 'axios';

const API_URL = 'https://64de102a825d19d9bfb1f7ba.mockapi.io/users';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);

  // Mock data for demonstration
  const [transactions, setTransactions] = useState<any[]>([]);

  // Load transactions for the user
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Since our mock API doesn't have a transactions endpoint, we'll use mock data
        // In a real application, we would fetch user's transactions from the API
        const mockTransactions = [
          { id: '1', type: 'income' as const, amount: 2500, description: 'Salary', date: '2023-05-15' },
          { id: '2', type: 'expense' as const, amount: 50, description: 'Groceries', date: '2023-05-16' },
          { id: '3', type: 'expense' as const, amount: 120, description: 'Gas', date: '2023-05-17' },
          { id: '4', type: 'income' as const, amount: 300, description: 'Freelance work', date: '2023-05-18' },
          { id: '5', type: 'expense' as const, amount: 80, description: 'Dinner', date: '2023-05-19' },
        ];
        
        setTransactions(mockTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  useEffect(() => {
    // Calculate summary values
    let totalIncome = 0;
    let totalExpenses = 0;
    
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
      }
    });
    
    setIncome(totalIncome);
    setExpenses(totalExpenses);
    setBalance(totalIncome - totalExpenses);
  }, [transactions]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">FinanceTracker</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-sm font-medium text-gray-700">Welcome, {user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md hover:shadow-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Overview of your financial activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Balance" value={balance} type="balance" />
          <SummaryCard title="Income" value={income} type="income" />
          <SummaryCard title="Expenses" value={expenses} type="expense" />
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
              <Link
                to="/transactions"
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium flex items-center"
              >
                View all
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="p-6">
            <TransactionList transactions={transactions.slice(0, 5)} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;