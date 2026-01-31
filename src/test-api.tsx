import React, { useState, useEffect } from 'react';
import { transactionApi, userApi } from './services/api';

const TestApi: React.FC = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    try {
      // Kiểm tra kết nối tới transactions endpoint
      const transactions = await transactionApi.getAllTransactions();
      setTestResult({
        success: true,
        message: 'Kết nối API thành công!',
        transactionsCount: transactions.length,
        sampleData: transactions.slice(0, 2)
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Lỗi kết nối API: ' + (error as Error).message
      });
    } finally {
      setLoading(false);
    }
  };

  const createSampleTransaction = async () => {
    setLoading(true);
    try {
      const sampleTransaction = {
        userId: '1',
        type: 'income',
        amount: 1000,
        description: 'Sample transaction',
        date: new Date().toISOString().split('T')[0],
        currency: 'VND'
      };
      
      const result = await transactionApi.createTransaction(sampleTransaction);
      setTestResult({
        success: true,
        message: 'Tạo giao dịch mẫu thành công!',
        data: result
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Lỗi tạo giao dịch: ' + (error as Error).message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Kiểm tra API Connection</h2>
      <div className="space-y-4">
        <button 
          onClick={testApiConnection}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}
        </button>
        
        <button 
          onClick={createSampleTransaction}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 ml-2"
        >
          {loading ? 'Đang tạo...' : 'Tạo giao dịch mẫu'}
        </button>
        
        {testResult && (
          <div className={`p-4 rounded mt-4 ${testResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <h3 className="font-bold">Kết quả:</h3>
            <p>{testResult.message}</p>
            {testResult.transactionsCount !== undefined && (
              <p>Số lượng giao dịch: {testResult.transactionsCount}</p>
            )}
            {testResult.sampleData && (
              <div>
                <p>Dữ liệu mẫu:</p>
                <pre className="mt-2 text-sm">{JSON.stringify(testResult.sampleData, null, 2)}</pre>
              </div>
            )}
            {testResult.data && (
              <pre className="mt-2 text-sm">{JSON.stringify(testResult.data, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestApi;