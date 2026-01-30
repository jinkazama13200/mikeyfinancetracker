import React from 'react';

interface SummaryCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'balance';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, type }) => {
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

  return (
    <div className={`${bgColor} rounded-lg p-6 shadow`}>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className={`mt-2 text-3xl font-semibold ${textColor}`}>
        {type === 'income' || type === 'expense' ? (type === 'income' ? '+' : '-') : ''}
        ${Math.abs(value).toFixed(2)}
      </p>
    </div>
  );
};

export default SummaryCard;