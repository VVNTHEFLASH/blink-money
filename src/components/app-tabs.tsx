import { Feather } from "@react-native-vector-icons/feather";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import {
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
  type TabTriggerSlotProps,
} from "expo-router/ui";
import { Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";

const tabs = [
  { name: "home", label: "Home", icon: "home" },
  { name: "save", label: "Save", icon: "cubes" },
  { name: "borrow", label: "Borrow", icon: "currency-rupee" },
  { name: "rewards", label: "Rewards", icon: "gift" },
] as const;

export default function AppTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs>
      <TabSlot style={styles.slot} />
      <TabList
        style={[
          styles.outer,
          {
            bottom: Math.max(insets.bottom, 8) + 10,
          },
        ]}
      >
        {tabs.map((tab) => (
          <TabTrigger
            key={tab.name}
            name={tab.name}
            href={tab.name === "home" ? "/" : `/${tab.name}`}
            asChild
          >
            <TabButton icon={tab.icon} label={tab.label} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

function TabButton({
  icon,
  label,
  isFocused,
  ...props
}: TabTriggerSlotProps & { icon: string; label: string }) {
  const scheme = "dark";
  const colors = Colors[scheme];
  return (
    <Pressable
      {...props}
      style={[styles.tab, isFocused && styles.selected]}
      accessibilityRole="tab"
    >
      {icon === "home" && (
        <Feather
          name="home"
          size={16}
          color={isFocused ? "#0B0F0A" : colors.textSecondary}
        />
      )}
      {icon === "cubes" && (
        <FontAwesome6
          name="cubes"
          size={16}
          color={isFocused ? "#0B0F0A" : colors.textSecondary}
          iconStyle="solid"
        />
      )}
      {icon === "currency-rupee" && (
        <MaterialIcons
          name="currency-rupee"
          size={16}
          color={isFocused ? "#0B0F0A" : colors.textSecondary}
        />
      )}
      {icon === "gift" && (
        <Feather
          name="gift"
          size={16}
          color={isFocused ? "#0B0F0A" : colors.textSecondary}
        />
      )}
      <Text
        style={[
          styles.label,
          { color: isFocused ? "#0B0F0A" : colors.textSecondary },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: { flex: 1 },
  outer: {
    position: "absolute",
    bottom: 10,
    left: 24,
    right: 24,
    maxWidth: 768,
    alignSelf: "center",
    padding: 4,
    height: 62,
    alignItems: "stretch",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#9FE870",
    borderRadius: 34,
    backgroundColor: "rgba(11, 15, 10, 0.92)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    borderRadius: 29,
  },
  selected: { backgroundColor: "#9FE870" },
  label: { fontSize: 12, lineHeight: 16, fontWeight: "600" },
});
