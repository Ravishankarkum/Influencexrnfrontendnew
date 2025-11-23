import { createContext, useContext, useEffect, useState } from "react";
import { apiService, getToken, removeToken, setToken } from "../services/api";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // ------------------------------------------
  // INITIALIZE AUTH ON PAGE REFRESH
  // ------------------------------------------
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();

      if (token) {
        setToken(token);

        try {
          const userData = await apiService.auth.getProfile();

          // Ensure role exists
          userData.role = userData.role
            ? userData.role.toString().trim().toLowerCase()
            : "influencer";

          setUser(userData);
        } catch (err) {
          removeToken();
          setUser(null);
        }
      }

      setIsInitializing(false);
    };

    initializeAuth();
  }, []);

  // ------------------------------------------
  // GOOGLE LOGIN TOKEN
  // ------------------------------------------
  const loginWithToken = async (token) => {
    setToken(token);

    try {
      const profile = await apiService.auth.getProfile();

      profile.role = profile.role
        ? profile.role.toString().trim().toLowerCase()
        : "influencer";

      setUser(profile);
    } catch (err) {
      console.error("Failed to fetch profile after Google login:", err);
    }
  };

  // ------------------------------------------
  // NORMAL LOGIN
  // ------------------------------------------
  const login = async (email, password, userType = null) => {
    setIsLoading(true);

    try {
      const response = await apiService.auth.login({
        email,
        password,
        userType,
      });

      const token = response.token;
      if (token) setToken(token);

      const loggedInUser = response.user || response;

      loggedInUser.role = loggedInUser.role
        ? loggedInUser.role.toString().trim().toLowerCase()
        : "influencer";

      setUser(loggedInUser);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------
  // SIGNUP
  // ------------------------------------------
  const signup = async (formData) => {
    setIsLoading(true);

    try {
      const response = await apiService.auth.register(formData);

      const token = response.token;
      if (token) setToken(token);

      const registeredUser = response.user || response;

      registeredUser.role = registeredUser.role
        ? registeredUser.role.toString().trim().toLowerCase()
        : "influencer";

      setUser(registeredUser);
      return response;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------------
  // LOGOUT
  // ------------------------------------------
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
