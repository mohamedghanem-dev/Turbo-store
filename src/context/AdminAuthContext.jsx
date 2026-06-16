import { createContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../services/supabaseClient";

export const AdminAuthContext = createContext(null);

const SESSION_KEY = "nexus_admin_session";
const DEFAULT_PASSWORD = import.meta.env.VITE_ADMIN_DEFAULT_PASSWORD || "nexus2026";

/**
 * Simple single-password protection for /admin, stored in Supabase
 * table `admin_settings` (single row, id = 1, column `password`).
 * Falls back to VITE_ADMIN_DEFAULT_PASSWORD if the table/row doesn't exist yet.
 */
export const AdminAuthProvider = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "true");
  const [checking, setChecking] = useState(false);

  const getStoredPassword = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("password")
        .eq("id", 1)
        .single();

      if (error || !data) return DEFAULT_PASSWORD;
      return data.password || DEFAULT_PASSWORD;
    } catch {
      return DEFAULT_PASSWORD;
    }
  }, []);

  const login = useCallback(async (password) => {
    setChecking(true);
    try {
      const correct = await getStoredPassword();
      if (password === correct) {
        sessionStorage.setItem(SESSION_KEY, "true");
        setIsAuthed(true);
        return true;
      }
      return false;
    } finally {
      setChecking(false);
    }
  }, [getStoredPassword]);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
  }, []);

  /**
   * Change the admin password. Requires the current password to verify,
   * then upserts the new one into Supabase.
   */
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    const correct = await getStoredPassword();
    if (currentPassword !== correct) {
      throw new Error("الباسورد الحالي غير صحيح");
    }

    const { error } = await supabase
      .from("admin_settings")
      .upsert({ id: 1, password: newPassword });

    if (error) throw error;
    return true;
  }, [getStoredPassword]);

  const value = { isAuthed, checking, login, logout, changePassword };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
