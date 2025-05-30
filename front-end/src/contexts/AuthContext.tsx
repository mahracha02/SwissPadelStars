import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Temporary development credentials
    if (email === 'admin@swisspadelstars.ch' && password === 'admin123') {
      localStorage.setItem('token', 'dev-token');
      setUser({ email, role: 'admin' });
      return;
    }

    try {
      const response = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser({ email, role: 'admin' });
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth }; 