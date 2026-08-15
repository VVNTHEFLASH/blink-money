import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useTheme } from "@/hooks/use-theme";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, ViewStyle } from "react-native";

export interface ThemedDatePickerProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (day: number) => void;
  initialDay?: number;
  modalStyle?: ViewStyle;
}

const DAYS = [
  "01",
  "02",
  ...Array.from({ length: 29 }, (_, index) =>
    String(index + 3).padStart(2, "0"),
  ),
];
const LEADING_EMPTY_DAYS = 5;
const WEEKEND_DAYS = new Set(["02", "09", "16", "23"]);
const NEXT_MONTH_DAYS = new Set(["29", "30", "31"]);
const CALENDAR_CELLS: Array<string | null> = [
  ...Array.from({ length: LEADING_EMPTY_DAYS }, () => null),
  ...DAYS,
];

/**
 * Memoized DayCell — only re-renders when its props actually change.
 * We pass only the minimal theme values needed so shallow comparison is cheap.
 */
type DayCellProps = {
  day: string | null;
  isSelected: boolean;
  onSelect: (dayNumber: number) => void;
  themeColors: { selectedDateColor: string; textFaint: string };
};

const DayCell = React.memo(
  function DayCell({ day, isSelected, onSelect, themeColors }: DayCellProps) {
    if (!day) {
      return <ThemedView style={styles.dayCell} />;
    }

    const dayNumber = Number(day);
    const isWeekend = WEEKEND_DAYS.has(day);
    const isNextMonth = NEXT_MONTH_DAYS.has(day);

    return (
      <Pressable
        key={day}
        onPress={() => onSelect(dayNumber)}
        style={styles.dayCell}
      >
        <ThemedView
          style={[
            styles.day,
            isSelected && styles.selectedDay,
            isSelected && { backgroundColor: themeColors.selectedDateColor },
          ]}
        >
          <ThemedText
            style={[
              styles.dayText,
              isWeekend && styles.weekendText,
              isNextMonth && { color: themeColors.textFaint },
              isSelected && styles.selectedText,
            ]}
          >
            {day}
          </ThemedText>
        </ThemedView>
      </Pressable>
    );
  },
  /**
   * Custom comparator: re-render only when relevant props change.
   */
  (prev, next) =>
    prev.day === next.day &&
    prev.isSelected === next.isSelected &&
    prev.themeColors.selectedDateColor === next.themeColors.selectedDateColor &&
    prev.themeColors.textFaint === next.themeColors.textFaint,
);

export function ThemedDatePicker({
  visible,
  onCancel,
  onConfirm,
  initialDay = 19,
  modalStyle,
}: ThemedDatePickerProps) {
  const theme = useTheme();
  const [selectedDay, setSelectedDay] = useState(initialDay);

  // Keep selectedDay in sync if initialDay prop changes
  useEffect(() => {
    setSelectedDay(initialDay);
  }, [initialDay]);

  // Stable handler to avoid recreating functions for each cell
  const handleSelect = useCallback((dayNumber: number) => {
    setSelectedDay(dayNumber);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm(selectedDay);
  }, [onConfirm, selectedDay]);

  // Minimal theme values passed to DayCell to keep comparisons cheap
  const themeColors = useMemo(
    () => ({
      selectedDateColor: theme.selectedDateColor,
      textFaint: theme.textFaint,
    }),
    [theme.selectedDateColor, theme.textFaint],
  );

  // Precompute rows once — stable across renders
  const rows = useMemo(() => {
    const rowCount = Math.ceil(CALENDAR_CELLS.length / 7);
    const result: Array<Array<string | null>> = [];
    for (let r = 0; r < rowCount; r++) {
      result.push(CALENDAR_CELLS.slice(r * 7, r * 7 + 7));
    }
    return result;
  }, []);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
      style={modalStyle}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable
          style={[styles.sheet, { backgroundColor: theme.backgroundElement }]}
          onPress={(event) => event.stopPropagation()}
        >
          <ThemedView style={styles.handle} />
          <ThemedText style={[styles.title, { color: theme.secondaryInk }]}>
            Pick Monthly SIP date
          </ThemedText>

          <ThemedView style={styles.calendar} type="surface">
            {rows.map((row, rowIndex) => (
              <ThemedView key={`row-${rowIndex}`} style={styles.dayRow}>
                {row.map((day, cellIndex) => {
                  const dayNumber = day ? Number(day) : -1;
                  const isSelected = day ? selectedDay === dayNumber : false;
                  return (
                    <DayCell
                      key={day ?? `empty-${cellIndex}`}
                      day={day}
                      isSelected={isSelected}
                      onSelect={handleSelect}
                      themeColors={themeColors}
                    />
                  );
                })}
              </ThemedView>
            ))}
          </ThemedView>

          <ThemedText style={styles.installmentText}>
            First SIP installment on{" "}
            <ThemedText
              style={[styles.installmentDate, { color: theme.accent }]}
            >
              Aug {selectedDay}, 2026
            </ThemedText>
          </ThemedText>

          <ThemedView style={styles.actions}>
            <Pressable
              onPress={onCancel}
              style={[styles.cancelButton, { borderColor: theme.accent }]}
            >
              <ThemedText style={styles.cancelText}>Cancel</ThemedText>
            </Pressable>
            <Pressable
              onPress={handleConfirm}
              style={[styles.confirmButton, { backgroundColor: theme.accent }]}
            >
              <ThemedText style={styles.confirmText}>Confirm</ThemedText>
            </Pressable>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  sheet: {
    width: "100%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },
  handle: {
    width: 48,
    height: 6,
    borderRadius: 3,
    alignSelf: "center",
    backgroundColor: "#D1D5DB",
    marginBottom: 24,
  },
  title: {
    textAlign: "center",
    fontSize: 23,
    lineHeight: 36,
    fontFamily: "Mulish-Bold",
    marginBottom: 24,
  },
  calendar: {
    borderRadius: 24,
    padding: 20,
    gap: 4,
    marginBottom: 24,
  },
  dayRow: { flexDirection: "row" },
  dayCell: {
    flex: 1,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  day: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: "transparent",
  },
  selectedDay: { borderRadius: 16 },
  dayText: { fontSize: 11, lineHeight: 16 },
  weekendText: { color: "#f87171" },
  selectedText: { color: "#FFFFFF", fontFamily: "Mulish-Bold" },
  installmentText: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 24,
    marginBottom: 20,
  },
  installmentDate: {
    fontSize: 11,
    fontFamily: "Mulish-Bold",
    textDecorationLine: "underline",
  },
  actions: { flexDirection: "row", gap: 16 },
  cancelButton: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  confirmButton: {
    flex: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cancelText: { fontSize: 20, lineHeight: 28, fontFamily: "Mulish-SemiBold" },
  confirmText: { fontSize: 20, lineHeight: 28, fontFamily: "Mulish-SemiBold" },
});
