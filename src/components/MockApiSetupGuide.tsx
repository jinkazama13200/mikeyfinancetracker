import React from 'react';

const MockApiSetupGuide: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Hướng dẫn thiết lập MockAPI</h2>
      
      <div className="space-y-4 text-gray-700">
        <div>
          <h3 className="text-lg font-semibold text-indigo-600">1. Truy cập MockAPI</h3>
          <p>Truy cập: <a href="https://mockapi.io/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://mockapi.io/</a></p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-indigo-600">2. Tạo endpoint mới</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Sử dụng endpoint: <code className="bg-gray-100 px-2 py-1 rounded">https://64de102a825d19d9bfb1f7ba.mockapi.io</code></li>
            <li>Tên mô tả: <code className="bg-gray-100 px-2 py-1 rounded">MyFinanceTracker API</code></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-indigo-600">3. Tạo các resource</h3>
          <div className="ml-4">
            <p className="font-medium">Resource: <code className="bg-gray-100 px-2 py-1 rounded">transactions</code></p>
            <ul className="list-disc pl-6">
              <li><code className="bg-gray-100 px-1 rounded">userId</code> (string) - ID của người dùng</li>
              <li><code className="bg-gray-100 px-1 rounded">type</code> (string) - 'income' hoặc 'expense'</li>
              <li><code className="bg-gray-100 px-1 rounded">amount</code> (number) - Số tiền</li>
              <li><code className="bg-gray-100 px-1 rounded">description</code> (string) - Mô tả giao dịch</li>
              <li><code className="bg-gray-100 px-1 rounded">date</code> (string) - Ngày giao dịch (YYYY-MM-DD)</li>
              <li><code className="bg-gray-100 px-1 rounded">currency</code> (string) - Loại tiền tệ (mặc định 'VND')</li>
            </ul>
            
            <p className="font-medium mt-3">Resource: <code className="bg-gray-100 px-2 py-1 rounded">users</code></p>
            <ul className="list-disc pl-6">
              <li><code className="bg-gray-100 px-1 rounded">username</code> (string) - Tên đăng nhập</li>
              <li><code className="bg-gray-100 px-1 rounded">email</code> (string) - Email</li>
              <li><code className="bg-gray-100 px-1 rounded">password</code> (string) - Mật khẩu (đã mã hóa)</li>
              <li><code className="bg-gray-100 px-1 rounded">createdAt</code> (string) - Ngày tạo</li>
            </ul>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-indigo-600">4. Hoàn thành</h3>
          <p>Sau khi tạo xong các resource, ứng dụng sẽ có thể lưu trữ dữ liệu giao dịch trên MockAPI.</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">
          <strong>Lưu ý:</strong> Bạn cần hoàn thành các bước trên trên trang MockAPI trước khi ứng dụng có thể lưu trữ dữ liệu.
          Nếu không thấy các resource, dữ liệu sẽ chỉ được lưu trữ tạm thời trong phiên làm việc hiện tại.
        </p>
      </div>
    </div>
  );
};

export default MockApiSetupGuide;