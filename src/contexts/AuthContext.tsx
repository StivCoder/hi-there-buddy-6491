import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | null;

interface User {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS = [
  { email: 'admin@alber.school', password: 'admin123', role: 'admin' as UserRole, name: 'Admin User' },
  { email: 'teacher@alber.school', password: 'teacher123', role: 'teacher' as UserRole, name: 'Teacher User' },
  { email: 'student@alber.school', password: 'student123', role: 'student' as UserRole, name: 'Student User' },
  { email: 'parent@alber.school', password: 'parent123', role: 'parent' as UserRole, name: 'Parent User' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('alber_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const userData = {
        email: foundUser.email,
        role: foundUser.role,
        name: foundUser.name,
      };
      setUser(userData);
      localStorage.setItem('alber_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alber_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
