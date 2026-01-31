import React, { useState, useEffect } from 'react';

interface ExchangeRate {
  rank: string;
  rate: number;
  provider: string;
  fee?: number;
  finalRate?: number;
  timestamp?: string;
}

interface CurrencyTrackerProps {
  initialRates?: ExchangeRate[];
}

const CurrencyTracker: React.FC<CurrencyTrackerProps> = ({ initialRates = [] }) => {
  const [rates, setRates] = useState<ExchangeRate[]>(initialRates);
  const [currentRate, setCurrentRate] = useState<ExchangeRate | null>(null);
  const [bestRate, setBestRate] = useState<ExchangeRate | null>(null);
  const [worstRate, setWorstRate] = useState<ExchangeRate | null>(null);

  useEffect(() => {
    if (rates.length > 0) {
      // Find best rate (lowest for buyer)
      const sortedByLowest = [...rates].sort((a, b) => (a.finalRate || a.rate) - (b.finalRate || b.rate));
      setBestRate(sortedByLowest[0]);
      
      // Find worst rate (highest)
      const sortedByHighest = [...rates].sort((a, b) => (b.finalRate || b.rate) - (a.finalRate || a.rate));
      setWorstRate(sortedByHighest[0]);
      
      // Set current rate as the first one
      setCurrentRate(rates[0]);
    }
  }, [rates]);

  const addNewRates = (newRatesData: string) => {
    try {
      // Parse the exchange rate data from text input
      const lines = newRatesData.split('\n');
      const parsedRates: ExchangeRate[] = [];
      
      lines.forEach(line => {
        // Extract numbers and text from the line
        const rateMatch = line.match(/(\d+(?:\.\d+)?)\s+([^\d]+)/);
        if (rateMatch) {
          const rate = parseFloat(rateMatch[1]);
          const provider = rateMatch[2].trim();
          
          // Check for special cases like "+0.12" addition
          const feeMatch = line.match(/\+(\d+(?:\.\d+)?)\s*=\s*(\d+(?:\.\d+)?)/);
          if (feeMatch) {
            parsedRates.push({
              rank: `${parsedRates.length + 1}`,
              rate: parseFloat(feeMatch[1]),
              provider: provider,
              fee: parseFloat(feeMatch[1]),
              finalRate: parseFloat(feeMatch[2])
            });
          } else {
            parsedRates.push({
              rank: `${parsedRates.length + 1}`,
              rate: rate,
              provider: provider
            });
          }
        }
      });
      
      setRates(parsedRates);
    } catch (error) {
      console.error('Error parsing rates:', error);
    }
  };

  const formatCurrency = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-2xl shadow-sm border border-[#f5f3bb]/50 overflow-hidden relative p-6">
      <div className="absolute inset-0 glass-effect z-0 rounded-2xl opacity-60"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#412722]">OTC USD/VND Rate Tracker</h3>
          <span className="text-xs text-[#412722] bg-[#f5f3bb]/50 px-2 py-1 rounded">
            Updated: {new Date().toLocaleTimeString()}
          </span>
        </div>

        {currentRate && (
          <div className="mb-4 p-3 bg-[#f5f3bb]/40 rounded-lg border border-[#f5f3bb]/50">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[#412722]">Current Best Rate:</span>
              <span className="text-lg font-bold text-[#86ba90]">
                {formatCurrency(bestRate?.finalRate || bestRate?.rate || 0)}
              </span>
            </div>
            <div className="text-xs text-[#412722] mt-1">
              Provider: {bestRate?.provider || 'N/A'}
            </div>
          </div>
        )}

        {bestRate && worstRate && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-[#86ba90]/20 rounded-lg border border-[#86ba90]/30">
              <div className="text-xs font-medium text-[#412722]">Best Rate</div>
              <div className="text-lg font-bold text-[#86ba90]">
                {formatCurrency(bestRate.finalRate || bestRate.rate)}
              </div>
              <div className="text-xs text-[#412722] truncate">{bestRate.provider}</div>
            </div>
            <div className="p-3 bg-[#df2935]/20 rounded-lg border border-[#df2935]/30">
              <div className="text-xs font-medium text-[#412722]">Worst Rate</div>
              <div className="text-lg font-bold text-[#df2935]">
                {formatCurrency(worstRate.finalRate || worstRate.rate)}
              </div>
              <div className="text-xs text-[#412722] truncate">{worstRate.provider}</div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#df2935]/30">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#412722] uppercase tracking-wider">Rank</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#412722] uppercase tracking-wider">Provider</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-[#412722] uppercase tracking-wider">Rate</th>
                {rates.some(rate => rate.fee) && (
                  <th className="px-3 py-2 text-left text-xs font-medium text-[#412722] uppercase tracking-wider">Fee</th>
                )}
                {rates.some(rate => rate.finalRate) && (
                  <th className="px-3 py-2 text-left text-xs font-medium text-[#412722] uppercase tracking-wider">Final</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#df2935]/20">
              {rates.map((rate, index) => (
                <tr key={index} className={index === 0 ? 'bg-[#f5f3bb]/30' : ''}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-[#412722]">{rate.rank}</td>
                  <td className="px-3 py-2 text-sm text-[#412722] truncate max-w-xs">{rate.provider}</td>
                  <td className={`px-3 py-2 whitespace-nowrap text-sm font-medium ${
                    rate.rank === bestRate?.rank ? 'text-[#86ba90] font-bold' : 
                    rate.rank === worstRate?.rank ? 'text-[#df2935] font-bold' : 'text-[#412722]'
                  }`}>
                    {formatCurrency(rate.rate)}
                  </td>
                  {rate.fee && (
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-[#412722]">+{formatCurrency(rate.fee)}</td>
                  )}
                  {rate.finalRate && (
                    <td className={`px-3 py-2 whitespace-nowrap text-sm font-bold ${
                      rate.rank === bestRate?.rank ? 'text-[#86ba90]' : 
                      rate.rank === worstRate?.rank ? 'text-[#df2935]' : 'text-[#412722]'
                    }`}>
                      {formatCurrency(rate.finalRate)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-xs text-[#412722]">
          <p><strong>💡 Tip:</strong> Send new rate data to compare with current rates</p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyTracker;