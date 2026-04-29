import { createContext, useContext, useEffect, useState } from "react";
import api, { getApiErrorMessage, setAuthToken } from "../lib/api";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "notenest-auth";

const getInitialAuth = () => {
  if (typeof window === "undefined") {
    return { token: "", user: null };
  }

  const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return { token: "", user: null };
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return { token: "", user: null };
  }
};

export function AuthProvider({ children }) {
  const [{ token, user }, setAuthState] = useState(getInitialAuth);
  const [authLoading, setAuthLoading] = useState(true);

  const persistAuth = (nextAuth) => {
    setAuthState(nextAuth);

    if (typeof window === "undefined") {
      return;
    }

    if (nextAuth.token && nextAuth.user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth));
      setAuthToken(nextAuth.token);
      return;
    }

    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthToken("");
  };

  useEffect(() => {
    if (!token) {
      setAuthLoading(false);
      return;
    }

    setAuthToken(token);

    const validateSession = async () => {
      try {
        const response = await api.get("/auth/me");

        persistAuth({
          token,
          user: response.data.user
        });
      } catch {
        persistAuth({ token: "", user: null });
      } finally {
        setAuthLoading(false);
      }
    };

    validateSession();
  }, [token]);

  const login = async (payload) => {
    const response = await api.post("/auth/login", payload);
    const nextAuth = {
      token: response.data.token,
      user: response.data.user
    };

    persistAuth(nextAuth);
    return nextAuth.user;
  };

  const signup = async (payload) => {
    const response = await api.post("/auth/register", payload);
    const nextAuth = {
      token: response.data.token,
      user: response.data.user
    };

    persistAuth(nextAuth);
    return nextAuth.user;
  };

  const logout = () => {
    persistAuth({ token: "", user: null });
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token && user),
    authLoading,
    login,
    signup,
    logout,
    getErrorMessage: getApiErrorMessage
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
