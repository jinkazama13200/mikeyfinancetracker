const axios = require('axios');

// Create admin user
const createUser = async () => {
  try {
    const userData = {
      username: 'admin001',
      email: 'admin001@example.com',
      password: '123456',
      createdAt: new Date().toISOString()
    };
    
    const response = await axios.post('https://64de102a825d19d9bfb1f7ba.mockapi.io/users', userData);
    console.log('User created successfully:', response.data);
  } catch (error) {
    console.error('Error creating user:', error.message);
  }
};

createUser();