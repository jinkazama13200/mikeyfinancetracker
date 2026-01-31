import React, { useState } from 'react';
import { useTranslation } from '../i18n';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  currency?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction?: (id: string) => void;
  onUpdateTransaction?: (id: string, updatedTransaction: Partial<Transaction>) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onDeleteTransaction,
  onUpdateTransaction
}) => {
  const { language } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Transaction>>({});

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', options);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditForm({ ...transaction });
  };

  const handleSave = (id: string) => {
    if (onUpdateTransaction) {
      onUpdateTransaction(id, editForm);
    }
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {language === 'en' ? 'Description' : 'Mô tả'}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {language === 'en' ? 'Date' : 'Ngày'}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {language === 'en' ? 'Type' : 'Loại'}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {language === 'en' ? 'Amount' : 'Số tiền'}
              </th>
              {(onDeleteTransaction || onUpdateTransaction) && (
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {language === 'en' ? 'Actions' : 'Hành động'}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction.id} className={transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'}>
                  {editingId === transaction.id ? (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input
                          type="text"
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm text-center"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input
                          type="date"
                          value={editForm.date || ''}
                          onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm text-center"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <select
                          value={editForm.type || ''}
                          onChange={(e) => setEditForm({...editForm, type: e.target.value as 'income' | 'expense'})}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm text-center"
                        >
                          <option value="income">{language === 'en' ? 'Income' : 'Thu nhập'}</option>
                          <option value="expense">{language === 'en' ? 'Expense' : 'Chi tiêu'}</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <input
                          type="number"
                          value={editForm.amount || ''}
                          onChange={(e) => setEditForm({...editForm, amount: Number(e.target.value)})}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm text-center"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleSave(transaction.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          {language === 'en' ? 'Save' : 'Lưu'}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          {language === 'en' ? 'Cancel' : 'Hủy'}
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                        {transaction.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.type === 'income'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {transaction.type === 'income' ? 
                            (language === 'en' ? 'Income' : 'Thu nhập') : 
                            (language === 'en' ? 'Expense' : 'Chi tiêu')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <span
                          className={
                            transaction.type === 'income'
                              ? 'text-green-600 font-semibold'
                              : 'text-red-600 font-semibold'
                          }
                        >
                          {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')} {transaction.currency || (language === 'vi' ? 'VND' : 'VND')}
                        </span>
                      </td>
                      {(onDeleteTransaction || onUpdateTransaction) && (
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                          {onUpdateTransaction && (
                            <button
                              onClick={() => handleEdit(transaction)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              {language === 'en' ? 'Edit' : 'Sửa'}
                            </button>
                          )}
                          {onDeleteTransaction && (
                            <button
                              onClick={() => onDeleteTransaction(transaction.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              {language === 'en' ? 'Delete' : 'Xóa'}
                            </button>
                          )}
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={onDeleteTransaction || onUpdateTransaction ? 5 : 4} className="px-6 py-4 text-center text-sm text-gray-500">
                  {language === 'en' ? 'No transactions found' : 'Không có giao dịch nào'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className={`transaction-card ${transaction.type === 'income' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              {editingId === transaction.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Mô tả</label>
                    <input
                      type="text"
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Ngày</label>
                    <input
                      type="date"
                      value={editForm.date || ''}
                      onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Loại</label>
                    <select
                      value={editForm.type || ''}
                      onChange={(e) => setEditForm({...editForm, type: e.target.value as 'income' | 'expense'})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="income">{language === 'en' ? 'Income' : 'Thu nhập'}</option>
                      <option value="expense">{language === 'en' ? 'Expense' : 'Chi tiêu'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Số tiền</label>
                    <input
                      type="number"
                      value={editForm.amount || ''}
                      onChange={(e) => setEditForm({...editForm, amount: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => handleSave(transaction.id)}
                      className="flex-1 text-sm bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600"
                    >
                      {language === 'en' ? 'Save' : 'Lưu'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 text-sm bg-gray-500 text-white py-2 px-3 rounded-lg hover:bg-gray-600"
                    >
                      {language === 'en' ? 'Cancel' : 'Hủy'}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{transaction.description}</h3>
                      <p className="text-sm text-gray-500 mt-1">{formatDate(transaction.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}
                      </p>
                      <span className={`inline-flex text-xs px-2 py-1 rounded-full ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'income' ? 
                          (language === 'en' ? 'Income' : 'Thu nhập') : 
                          (language === 'en' ? 'Expense' : 'Chi tiêu')}
                      </span>
                    </div>
                  </div>
                  {(onDeleteTransaction || onUpdateTransaction) && (
                    <div className="flex justify-end space-x-2 mt-3 pt-2 border-t border-gray-100">
                      {onUpdateTransaction && (
                        <button
                          onClick={() => handleEdit(transaction)}
                          className="text-sm bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600"
                        >
                          {language === 'en' ? 'Edit' : 'Sửa'}
                        </button>
                      )}
                      {onDeleteTransaction && (
                        <button
                          onClick={() => onDeleteTransaction(transaction.id)}
                          className="text-sm bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600"
                        >
                          {language === 'en' ? 'Delete' : 'Xóa'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-sm text-gray-500">
            {language === 'en' ? 'No transactions found' : 'Không có giao dịch nào'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;