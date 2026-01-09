import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Configure axios base URL
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Configure axios to include token in requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Mock user for development
      const mockUser = {
        username: "Officer Sharma",
        role: "Admin",
        office: "Kathmandu Metro",
      };
      setUser(mockUser);
    }
  }, []);

  const login = async (username, password) => {
    // Mock login - no backend required
    const mockUser = {
      username: "Officer Sharma",
      role: "Admin",
      office: "Kathmandu Metro",
    };
    localStorage.setItem("token", "mock-token");
    setUser(mockUser);
      return { success: true };
  };

  const logout = async () => {
    // Mock logout - no backend required
      localStorage.removeItem("token");
      setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
