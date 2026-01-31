const axios = require('axios');

async function checkApiStructure() {
  try {
    // Tạo một giao dịch mẫu để kiểm tra cấu trúc
    const sampleTransaction = {
      userId: 'test-user',
      type: 'expense',
      amount: 500,
      description: 'Sample transaction for structure check',
      date: '2024-01-02',
      currency: 'VND'
    };

    console.log('Creating sample transaction...');
    const createResponse = await axios.post('https://64de102a825d19d9bfb1f7ba.mockapi.io/transactions', sampleTransaction);
    console.log('Created transaction with ID:', createResponse.data.id);
    console.log('Full response:', JSON.stringify(createResponse.data, null, 2));

    // Lấy lại danh sách để kiểm tra
    console.log('\nFetching all transactions...');
    const fetchResponse = await axios.get('https://64de102a825d19d9bfb1f7ba.mockapi.io/transactions');
    console.log('Total transactions:', fetchResponse.data.length);
    if (fetchResponse.data.length > 0) {
      console.log('Latest transaction structure:', JSON.stringify(fetchResponse.data[fetchResponse.data.length - 1], null, 2));
    }

    // Xóa giao dịch mẫu sau khi kiểm tra
    console.log('\nCleaning up - deleting test transaction...');
    await axios.delete(`https://64de102a825d19d9bfb1f7ba.mockapi.io/transactions/${createResponse.data.id}`);
    console.log('Test transaction deleted.');
  } catch (error) {
    console.error('Error checking API structure:', error.response?.data || error.message);
  }
}

checkApiStructure();