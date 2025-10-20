// /constants/colors.ts (Or just keep it inside your hook file for simplicity)
export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    // ... all light colors
    primary: "#0a7ea4",
    overlay: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    text: "#ECEDEE",
    background: "#0d0c10",
    // ... all dark colors
    primary: "#0a7ea4",
    overlay: "rgba(0, 0, 0, 0.7)",
  },
} as const; // Use 'as const' for better type inference

export type ColorName = keyof (typeof Colors)["light"];
