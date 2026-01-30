import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TransactionList from '../components/TransactionList';
import SummaryCard from '../components/SummaryCard';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number>(0);

  // Mock data for demonstration
  const [transactions, setTransactions] = useState([
    { id: '1', type: 'income' as const, amount: 2500, description: 'Salary', date: '2023-05-15' },
    { id: '2', type: 'expense' as const, amount: 50, description: 'Groceries', date: '2023-05-16' },
    { id: '3', type: 'expense' as const, amount: 120, description: 'Gas', date: '2023-05-17' },
    { id: '4', type: 'income' as const, amount: 300, description: 'Freelance work', date: '2023-05-18' },
    { id: '5', type: 'expense' as const, amount: 80, description: 'Dinner', date: '2023-05-19' },
  ]);

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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="ml-6 flex items-center">
                <span className="text-xl font-bold text-indigo-600">Personal Finance Tracker</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <span className="text-sm font-medium text-gray-700">Welcome, {user?.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Balance" value={balance} type="balance" />
          <SummaryCard title="Income" value={income} type="income" />
          <SummaryCard title="Expenses" value={expenses} type="expense" />
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
            <Link
              to="/transactions"
              className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          <TransactionList transactions={transactions.slice(0, 5)} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;