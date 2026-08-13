import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/header";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import Feather from "@react-native-vector-icons/feather";
import Ionicons from "@react-native-vector-icons/ionicons";
import Lucide from "@react-native-vector-icons/lucide";

function Card({
  title,
  description,
  href,
  icon,
  iconBackground,
}: {
  title: string;
  description: string;
  href: string | null;
  icon: (iconColor?: string) => React.ReactNode;
  iconBackground: string;
}) {
  const theme = useTheme();

  const renderPressable = () => {
    const isFeature = iconBackground != "transparent";
    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: theme.backgroundElement },
          pressed && styles.cardPressed,
        ]}
      >
        <ThemedView
          style={[
            styles.iconCircle,
            isFeature
              ? {
                  width: 48,
                  height: 48,
                }
              : {
                  width: 40,
                  height: 40,
                  borderColor: "#3A5C42",
                },
            {
              backgroundColor: iconBackground,
            },
          ]}
        >
          {icon(theme.iconColor)}
        </ThemedView>
        <ThemedView
          style={[
            styles.cardCopy,
            { backgroundColor: theme.backgroundElement },
          ]}
        >
          <ThemedText style={styles.cardTitle}>{title}</ThemedText>
          <ThemedText style={styles.cardDescription} themeColor="textSecondary">
            {description}
          </ThemedText>
        </ThemedView>
      </Pressable>
    );
  };

  return (
    <ThemedView
      style={[styles.cardSlot, { backgroundColor: theme.backgroundElement }]}
    >
      {href != null ? (
        <Link href={href as never} asChild>
          {renderPressable()}
        </Link>
      ) : (
        renderPressable()
      )}
    </ThemedView>
  );
}

const features = [
  {
    title: "Save",
    description: "Save money and earn interest",
    href: "/save",
    icon: () => (
      <FontAwesome6
        iconStyle="solid"
        name="arrow-trend-up"
        size={18}
        color="#F4F7F0"
      />
    ),
    iconBackground: "#3A5C42",
  },
  {
    title: "Borrow",
    description: "Borrow money with low interest",
    href: "/borrow",
    icon: () => (
      <FontAwesome6
        iconStyle="solid"
        name="credit-card"
        size={18}
        color="#F4F7F0"
      />
    ),
    iconBackground: "#1E3A4A",
  },
  {
    title: "Rewards",
    description: "Earn rewards for saving and borrowing",
    href: "/rewards",
    icon: () => (
      <FontAwesome6 iconStyle="solid" name="gift" size={18} color="#F4F7F0" />
    ),
    iconBackground: "#3A5C42",
  },
];

const whyBlinkMoney = [
  {
    title: "Low minimums",
    description: "Start your SIPs with as little as ₹21 and earn ~14% returns",
    href: null,
    icon: (iconColor?: string) => (
      <Feather name="bar-chart-2" size={20} color={iconColor} />
    ),
    iconBackground: "transparent",
  },
  {
    title: "Hands-off investing",
    description:
      "We take care of research, allocation, and rebalancing for you",
    href: null,
    icon: (iconColor?: string) => (
      <Lucide name="refresh-cw" size={20} color={iconColor} />
    ),
    iconBackground: "transparent",
  },
  {
    title: "Fully digital",
    description: "Set up and manage everything online",
    href: null,
    icon: (iconColor?: string) => (
      <Lucide name="scale" size={20} color={iconColor} />
    ),
    iconBackground: "transparent",
  },
  {
    title: "Instant cash",
    description:
      "Borrow against your investments without selling them in just 10 minutes",
    href: null,
    icon: (iconColor?: string) => (
      <Ionicons name="flash-outline" size={20} color={iconColor} />
    ),
    iconBackground: "transparent",
  },
  {
    title: "Low-cost borrowing",
    description: "Pay interest only, starting at 9.99% p.a.",
    href: null,
    icon: (iconColor?: string) => (
      <Lucide name="hand-coins" size={20} color={iconColor} />
    ),
    iconBackground: "transparent",
  },
  {
    title: "Inclusive by design",
    description: "Start investing with just your PAN and a bank account",
    href: null,
    icon: (iconColor?: string) => (
      <FontAwesome6
        name="cubes"
        size={20}
        color={iconColor}
        iconStyle="solid"
      />
    ),
    iconBackground: "transparent",
  },
];

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <ScrollView
          style={[styles.scrollView, { backgroundColor: theme.background }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView>
            <ThemedText style={styles.sectionTitle}>Features</ThemedText>
            <ThemedView style={styles.gridContainer}>
              {features.map((feature) => (
                <Card key={feature.href} {...feature} />
              ))}
            </ThemedView>
          </ThemedView>
          <ThemedView>
            <ThemedText style={styles.sectionTitle}>Why BlinkMoney?</ThemedText>
            <ThemedView style={styles.gridContainer}>
              {whyBlinkMoney.map((feature, index) => (
                <Card key={feature.href || index} {...feature} />
              ))}
            </ThemedView>
          </ThemedView>
          <Footer />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    maxWidth: MaxContentWidth,
  },
  scrollView: { flex: 1 },
  scrollContent: {
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  cardSlot: {
    flexGrow: 1,
    flexBasis: "45%",
    minWidth: 0,
    borderRadius: 12,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: Spacing.two,
  },
  card: {
    width: "100%",
    // height: 150,
    padding: Spacing.one,
    borderRadius: 16,
    gap: Spacing.one,
  },
  cardPressed: {
    opacity: 0.78,
  },
  iconCircle: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A5C42",
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },
  cardCopy: {
    // gap: 6
  },
  cardDescription: {
    fontSize: 11,
    lineHeight: 15,
  },
});
