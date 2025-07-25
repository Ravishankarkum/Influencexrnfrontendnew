import { createContext, useContext, useEffect, useState } from 'react';
import { apiService, getToken, removeToken, setToken } from '../services/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        setToken(token); // attach to axios for all requests
        try {
          const userData = await apiService.auth.getProfile();

          // Defensive check: ensure role is present
          if (!userData.role) {
            console.warn("Fetched user missing role, assigning 'influencer' by default.");
            userData.role = 'influencer';
          }

          console.log("Fetched user on refresh:", userData);
          setUser(userData);
        } catch (error) {
          console.error('Failed to get user profile:', error);
          removeToken();
          setUser(null);
        }
      }
      setIsInitializing(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiService.auth.login({ email, password });

      const token = response.token;
      if (token) {
        setToken(token);
      }

      // Defensive structure fix
      const loggedInUser = response.user || response;
      if (!loggedInUser.role) {
        console.warn("Login response missing role, assigning 'influencer' by default.");
        loggedInUser.role = 'influencer';
      }

      setUser(loggedInUser);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (formData) => {
    setIsLoading(true);
    try {
      const response = await apiService.auth.register(formData);

      const token = response.token;
      if (token) {
        setToken(token);
      }

      const registeredUser = response.user || response;
      if (!registeredUser.role) {
        console.warn("Signup response missing role, assigning 'influencer' by default.");
        registeredUser.role = 'influencer';
      }

      setUser(registeredUser);
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiService.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeToken();
      setUser(null);
      setIsLoading(false);
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
        isLoading,
        isInitializing
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
