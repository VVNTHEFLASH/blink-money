import { forwardRef, useCallback } from "react";
import {
  BlurEvent,
  type KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { type ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputType = "text" | "number" | "amount";
export type LabelPosition = "vertical" | "horizontal";

export type ThemedTextInputProps = Omit<TextInputProps, "keyboardType"> & {
  /** Controls keyboard type and value formatting */
  inputType?: InputType;
  /** Optional label rendered above or beside the input */
  label?: string;
  /** Stack label above (vertical) or place it beside (horizontal) the input */
  labelPosition?: LabelPosition;
  /** Theme token for the border and focused ring color */
  themeColor?: ThemeColor;
  /** Inline error message rendered below the input */
  error?: string;
  /** Minimum numeric value (applies to number and amount types) */
  min?: number;
  /** Maximum numeric value (applies to number and amount types) */
  max?: number;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Maps inputType to the correct RN keyboard type */
function resolveKeyboardType(inputType: InputType): KeyboardTypeOptions {
  switch (inputType) {
    case "number":
      return "number-pad";
    case "amount":
      return "decimal-pad";
    default:
      return "default";
  }
}

/**
 * Formats a raw string into Indian number format with ₹ prefix.
 * e.g. "100000" → "₹1,00,000"
 * Strips all non-digit/decimal characters before formatting.
 */
/**
 * Formats a raw string into Indian number format without currency symbol.
 * e.g. "100000" → "1,00,000"
 * Strips all non-digit characters before formatting.
 */
// function formatAmount(raw: string): string {
//   const cleaned = raw.replace(/[^0-9]/g, "");
//   if (!cleaned) return "";
//   return new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 0,
//   }).format(Number(cleaned));
// }
function formatAmount(raw: string): string {
  const cleaned = raw.replace(/[^0-9]/g, "");
  return cleaned;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(
  (
    {
      inputType = "text",
      label,
      labelPosition = "vertical",
      themeColor = "accent",
      error,
      style,
      onChangeText,
      accessibilityLabel,
      accessibilityHint,
      returnKeyType,
      placeholder,
      min,
      max = 999999999,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const isHorizontal = labelPosition === "horizontal";

    // ── Amount change handler ──────────────────────────────────────────────
    const handleChangeText = useCallback(
      (raw: string) => {
        if (!onChangeText) return;

        if (inputType === "amount") {
          onChangeText(formatAmount(raw));
          return;
        }

        if (inputType === "number") {
          const cleaned = raw.replace(/[^0-9]/g, "");
          if (!cleaned) {
            onChangeText("");
            return;
          }
          const numeric = Number(cleaned);
          // Clamp to max silently — don't let the value exceed the ceiling
          if (max !== undefined && numeric > max) {
            onChangeText(String(max));
            return;
          }
          onChangeText(cleaned);
          return;
        }

        onChangeText(raw);
      },
      [inputType, onChangeText, min, max],
    );

    // ── Derived keyboard props ─────────────────────────────────────────────
    const keyboardType = resolveKeyboardType(inputType);

    // Sensible return key defaults: amount/number fields submit, text fields advance
    const resolvedReturnKeyType =
      returnKeyType ?? (inputType === "text" ? "next" : "done");

    // ── Accessibility ──────────────────────────────────────────────────────
    // Fall back to label text so screen readers always have a meaningful name
    const resolvedAccessibilityLabel = accessibilityLabel ?? label;

    const inputStyles = [
      styles.input,
      {
        backgroundColor: theme.backgroundElement,
        color: theme.text,
        borderColor: error ? "#E53E3E" : theme.iconBorderColor,
      },
      isHorizontal && styles.inputHorizontalFlex,
      style,
    ];
    const handleBlur = useCallback(
      (e: BlurEvent) => {
        if (
          inputType === "number" &&
          min !== undefined &&
          rest.value !== undefined
        ) {
          const numeric = Number(rest.value);
          if (!isNaN(numeric) && numeric < min) {
            onChangeText?.(String(min));
          }
        }
        rest.onBlur?.(e);
      },
      [inputType, min, rest.value, rest.onBlur, onChangeText],
    );

    const input = (
      <TextInput
        ref={ref}
        style={inputStyles}
        keyboardType={keyboardType}
        returnKeyType={resolvedReturnKeyType}
        // Disable autocorrect and capitalisation for non-text types
        autoCorrect={inputType === "text"}
        autoCapitalize={inputType === "text" ? "sentences" : "none"}
        placeholderTextColor={theme.textFaint}
        placeholder={placeholder}
        onChangeText={handleChangeText}
        // Accessibility
        accessible
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityRole="none"
        // blurOnSubmit=false on text fields lets the form advance focus without dismissing keyboard
        blurOnSubmit={inputType !== "text"}
        onBlur={handleBlur}
        {...rest}
      />
    );

    const labelNode = label ? (
      <ThemedText
        style={[
          styles.label,
          isHorizontal && styles.labelHorizontal,
          { color: error ? "#E53E3E" : theme.textSecondary },
        ]}
        // Associate label with input for screen readers
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {label}
      </ThemedText>
    ) : null;

    const errorNode = error ? (
      <ThemedText
        style={styles.error}
        accessibilityLiveRegion="polite"
        accessibilityRole="alert"
      >
        {error}
      </ThemedText>
    ) : null;

    return (
      <View
        style={[styles.wrapper, isHorizontal && styles.wrapperHorizontal]}
        // Wrapper is not interactive — keep it out of the accessibility tree
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      >
        {labelNode}
        {input}
        {errorNode}
      </View>
    );
  },
);

ThemedTextInput.displayName = "ThemedTextInput";

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  wrapperHorizontal: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },
  labelHorizontal: {
    // Fixed width keeps inputs aligned when multiple horizontal fields are stacked
    width: 100,
    textAlign: "right",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    lineHeight: 20,
  },
  inputHorizontalFlex: {
    flex: 1,
  },
  error: {
    fontSize: 12,
    lineHeight: 16,
    color: "#E53E3E",
  },
});
