/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#000000",
    background: "#ffffff",
    invertBackground: "#000000",
    backgroundElement: "#e7ebe3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    faqTitle: "#262729",
    faqDescription: "#687076",
    accent: "#9FE870",
    primaryInk: "#dfffd0",
    secondaryInk: "#0B0F0A",
    iconColor: "#000",
    iconColor2: "#1E4A00",
    iconBorderColor: "#e5e7eb",
    transparent: "transparent",
    surface: "#f3f5f1",
    textFaint: "#94A3B8",
    shadowColor: "transparent",
    infoBgColor: "#d4e6ff",
    buttonText: "#296600",
    borderColor: "#d7ded1",
    transactionSummaryCard: "#f8f9f7",
    transactionFilterIcon: "#EAF6DB",
  },
  dark: {
    text: "#ffffff",
    background: "#0b0f0a",
    invertBackground: "#ffffff",
    backgroundElement: "#1b2418",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
    faqTitle: "#F4F7F0",
    faqDescription: "#B8C2AF",
    accent: "#9FE870",
    primaryInk: "#0B0F0A",
    secondaryInk: "#dfffd0",
    iconColor: "#fff",
    iconColor2: "#DFFFD0",
    iconBorderColor: "#263021",
    transparent: "transparent",
    surface: "#141B13",
    textFaint: "#7F8B78",
    shadowColor: "transparent",
    infoBgColor: "#10242d",
    buttonText: "#296600",
    borderColor: "#1d2619",
    transactionSummaryCard: "#10160f",
    transactionFilterIcon: "#18300F",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset =
  Platform.select({ ios: 50, android: -24, web: 0 }) ?? 0;
export const MaxContentWidth = 800;
