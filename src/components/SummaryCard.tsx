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
    <div className={`bg-[#f5f3bb]/30 backdrop-blur-sm rounded-xl p-2 sm:p-3 md:p-4 lg:p-6 shadow-sm card-hover border ${
      type === 'income' ? 'border-[#86ba90]/50' : 
      type === 'expense' ? 'border-[#df2935]/50' : 
      type === 'balance' ? 'border-[#dfa06e]/50' : 'border-[#412722]/50'
    } transition-all duration-300 relative overflow-hidden`}>
      <div className="absolute inset-0 glass-effect z-0 rounded-xl opacity-70"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <p className={`text-xs font-medium ${
            type === 'income' ? 'text-[#86ba90]' : 
            type === 'expense' ? 'text-[#df2935]' : 
            type === 'balance' ? 'text-[#dfa06e]' : 'text-[#412722]'
          } truncate`}>{getTitle()}</p>
          <span className={`text-base sm:text-lg ${
            type === 'income' ? 'text-[#86ba90]' : 
            type === 'expense' ? 'text-[#df2935]' : 
            type === 'balance' ? 'text-[#dfa06e]' : 'text-[#412722]'
          }`}>{icon}</span>
        </div>
        <p className={`mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ${
          type === 'income' ? 'text-[#86ba90]' : 
          type === 'expense' ? 'text-[#df2935]' : 
          type === 'balance' ? 'text-[#dfa06e]' : 'text-[#412722]'
        } transition-all duration-500 break-words`}>
          {type === 'income' ? '+' : type === 'expense' ? '-' : value < 0 ? '-' : ''}
          {Math.abs(value).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')} {language === 'vi' ? 'VND' : '$'}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;