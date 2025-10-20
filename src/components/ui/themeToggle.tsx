"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";

// Mock store for demonstration - replace with your actual store

export function ThemeToggle() {
  const { themeMode, setThemeMode } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(nextTheme);
  };

  // Render a minimal placeholder until mounted
  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  const isLight = themeMode === "light";

  return (
    <button
      onClick={handleToggle}
      className="group relative flex items-center gap-2 px-3 py-2 rounded-lg
                 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                 transition-all duration-200 ease-in-out
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                 dark:focus:ring-offset-gray-900"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {/* Desktop: Show text + icon */}
      <span className="hidden sm:inline-block font-medium text-sm text-gray-700 dark:text-gray-200 capitalize">
        {themeMode}
      </span>

      {/* Icon with smooth transition */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`absolute w-5 h-5 text-yellow-500 transition-all duration-300 ${
            isLight
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
        <Moon
          className={`absolute w-5 h-5 text-blue-400 transition-all duration-300 ${
            !isLight
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
}
