import { Feather } from "@react-native-vector-icons/feather";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { Slot, usePathname, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const tabs = [
  { name: "home", label: "Home", icon: "home", href: "/" },
  { name: "save", label: "Save", icon: "cubes", href: "/save" },
  { name: "borrow", label: "Borrow", icon: "currency-rupee", href: "/borrow" },
  { name: "rewards", label: "Rewards", icon: "gift", href: "/rewards" },
] as const;

export default function AppTabsWeb() {
  const scheme = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();
  const colors = Colors["dark"];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname === "/index";
    return pathname.startsWith(href);
  };

  return (
    <View style={styles.container}>
      <View style={styles.slot}>
        <Slot />
      </View>
      <View
        style={[
          styles.tabBar,
          {
            backgroundColor:
              scheme === "dark" ? "rgba(11, 15, 10, 0.92)" : "#FFF",
          },
        ]}
      >
        {tabs.map((tab) => {
          const focused = isActive(tab.href);
          const iconColor = focused ? "#0B0F0A" : colors.textSecondary;
          return (
            <Pressable
              key={tab.name}
              onPress={() => router.push(tab.href as never)}
              style={[styles.tab, focused && styles.selected]}
              accessibilityRole="tab"
            >
              {tab.icon === "home" && (
                <Feather name="home" size={16} color={iconColor} />
              )}
              {tab.icon === "cubes" && (
                <FontAwesome6
                  name="cubes"
                  size={16}
                  color={iconColor}
                  iconStyle="solid"
                />
              )}
              {tab.icon === "currency-rupee" && (
                <MaterialIcons
                  name="currency-rupee"
                  size={16}
                  color={iconColor}
                />
              )}
              {tab.icon === "gift" && (
                <Feather name="gift" size={16} color={iconColor} />
              )}
              <Text style={[styles.label, { color: iconColor }]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  slot: { flex: 1, paddingBottom: 90 },
  tabBar: {
    position: "fixed" as never,
    bottom: 18,
    left: 24,
    right: 24,
    maxWidth: 768,
    alignSelf: "center",
    height: 62,
    flexDirection: "row",
    alignItems: "stretch",
    padding: 4,
    borderWidth: 2,
    borderColor: "#9FE870",
    borderRadius: 34,
    zIndex: 100,
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
