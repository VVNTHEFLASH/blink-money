import { StyleSheet, Text, type TextProps } from "react-native";

import { Fonts, ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "small"
    | "Xsmall"
    | "XXsmall"
    | "smallBold"
    | "subtitle"
    | "link"
    | "linkPrimary"
    | "code";
  themeColor?: ThemeColor;
};

export function ThemedText({
  style,
  type = "default",
  themeColor,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? "text"] },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "small" && styles.small,
        type === "Xsmall" && styles.Xsmall,
        type === "XXsmall" && styles.XXsmall,
        type === "smallBold" && styles.smallBold,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        type === "linkPrimary" && styles.linkPrimary,
        type === "code" && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  XXsmall: {
    fontFamily: "Mulish-Regular",
    fontSize: 10,
    lineHeight: 20,
  },
  Xsmall: {
    fontFamily: "Mulish-Regular",
    fontSize: 12,
    lineHeight: 20,
  },
  small: {
    fontFamily: "Mulish-Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  smallBold: {
    fontFamily: "Mulish-SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  default: {
    fontFamily: "Mulish-Regular",
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontFamily: "Mulish-Bold",
    fontSize: 48,
    lineHeight: 52,
  },
  subtitle: {
    fontFamily: "Mulish-SemiBold",
    fontSize: 32,
    lineHeight: 44,
  },
  link: {
    fontFamily: "Mulish-Regular",
    lineHeight: 30,
    fontSize: 14,
    color: "#9FE870",
    textDecorationLine: "underline",
  },
  linkPrimary: {
    fontFamily: "Mulish-SemiBold",
    lineHeight: 30,
    fontSize: 14,
    color: "#3c87f7",
  },
  code: {
    fontFamily: Fonts.mono,
    fontSize: 12,
  },
});
