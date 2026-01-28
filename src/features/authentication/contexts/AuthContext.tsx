import { createContext } from "react";
import type { User } from "../types/UserTypes";

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);
