import React, { createContext, useEffect, useState, ReactNode } from "react";
import authApi from "../api/authApi";

interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  isAdmin: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  
  const [user, setUser] = useState<User | null>(null);  
  const [loading, setLoading] = useState<boolean>(true);

  // Auto Load Profile if Token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    authApi.getProfile()
      .then((res: User) => setUser(res))
      .finally(() => setLoading(false));
  }, []);

  // Login Function
  const login = async (data: LoginData): Promise<void> => {
    const res = await authApi.login(data);

    localStorage.setItem("token", res.access_token);

    const profile = await authApi.getProfile();
    setUser(profile);
  };

  // Logout Function
  const logout = (): void => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
