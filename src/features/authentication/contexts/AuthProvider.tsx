import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { authServices } from "../services/authServices";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/UserTypes";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const response = await authServices.me();
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await authServices.logout();
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
