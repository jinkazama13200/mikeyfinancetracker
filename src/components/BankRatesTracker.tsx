import React, { useState, useEffect } from 'react';
import { useTranslation } from '../i18n';

interface BankRate {
  bankName: string;
  buyRate: number;
  sellRate: number;
  lastUpdated: Date;
}

interface CurrencyData {
  symbol: string;
  banks: BankRate[];
  averageBuy: number;
  averageSell: number;
  lastUpdated: Date;
}

const BankRatesTracker: React.FC = () => {
  const { language } = useTranslation();
  const [usdRates, setUsdRates] = useState<CurrencyData | null>(null);
  const [usdtRates, setUsdtRates] = useState<{ rate: number; lastUpdated: Date } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching data from Vietnamese banks and OKX
  useEffect(() => {
    fetchCurrencyRates();
    
    // Update rates every 5 minutes
    const interval = setInterval(fetchCurrencyRates, 300000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchCurrencyRates = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate fetching USD rates from major Vietnamese banks
      // In a real app, this would connect to bank APIs or financial data services
      const mockUsdRates: CurrencyData = {
        symbol: 'USD/VND',
        averageBuy: 23480,
        averageSell: 23520,
        lastUpdated: new Date(),
        banks: [
          { bankName: 'Vietcombank', buyRate: 23470, sellRate: 23510, lastUpdated: new Date() },
          { bankName: 'Techcombank', buyRate: 23475, sellRate: 23515, lastUpdated: new Date() },
          { bankName: 'ACB', buyRate: 23465, sellRate: 23505, lastUpdated: new Date() },
          { bankName: 'VPBank', buyRate: 23480, sellRate: 23520, lastUpdated: new Date() },
          { bankName: 'MB Bank', buyRate: 23472, sellRate: 23512, lastUpdated: new Date() },
          { bankName: 'Sacombank', buyRate: 23468, sellRate: 23508, lastUpdated: new Date() }
        ]
      };

      // Simulate fetching USDT rate from OKX
      // In a real app, this would connect to OKX API
      const mockUsdtRate = {
        rate: 23490 + (Math.random() * 20 - 10), // Simulate slight fluctuations around 23,490
        lastUpdated: new Date()
      };

      setUsdRates(mockUsdRates);
      setUsdtRates(mockUsdtRate);
    } catch (err) {
      setError(language === 'en' 
        ? 'Failed to fetch currency rates' 
        : 'Không thể lấy tỷ giá tiền tệ');
      console.error('Error fetching currency rates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Format currency values
  const formatCurrency = (value: number): string => {
    return value.toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-b border-gray-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">
              {language === 'en' ? 'Bank & Exchange Rates' : 'Tỷ giá ngân hàng & sàn'}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`h-2 w-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></span>
            <span className="text-xs text-gray-500">
              {isLoading 
                ? (language === 'en' ? 'Updating...' : 'Đang cập nhật...') 
                : (language === 'en' ? 'Live' : 'Trực tiếp')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        {isLoading && !(usdRates || usdtRates) ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-3"></div>
            <p className="text-gray-600 text-sm">
              {language === 'en' ? 'Fetching live bank and exchange rates...' : 'Đang lấy tỷ giá ngân hàng và sàn...'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* USD Rates Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-gray-800 flex items-center">
                  <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                  USD/VND - {language === 'en' ? 'Vietnamese Banks' : 'Ngân hàng Việt Nam'}
                </h4>
                {usdRates && (
                  <span className="text-xs text-gray-500">
                    {language === 'en' ? 'Updated:' : 'Cập nhật:'} {formatTime(usdRates.lastUpdated)}
                  </span>
                )}
              </div>
              
              {usdRates && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg text-center">
                    <div>
                      <div className="text-xs text-gray-500">{language === 'en' ? 'Average Buy' : 'Mua vào TB'}</div>
                      <div className="font-semibold text-green-600">{formatCurrency(usdRates.averageBuy)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{language === 'en' ? 'Avg Spread' : 'Chênh lệch TB'}</div>
                      <div className="font-semibold text-gray-700">{formatCurrency(usdRates.averageSell - usdRates.averageBuy)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{language === 'en' ? 'Average Sell' : 'Bán ra TB'}</div>
                      <div className="font-semibold text-red-600">{formatCurrency(usdRates.averageSell)}</div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'en' ? 'Bank' : 'Ngân hàng'}
                          </th>
                          <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'en' ? 'Buy' : 'Mua vào'}
                          </th>
                          <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'en' ? 'Sell' : 'Bán ra'}
                          </th>
                          <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {language === 'en' ? 'Spread' : 'Chênh lệch'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {usdRates.banks.map((bank, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                              {bank.bankName}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-green-600 font-semibold">
                              {formatCurrency(bank.buyRate)}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-red-600 font-semibold">
                              {formatCurrency(bank.sellRate)}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-sm text-center text-gray-700">
                              {formatCurrency(bank.sellRate - bank.buyRate)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
            {/* USDT Rates Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-md font-semibold text-gray-800 flex items-center">
                  <span className="h-3 w-3 rounded-full bg-purple-500 mr-2"></span>
                  USDT/VND - OKX
                </h4>
                {usdtRates && (
                  <span className="text-xs text-gray-500">
                    {language === 'en' ? 'Updated:' : 'Cập nhật:'} {formatTime(usdtRates.lastUpdated)}
                  </span>
                )}
              </div>
              
              {usdtRates && (
                <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Current Rate' : 'Tỷ giá hiện tại'}</div>
                      <div className="text-2xl font-bold text-gray-900 mt-1">
                        {formatCurrency(usdtRates.rate)} ₫
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{language === 'en' ? 'Exchange' : 'Sàn giao dịch'}</div>
                      <div className="text-sm font-semibold text-indigo-600 mt-1">OKX</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-gray-200/50">
          <div className="flex items-center text-xs text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {language === 'en' 
              ? 'Rates update automatically every 5 minutes' 
              : 'Tỷ giá tự động cập nhật mỗi 5 phút'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankRatesTracker;