import React, { useState } from 'react';
import { useTranslation } from '../i18n';

export interface TransactionFormData {
  type: 'income' | 'expense';
  amount: string;
  description: string;
  date: string;
  currency: string;
}

interface TransactionFormProps {
  onAddTransaction: (transaction: TransactionFormData) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const { language } = useTranslation();
  const [formData, setFormData] = useState<TransactionFormData>({
    type: 'expense',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    currency: 'VND',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTransaction(formData);
    
    // Reset form
    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      currency: 'VND',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            {language === 'en' ? 'Type' : 'Loại giao dịch'}
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input-focus mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 rounded-xl shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
          >
            <option value="income">{language === 'en' ? 'Income' : 'Thu nhập'}</option>
            <option value="expense">{language === 'en' ? 'Expense' : 'Chi tiêu'}</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            {language === 'en' ? 'Amount' : 'Số tiền'}
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
            className="input-focus mt-1 block w-full pl-4 pr-4 py-3 text-base border border-gray-300 rounded-xl shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
            placeholder={language === 'en' ? '0.00' : '0.00'}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
            {language === 'en' ? 'Currency' : 'Tiền tệ'}
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="input-focus mt-1 block w-full pl-3 pr-10 py-3 text-base border border-gray-300 rounded-xl shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
          >
            <option value="VND">{language === 'en' ? 'Vietnamese Dong (VND)' : 'Đồng Việt Nam (VND)'}</option>
            <option value="USD">{language === 'en' ? 'US Dollar (USD)' : 'Đô la Mỹ (USD)'}</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            {language === 'en' ? 'Date' : 'Ngày'}
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="input-focus mt-1 block w-full pl-3 pr-3 py-3 text-base border border-gray-300 rounded-xl shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            {language === 'en' ? 'Description' : 'Mô tả'}
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="input-focus mt-1 block w-full pl-4 pr-4 py-3 text-base border border-gray-300 rounded-xl shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-400"
            placeholder={language === 'en' ? 'Enter description' : 'Nhập mô tả'}
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="btn-animated ml-3 inline-flex justify-center py-3 px-6 border border-transparent shadow-lg text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
        >
          {language === 'en' ? 'Add Transaction' : 'Thêm giao dịch'}
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;