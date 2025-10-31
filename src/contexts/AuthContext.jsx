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

          console.log("=== PROFILE FETCH DEBUG INFO ===");
          console.log("Raw profile data:", JSON.stringify(userData, null, 2));
          console.log("Profile role:", userData?.role);
          console.log("==============================");
          
          // Defensive check: ensure role is present and normalized
          if (!userData.role) {
            console.warn("Fetched user missing role, assigning 'influencer' by default.");
            userData.role = 'influencer';
          } else {
            // Normalize the role
            userData.role = userData.role.toString().trim().toLowerCase();
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

  const login = async (email, password, userType = null) => {
    setIsLoading(true);
    try {
      // Pass both email, password, and optionally userType
      const response = await apiService.auth.login({ email, password, userType });

      const token = response.token;
      if (token) {
        setToken(token);
      }

      // Defensive structure fix
      const loggedInUser = response.user || response;
      console.log("=== LOGIN RESPONSE DEBUG INFO ===");
      console.log("Raw login response:", JSON.stringify(response, null, 2));
      console.log("Extracted user data:", JSON.stringify(loggedInUser, null, 2));
      console.log("Login response role:", loggedInUser?.role);
      console.log("===============================");
      
      // Ensure role is present and normalized
      if (!loggedInUser.role) {
        console.warn("Login response missing role, assigning 'influencer' by default.");
        loggedInUser.role = 'influencer';
      } else {
        // Normalize the role
        loggedInUser.role = loggedInUser.role.toString().trim().toLowerCase();
      }

      console.log("Final user object with normalized role:", loggedInUser);
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
      console.log("=== SIGNUP RESPONSE DEBUG INFO ===");
      console.log("Raw signup response:", JSON.stringify(response, null, 2));
      console.log("Extracted user data:", JSON.stringify(registeredUser, null, 2));
      console.log("Signup response role:", registeredUser?.role);
      console.log("================================");
      
      // Ensure role is present and normalized
      if (!registeredUser.role) {
        console.warn("Signup response missing role, assigning 'influencer' by default.");
        registeredUser.role = 'influencer';
      } else {
        // Normalize the role
        registeredUser.role = registeredUser.role.toString().trim().toLowerCase();
      }

      console.log("Final user object with normalized role:", registeredUser);
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