import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { userApi, User as UserType } from '../services/api';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user data exists in localStorage on initial load
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsedUser = JSON.parse(storedUserData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const users = await userApi.getAllUsers();
      
      const foundUser = users.find((u) => u.username === username && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email || `${foundUser.username}@example.com`,
        };
        
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        return true;
      } else {
        console.error('Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const users = await userApi.getAllUsers();
      
      const userExists = users.some((u) => u.username === username);
      
      if (userExists) {
        console.error('Username already exists');
        return false;
      }
      
      // Create new user
      const newUser = {
        username,
        email,
        password,
        createdAt: new Date().toISOString()
      };
      
      const createUserResponse = await userApi.createUser(newUser);
      const userData = {
        id: createUserResponse.id,
        username: createUserResponse.username,
        email: createUserResponse.email || email,
      };
      
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};