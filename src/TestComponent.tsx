import React from 'react';

function TestComponent() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Test Page</h1>
      <p>Nếu bạn thấy trang này, thì React đang hoạt động</p>
      <div>Current time: {new Date().toLocaleString()}</div>
    </div>
  );
}

export default TestComponent;