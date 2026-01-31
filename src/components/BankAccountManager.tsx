import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';
import { BankAccount } from '../types/BankAccount';

interface BankAccountManagerProps {
  accounts: BankAccount[];
  onAddAccount: (account: Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => void;
  onUpdateAccount: (id: string, updatedAccount: Partial<BankAccount>) => void;
  onDeleteAccount: (id: string) => void;
}

const BankAccountManager: React.FC<BankAccountManagerProps> = ({ 
  accounts, 
  onAddAccount, 
  onUpdateAccount, 
  onDeleteAccount 
}) => {
  const { language } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<BankAccount, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>({
    name: '',
    accountNumber: '',
    balance: 0,
    currency: 'VND',
    isActive: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(val) : val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      onUpdateAccount(editingId, formData);
    } else {
      onAddAccount(formData);
    }
    
    resetForm();
  };

  const handleEdit = (account: BankAccount) => {
    setFormData({
      name: account.name,
      accountNumber: account.accountNumber,
      balance: account.balance,
      currency: account.currency,
      isActive: account.isActive,
    });
    setEditingId(account.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      accountNumber: '',
      balance: 0,
      currency: 'VND',
      isActive: true,
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-gray-200/30">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            {language === 'en' ? 'Bank Accounts' : 'Tài khoản ngân hàng'}
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-animated bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition duration-300 flex items-center text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            {showForm ? (language === 'en' ? 'Cancel' : 'Hủy') : (language === 'en' ? 'Add Account' : 'Thêm tài khoản')}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-6 border-b border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Account Name' : 'Tên tài khoản'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-focus block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={language === 'en' ? 'e.g., Vietcombank, Techcombank' : 'Ví dụ: Vietcombank, Techcombank'}
                />
              </div>
              
              <div>
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Account Number' : 'Số tài khoản'}
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  required
                  className="input-focus block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={language === 'en' ? 'Account number' : 'Số tài khoản'}
                />
              </div>
              
              <div>
                <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Balance' : 'Số dư'}
                </label>
                <input
                  type="number"
                  id="balance"
                  name="balance"
                  value={formData.balance}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="input-focus block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={language === 'en' ? 'Current balance' : 'Số dư hiện tại'}
                />
              </div>
              
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'en' ? 'Currency' : 'Tiền tệ'}
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="input-focus block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="VND">{language === 'en' ? 'Vietnamese Dong (VND)' : 'Đồng Việt Nam (VND)'}</option>
                  <option value="USD">{language === 'en' ? 'US Dollar (USD)' : 'Đô la Mỹ (USD)'}</option>
                  <option value="EUR">{language === 'en' ? 'Euro (EUR)' : 'Euro (EUR)'}</option>
                  <option value="JPY">{language === 'en' ? 'Japanese Yen (JPY)' : 'Yên Nhật (JPY)'}</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                    {language === 'en' ? 'Active Account' : 'Tài khoản hoạt động'}
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {language === 'en' ? 'Cancel' : 'Hủy'}
              </button>
              <button
                type="submit"
                className="btn-animated inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {editingId 
                  ? (language === 'en' ? 'Update Account' : 'Cập nhật tài khoản') 
                  : (language === 'en' ? 'Add Account' : 'Thêm tài khoản')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="p-6">
        {accounts.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {language === 'en' ? 'No bank accounts' : 'Chưa có tài khoản ngân hàng'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {language === 'en' ? 'Get started by creating a new bank account.' : 'Bắt đầu bằng cách tạo tài khoản ngân hàng mới.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <div 
                key={account.id} 
                className={`border rounded-lg p-4 shadow-sm ${
                  account.isActive 
                    ? 'border-indigo-200 bg-indigo-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{account.name}</h4>
                    <p className="text-sm text-gray-500">{account.accountNumber}</p>
                    <p className={`mt-2 text-lg font-semibold ${
                      account.isActive ? 'text-indigo-700' : 'text-gray-500'
                    }`}>
                      {account.balance.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')} {account.currency}
                    </p>
                  </div>
                  <div className={`h-3 w-3 rounded-full ${account.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(account)}
                    className="text-xs bg-indigo-100 text-indigo-700 py-1.5 px-3 rounded hover:bg-indigo-200"
                  >
                    {language === 'en' ? 'Edit' : 'Sửa'}
                  </button>
                  <button
                    onClick={() => onDeleteAccount(account.id)}
                    className="text-xs bg-red-100 text-red-700 py-1.5 px-3 rounded hover:bg-red-200"
                  >
                    {language === 'en' ? 'Delete' : 'Xóa'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BankAccountManager;