import React from 'react';
import { useTranslation } from '../i18n';

interface SummaryCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'balance';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, type }) => {
  const { language } = useTranslation();
  let bgColor = '';
  let textColor = '';
  let icon = '';

  switch (type) {
    case 'income':
      bgColor = 'bg-gradient-to-br from-green-50 to-emerald-50';
      textColor = 'text-green-800';
      icon = '↑';
      break;
    case 'expense':
      bgColor = 'bg-gradient-to-br from-red-50 to-rose-50';
      textColor = 'text-red-800';
      icon = '↓';
      break;
    case 'balance':
      bgColor = value >= 0 ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : 'bg-gradient-to-br from-amber-50 to-yellow-50';
      textColor = value >= 0 ? 'text-blue-800' : 'text-amber-800';
      icon = value >= 0 ? '💰' : '💸';
      break;
    default:
      bgColor = 'bg-gradient-to-br from-gray-50 to-slate-50';
      textColor = 'text-gray-800';
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
    <div className={`${bgColor} rounded-xl p-3 sm:p-4 md:p-6 shadow-lg card-hover border border-gray-100 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{getTitle()}</p>
        <span className="text-lg sm:text-xl">{icon}</span>
      </div>
      <p className={`mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-bold break-all ${textColor} transition-all duration-500`}>
        {type === 'income' ? '+' : type === 'expense' ? '-' : value < 0 ? '-' : ''}
        {Math.abs(value).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')} {language === 'vi' ? 'VND' : '$'}
      </p>
    </div>
  );
};

export default SummaryCard;