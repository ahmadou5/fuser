// /hooks/useTheme.ts
import { useThemeStore } from "@/store/themeStore";
import { Colors, ColorName } from "@/constants/colors"; // Import your Color types
import { useEffect, useState } from "react";

// A simplified hook to get the device's color scheme from the browser
const useDeviceColorScheme = (): "light" | "dark" => {
  // Use a state to force re-render when the scheme changes
  const [deviceScheme, setDeviceScheme] = useState<"light" | "dark">("light"); // Default to light

  useEffect(() => {
    // Check for window to ensure this runs only on the client
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateScheme = () => {
      setDeviceScheme(mediaQuery.matches ? "dark" : "light");
    };

    // Set initial value
    updateScheme();

    // Listen for changes
    mediaQuery.addEventListener("change", updateScheme);

    return () => mediaQuery.removeEventListener("change", updateScheme);
  }, []);

  return deviceScheme;
};

// Hook to get the current active theme
export function useCurrentTheme(): "light" | "dark" {
  const { themeMode } = useThemeStore();
  const deviceColorScheme = useDeviceColorScheme();

  // Logic remains the same: 'system' uses device scheme, otherwise uses stored mode
  // The 'light' fallback is good practice
  return themeMode === "system" ? deviceColorScheme : themeMode;
}

// Hook to get all theme colors for the current theme
export function useThemeColors() {
  const actualTheme = useCurrentTheme();

  // Direct object access for when you can't use CSS variables (e.g., inline style)
  return Colors[actualTheme];
}

// Hook to get a specific color by name (your original useThemeColor logic)
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: ColorName
) {
  const actualTheme = useCurrentTheme();

  const colorFromProps = props[actualTheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[actualTheme][colorName];
  }
}
