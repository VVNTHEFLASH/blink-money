import { Link } from "expo-router";
import { Pressable, StyleSheet, type PressableProps } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

type ThemedButtonProps = PressableProps & {
  label: string;
  href?: string;
};

export default function ThemedButton({ label, href, ...props }: ThemedButtonProps) {
  const theme = useTheme();

  const button = (
    <Pressable {...props}>
      <ThemedView type="accent" style={styles.cta}>
        <ThemedText style={[styles.ctaText, { color: theme.primaryInk }]}>
          {label}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );

  if (href) {
    return (
      <Link href={href as any} asChild>
        {button}
      </Link>
    );
  }

  return button;
}

const styles = StyleSheet.create({
  cta: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.three,
    gap: Spacing.two,
  },
  ctaText: { fontSize: 13, lineHeight: 16 },
});
