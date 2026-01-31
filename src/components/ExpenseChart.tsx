import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTranslation } from '../i18n';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  currency?: string;
  userId: string;
  createdAt?: string;
}

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

interface ExpenseChartProps {
  transactions: Transaction[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions }) => {
  const { language } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState<string>('all'); // 'all' or 'YYYY-MM'

  // Get unique months from transactions
  const uniqueMonths = useMemo(() => {
    const monthsSet = new Set<string>();
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const date = new Date(t.date);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthsSet.add(month);
      });
    return Array.from(monthsSet).sort().reverse(); // Sort in descending order (newest first)
  }, [transactions]);

  // Filter expenses by selected month
  const filteredExpenses = useMemo(() => {
    const filteredTransactions = selectedMonth === 'all' 
      ? transactions.filter(t => t.type === 'expense')
      : transactions.filter(t => {
          const transactionDate = new Date(t.date);
          const transactionMonth = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;
          return t.type === 'expense' && transactionMonth === selectedMonth;
        });

    // Group expenses by description and sum amounts
    const groupedExpenses = filteredTransactions.reduce((categories, transaction) => {
      const existingCategory = categories.find(cat => cat.name === transaction.description);
      if (existingCategory) {
        existingCategory.value += transaction.amount;
      } else {
        categories.push({
          name: transaction.description,
          value: transaction.amount,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        });
      }
      return categories;
    }, [] as { name: string; value: number; color: string }[]);

    return groupedExpenses;
  }, [transactions, selectedMonth]);

  // Calculate total expenses for selected period
  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum, category) => sum + category.value, 0);
  }, [filteredExpenses]);

  // Format month for display
  const formatMonth = (month: string) => {
    if (month === 'all') return language === 'en' ? 'All Months' : 'Tất cả các tháng';
    const [year, monthNum] = month.split('-');
    return language === 'en' 
      ? `${monthNum}/${year}` 
      : `${monthNum}/${year}`;
  };

  // Colors for different expense categories
  const COLORS = [
    '#FF6384', // Hồng
    '#36A2EB', // Xanh dương
    '#FFCE56', // Vàng
    '#4BC0C0', // Xanh ngọc
    '#9966FF', // Tím
    '#FF9F40', // Cam
    '#FF6384', // Hồng đậm
    '#C9CBCF', // Xám
    '#4BC0C0', // Xanh biển
    '#FFCD56'  // Vàng nhạt
  ];

  // Format tooltip label
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="10px"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-gray-200/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">
              {language === 'en' ? 'Expense Analysis' : 'Phân tích chi tiêu'}
            </h3>
          </div>
          
          <div className="mt-2 sm:mt-0 flex items-center space-x-3">
            <div className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'Total:' : 'Tổng cộng:'} 
              <span className="font-bold text-red-600 ml-1">
                {totalExpenses.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')} VND
              </span>
            </div>
            
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="input-focus block w-36 px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">{formatMonth('all')}</option>
              {uniqueMonths.map(month => (
                <option key={month} value={month}>{formatMonth(month)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {filteredExpenses.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredExpenses}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {filteredExpenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} ${language === 'vi' ? 'VND' : 'VND'}`, language === 'en' ? 'Value' : 'Giá trị']}
                  labelFormatter={(name) => name}
                />
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                  formatter={(value, entry, index) => (
                    <span className="text-xs" style={{ color: entry.color }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {language === 'en' ? 'No expense data' : 'Không có dữ liệu chi tiêu'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {language === 'en' ? 'Add some expense transactions to see analysis.' : 'Thêm một số giao dịch chi tiêu để xem phân tích.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;