import { createContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { loginUser, registerUser, logoutUser } from "../services/authService";

export const AuthContext = createContext(null);

let accessToken = null;
export const getAccessToken = () => accessToken;
export const setAccessToken = (token) => {
  accessToken = token;
};

const getUserFromStorage = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setAccessToken(data.data?.accessToken ?? null);
      const userData = data.data?.user ?? data.user ?? data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Login failed");
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      setAccessToken(data.data?.accessToken ?? null);
      const userData = data.data?.user ?? data.user ?? data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success(`Welcome to Nexus Arab Store, ${userData.name}!`);
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Registration failed");
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // always clear locally even if API fails
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("user");
      toast("Logged out successfully", { icon: "👋" });
    }
  }, []);

  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
