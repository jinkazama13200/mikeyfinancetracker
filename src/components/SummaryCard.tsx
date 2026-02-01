import React from 'react';
import { useTranslation } from '../i18n';

interface SummaryCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'balance';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, type }) => {
  const { language } = useTranslation();
  let icon = '';

  switch (type) {
    case 'income':
      icon = '↑';
      break;
    case 'expense':
      icon = '↓';
      break;
    case 'balance':
      icon = value >= 0 ? '💰' : '💸';
      break;
    default:
      icon = '';
  }

  // Format title based on type
  const getTitle = () => {
    switch(type) {
      case 'income':
        return language === 'en' ? 'Income' : 'Thu nhập';
      case 'expense':
        return language === 'en' ? 'Expenses' : 'Chi tiêu';
      case 'balance':
        return language === 'en' ? 'Balance' : 'Số dư';
      default:
        return title;
    }
  };

  return (
    <div className={`backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-sm card-hover border ${
      type === 'income' ? 'border-[var(--income-border)]' : 
      type === 'expense' ? 'border-[var(--expense-border)]' : 
      type === 'balance' ? 'border-[var(--savings-border)]' : 'border-[var(--total-border)]'
    } transition-all duration-300 relative overflow-hidden`}>
      <div className="absolute inset-0 glass-effect z-0 rounded-xl opacity-70"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <p className={`text-xs font-medium ${
            type === 'income' ? 'color-income' : 
            type === 'expense' ? 'color-expense' : 
            type === 'balance' ? 'color-savings' : 'color-total'
          } truncate`}>{getTitle()}</p>
          <span className={`text-base sm:text-lg ${
            type === 'income' ? 'color-income' : 
            type === 'expense' ? 'color-expense' : 
            type === 'balance' ? 'color-savings' : 'color-total'
          }`}>{icon}</span>
        </div>
        <p className={`mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${
          type === 'income' ? 'color-income' : 
          type === 'expense' ? 'color-expense' : 
          type === 'balance' ? 'color-savings' : 'color-total'
        } transition-all duration-500 break-words`}>
          {type === 'income' ? '+' : type === 'expense' ? '-' : value < 0 ? '-' : ''}
          {Math.abs(value).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')} {language === 'vi' ? 'VND' : '$'}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;