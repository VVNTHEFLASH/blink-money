import { ScrollView, type ScrollViewProps } from "react-native";

import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedScrollViewProps = ScrollViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedScrollView({
  style,
  lightColor,
  darkColor,
  type,
  ...otherProps
}: ThemedScrollViewProps) {
  const theme = useTheme();

  return (
    <ScrollView
      style={[{ backgroundColor: theme[type ?? "background"] }, style]}
      {...otherProps}
    />
  );
}
