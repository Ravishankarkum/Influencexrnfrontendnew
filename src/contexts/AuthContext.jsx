// This file manages global authentication state using React Context.
// It handles:
//   • Storing and retrieving JWT tokens
//   • Auto-loading user profile on page refresh
//   • Login (normal + Google token login)
//   • Signup
//   • Logout
//   • Providing user + auth functions across the app

import { createContext, useContext, useEffect, useState } from "react";
import { apiService, getToken, removeToken, setToken } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize auth on page refresh
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        setToken(token);
        try {
          const profile = await apiService.auth.getProfile();
          if (profile) {
            profile.role = profile.role
              ? profile.role.toString().trim().toLowerCase()
              : "influencer";
            setUser(profile);
          }
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          removeToken();
          setUser(null);
        }
      }
      setIsInitializing(false);
    };

    initializeAuth();
  }, []);

  // Login with Google token
  const loginWithToken = async (token) => {
    setToken(token);
    try {
      const profile = await apiService.auth.getProfile();
      if (profile) {
        profile.role = profile.role
          ? profile.role.toString().trim().toLowerCase()
          : "influencer";
        setUser(profile);
      }
    } catch (err) {
      console.error("Failed to fetch profile after Google login:", err);
      removeToken();
      setUser(null);
    }
  };

  // Normal login
  const login = async (email, password, userType = null) => {
    setIsLoading(true);
    try {
      const response = await apiService.auth.login({ email, password, userType });
      const token = response?.token;
      if (token) setToken(token);

      const loggedInUser = response?.user || response;
      if (loggedInUser) {
        loggedInUser.role = loggedInUser.role
          ? loggedInUser.role.toString().trim().toLowerCase()
          : "influencer";
        setUser(loggedInUser);
      }

      return response;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup
  const signup = async (formData) => {
    setIsLoading(true);
    try {
      const response = await apiService.auth.register(formData);
      const token = response?.token;
      if (token) setToken(token);

      const registeredUser = response?.user || response;
      if (registeredUser) {
        registeredUser.role = registeredUser.role
          ? registeredUser.role.toString().trim().toLowerCase()
          : "influencer";
        setUser(registeredUser);
      }

      return response;
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setIsLoading(true);
    try {
      await apiService.auth.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      removeToken();
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loginWithToken,
        isLoading,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
