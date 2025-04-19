import React, { createContext, useContext, useState, ReactNode } from "react";
import { AuthState, User } from "../types";
import { authAPI } from "../services/api";

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    phoneNumber?: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  });

  const login = async (email: string, password: string) => {
    try {
      setAuthState({ ...authState, loading: true, error: null });

      // Use the API service for login
      try {
        const user = await authAPI.login(email, password);

        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });

        localStorage.setItem("authUser", JSON.stringify(user));
      } catch (error) {
        setAuthState({
          ...authState,
          loading: false,
          error: "Invalid credentials",
          isAuthenticated: false,
          user: null,
        });
      }
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: "Login failed",
        isAuthenticated: false,
        user: null,
      });
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phoneNumber?: string
  ) => {
    try {
      setAuthState({ ...authState, loading: true, error: null });

      try {
        const user = await authAPI.register(name, email, password, phoneNumber);

        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });

        localStorage.setItem("authUser", JSON.stringify(user));
      } catch (error) {
        setAuthState({
          ...authState,
          loading: false,
          error: "Registration failed",
          isAuthenticated: false,
          user: null,
        });
      }
    } catch (error) {
      setAuthState({
        ...authState,
        loading: false,
        error: "Registration failed",
        isAuthenticated: false,
        user: null,
      });
    }
  };

  const logout = () => {
    authAPI.logout();
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  // Check for existing session on initial load
  React.useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser) as User;
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
      } catch (e) {
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
