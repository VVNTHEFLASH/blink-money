import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

const BorrowPageBg = require("../../assets/images/borrow-page-bg-banner.png");

export default function BorrowScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <ThemedScrollView
          type="background"
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            source={BorrowPageBg}
            style={styles.hero}
            imageStyle={styles.heroImage}
          >
            <ThemedView style={styles.heroContent}>
              <ThemedView type="transparent">
                <ThemedView style={styles.badge}>
                  <ThemedText style={styles.badgeText}>
                    No credit score required
                  </ThemedText>
                </ThemedView>
                <ThemedText style={styles.heroTitle}>
                  Borrow without{"\n"}
                  <ThemedText style={styles.heroAccent}>
                    selling a rupee
                  </ThemedText>
                </ThemedText>
                <ThemedText style={styles.heroSubtitle}>
                  Start SIP &amp; unlock credit at ₹25K
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.statRow} type="transparent">
                <ThemedView style={styles.statCard} type="transparent">
                  <ThemedText style={styles.statLabel}>
                    No EMIs. Interest @
                  </ThemedText>
                  <ThemedText style={styles.statValue}>
                    9.99%{" "}
                    <ThemedText style={styles.statSmall}>p.a.*</ThemedText>
                  </ThemedText>
                </ThemedView>
                <ThemedView style={styles.statCard}>
                  <ThemedText style={styles.statLabel}>Borrow upto</ThemedText>
                  <ThemedText style={styles.statValue}>
                    50%{" "}
                    <ThemedText
                      style={[styles.statSmall, { color: "#ffffffcc" }]}
                    >
                      of SIP
                    </ThemedText>
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.heroBottom}>
                <ThemedText style={styles.instant}>
                  ▌ Instant cash in 10 minutes
                </ThemedText>
                <ThemedText style={styles.terms}>*T&amp;C apply</ThemedText>
              </ThemedView>
            </ThemedView>
          </ImageBackground>

          <ThemedView type="surface" style={[styles.unlockCard]}>
            <ThemedView style={[styles.unlockHeader]} type="surface">
              <ThemedText style={styles.unlockTitle} themeColor="faqTitle">
                Unlocks at ₹25k
              </ThemedText>
              <ThemedView type="backgroundElement" style={[styles.status]}>
                <ThemedText
                  themeColor="faqDescription"
                  style={styles.statusText}
                >
                  Not started
                </ThemedText>
              </ThemedView>
            </ThemedView>
            <ThemedView
              style={[styles.progressTrack, { borderColor: theme.accent }]}
            >
              <ThemedView style={styles.progressFill} />
            </ThemedView>
            <ThemedView style={styles.progressLabels} type="surface">
              <ThemedView type="surface">
                <ThemedText style={styles.amount} themeColor="faqTitle">
                  ₹0
                </ThemedText>
                <ThemedText
                  themeColor="faqDescription"
                  style={styles.amountLabel}
                >
                  Invested
                </ThemedText>
              </ThemedView>
              <ThemedText style={styles.percent} themeColor="textFaint">
                0%
              </ThemedText>
              <ThemedView style={styles.alignRight} type="surface">
                <ThemedText style={styles.amount} themeColor="faqTitle">
                  ₹25,000
                </ThemedText>
                <ThemedText
                  themeColor="faqDescription"
                  style={styles.amountLabel}
                >
                  Min. balance
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView>
            <ThemedText style={styles.setup}>
              4 min setup. Cancel anytime.
            </ThemedText>
            <Link href="/save" asChild>
              <Pressable>
                <ThemedView type="accent" style={styles.cta}>
                  <ThemedText
                    style={[styles.ctaText, { color: theme.primaryInk }]}
                  >
                    Start SIP · From ₹21/day
                  </ThemedText>
                </ThemedView>
              </Pressable>
            </Link>
          </ThemedView>
          <Footer />
        </ThemedScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  scrollView: { flex: 1 },
  scrollContent: {
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  hero: {
    width: "100%",
    aspectRatio: 1432 / 1252,
    overflow: "hidden",
    borderRadius: 16,
  },
  heroImage: { resizeMode: "cover" },
  heroContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  heroTop: { gap: 12, backgroundColor: "transparent" },
  heroHeading: { gap: 0, backgroundColor: "transparent" },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 18,
    backgroundColor: "#0F3D1A",
  },
  badgeText: {
    color: "#9FE870",
    fontSize: 12,
    lineHeight: 16,
  },
  heroTitle: {
    marginTop: 10,
    fontSize: 23,
    lineHeight: 34,
    color: "#FFFFFF",
    fontFamily: "Mulish-Bold",
  },
  heroAccent: {
    color: "#9FE870",
    fontSize: 23,
    lineHeight: 28,
    fontFamily: "Mulish-Bold",
  },
  heroSubtitle: {
    marginTop: 0,
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    lineHeight: 34,
  },
  statRow: { flexDirection: "row", gap: 8 },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  statLabel: { color: "#ffffffcc", fontSize: 11, lineHeight: 13 },
  statValue: {
    color: "#9FE870",
    fontSize: 17,
    lineHeight: 24,
    fontFamily: "Mulish-Bold",
  },
  statSmall: { color: "#9FE870", fontSize: 11, fontFamily: "Mulish-Bold" },
  heroBottom: { gap: 8, backgroundColor: "transparent" },
  instant: {
    color: "#9FE870",
    fontSize: 11,
    lineHeight: 13,
    fontFamily: "Mulish-SemiBold",
  },
  terms: { color: "#ffffff80", fontSize: 10, lineHeight: 14 },
  unlockCard: { padding: Spacing.three, borderRadius: 22, gap: 24 },
  unlockHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  unlockTitle: { fontSize: 13, fontWeight: "500" },
  status: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 22 },
  statusText: {
    fontSize: 11,
    lineHeight: 13,
  },
  progressTrack: {
    height: 8,
    borderWidth: 2,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: { width: 0, height: "100%" },
  progressLabels: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amount: { fontSize: 15, fontWeight: "600" },
  percent: { fontSize: 23, fontWeight: "600" },
  alignRight: { alignItems: "flex-end" },
  setup: {
    textAlign: "center",
    color: "#B0B4BA",
    fontSize: 11,
    lineHeight: 28,
  },
  amountLabel: { fontSize: 11, lineHeight: 12 },
  cta: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.three,
    gap: Spacing.two,
  },
  ctaText: { fontSize: 13, lineHeight: 16, color: "#296600" },
});
