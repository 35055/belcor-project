import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: (name: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: (name, password) => {
    if (name === "admin@gmail.com" && password === "12345678") {
      set({ isAuthenticated: true });
    }
  },
  logout: () => set({ isAuthenticated: false }),
}));
