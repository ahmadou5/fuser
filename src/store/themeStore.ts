// /store/themeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeStore {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      // Initial state
      themeMode: "dark",
      setThemeMode: (themeMode: ThemeMode) => set({ themeMode }),
    }),
    {
      name: "theme-storage",
      // We'll use a standard storage type (localStorage) which works well on the client side
      // Next.js components will access this store only after mounting to avoid SSR issues.
    }
  )
);
