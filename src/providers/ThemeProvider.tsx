// /components/ThemeProvider.tsx
"use client"; // Required for Next.js App Router components using hooks

import { useEffect, useState } from "react";
import { useCurrentTheme } from "@/hook/useTheme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Get the current calculated theme mode ('light' or 'dark')
  const actualTheme = useCurrentTheme();

  // We need to wait for hydration/mounting before reading persistent state
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;

    // Remove the other theme class to ensure consistency
    root.classList.remove(actualTheme === "dark" ? "light" : "dark");

    // Add the current theme class
    root.classList.add(actualTheme);
  }, [actualTheme, mounted]);

  // Render children once mounted to ensure theme is applied before content shows
  if (!mounted) {
    return null; // Or a simple loading state
  }

  return <>{children}</>;
}
