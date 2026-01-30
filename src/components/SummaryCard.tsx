import React from 'react';
import { useTranslation } from '../i18n';

interface SummaryCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'balance';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, type }) => {
  const { t } = useTranslation();
  let bgColor = '';
  let textColor = '';

  switch (type) {
    case 'income':
      bgColor = 'bg-green-50';
      textColor = 'text-green-800';
      break;
    case 'expense':
      bgColor = 'bg-red-50';
      textColor = 'text-red-800';
      break;
    case 'balance':
      bgColor = value >= 0 ? 'bg-blue-50' : 'bg-yellow-50';
      textColor = value >= 0 ? 'text-blue-800' : 'text-yellow-800';
      break;
    default:
      bgColor = 'bg-gray-50';
      textColor = 'text-gray-800';
  }

  // Map title to translation key
  const getTitleTranslation = () => {
    switch(title.toLowerCase()) {
      case 'balance':
        return t('balance');
      case 'income':
        return t('income');
      case 'expenses':
        return t('totalExpenses');
      default:
        return t(title.toLowerCase());
    }
  };

  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-lg transform transition duration-500 hover:scale-[1.02] border border-gray-100`}>
      <div className="flex items-start">
        <div className="p-2 rounded-lg bg-white bg-opacity-70">
          {type === 'income' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : type === 'expense' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{getTitleTranslation()}</p>
          <p className={`mt-1 text-3xl font-bold ${textColor}`}>
            {type === 'balance' && value < 0 ? '-' : ''}
            ${Math.abs(value).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;