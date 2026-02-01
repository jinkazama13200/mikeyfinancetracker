import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../i18n';
import TransactionForm, { TransactionFormData } from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { transactionApi, Transaction } from '../services/api';

const Transactions: React.FC = () => {
  const { user } = useAuth();
  const { language } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Load transactions for the user
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (user) {
          const userTransactions = await transactionApi.getTransactionsByUserId(user.id);
          setTransactions(userTransactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        // Start with empty array if API fails
        setTransactions([]);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const handleAddTransaction = async (transaction: TransactionFormData) => {
    try {
      if (user) {
        const transactionData = {
          ...transaction,
          userId: user.id, // Associate transaction with user
          amount: parseFloat(transaction.amount),
          createdAt: new Date().toISOString()
        };
        
        const createdTransaction = await transactionApi.createTransaction(transactionData);
        setTransactions([createdTransaction, ...transactions]);
      } else {
        // Fallback to local state if no user is logged in
        const newTransaction = {
          ...transaction,
          id: Date.now().toString(),
          amount: parseFloat(transaction.amount),
          userId: 'unknown',
          createdAt: new Date().toISOString()
        };
        setTransactions([newTransaction, ...transactions]);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
      // Fallback to local state in case of API failure
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        amount: parseFloat(transaction.amount),
        userId: user?.id || 'unknown',
        createdAt: new Date().toISOString()
      };
      setTransactions([newTransaction, ...transactions]);
      setShowForm(false);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await transactionApi.deleteTransaction(id);
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      // Fallback to local state in case of API failure
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    }
  };

  const handleUpdateTransaction = async (id: string, updatedTransaction: Partial<Transaction>) => {
    try {
      const updated = await transactionApi.updateTransaction(id, updatedTransaction);
      setTransactions(transactions.map(t => t.id === id ? updated : t));
    } catch (error) {
      console.error('Error updating transaction:', error);
      // Fallback to local state in case of API failure
      setTransactions(transactions.map(t => t.id === id ? {...t, ...updatedTransaction} : t));
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">{language === 'en' ? 'Transactions' : 'Giao dịch'}</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-animated bg-[var(--income-color)] text-white px-7 py-3.5 rounded-xl hover:bg-[var(--income-color)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--income-color)] shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {showForm ? (language === 'en' ? 'Cancel' : 'Hủy') : (language === 'en' ? 'Add Transaction' : 'Thêm giao dịch')}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-10 backdrop-blur-sm rounded-2xl p-7 border border-[var(--border-color)] card-hover bg-[var(--bg-card-lighter)]">
          <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 color-income" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {language === 'en' ? 'Add New Transaction' : 'Thêm giao dịch mới'}
          </h2>
          <TransactionForm onAddTransaction={handleAddTransaction} />
        </div>
      )}

      <div className="backdrop-blur-sm rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-card-lighter)]">
        <div className="px-7 py-6 border-b border-[var(--border-color)] bg-[var(--bg-card-lightest)]">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 color-income" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {language === 'en' ? 'All Transactions' : 'Tất cả giao dịch'}
          </h2>
        </div>
        <div className="p-7">
          <TransactionList 
            transactions={transactions} 
            onDeleteTransaction={handleDeleteTransaction}
            onUpdateTransaction={handleUpdateTransaction}
          />
        </div>
      </div>
    </main>
  );
};

export default Transactions;