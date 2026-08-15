import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAppSelector } from "@/store/hooks";
import Feather from "@react-native-vector-icons/feather";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CardProps = {
  icon: React.ComponentProps<typeof Feather>["name"];
  title: string;
  value: string;
  note: string;
  badge?: string;
};

function StreakCard({ icon, title, value, note, badge }: CardProps) {
  const theme = useTheme();
  return (
    <ThemedView type="backgroundElement" style={styles.streakCard}>
      <ThemedView
        style={[styles.iconCircle, { backgroundColor: theme.secondaryInk }]}
      >
        <Feather name={icon} size={21} color={theme.primaryInk} />
      </ThemedView>
      <ThemedText style={styles.cardTitle}>{title}</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.cardValue}>
        {value}
      </ThemedText>
      {badge ? (
        <ThemedView type="surface" style={styles.multiplierBadge}>
          <ThemedText style={styles.multiplierText}>{badge}</ThemedText>
        </ThemedView>
      ) : null}
      <ThemedText themeColor="textSecondary" style={styles.cardNote}>
        {note}
      </ThemedText>
    </ThemedView>
  );
}

const REWARDS_TIERS_DATA = [
  {
    tier: "Bronze",
    label: "Budget Starter",
    desc: "You're starting your journey to strong financial habits.",
    color: "#CD7F32",
  },
  {
    tier: "Silver",
    label: "Wealth Builder",
    desc: "You're building strong saving and repayment habits.",
    color: "#A8A8A8",
  },
  {
    tier: "Gold",
    label: "Wealth Strategist",
    desc: "You're consistently growing and managing your wealth.",
    color: "#D4AF37",
  },
  {
    tier: "Platinum",
    label: "Wealth Master",
    desc: "You've mastered the art of saving and repayment. Welcome to the top tier.",
    color: "#7B8794",
  },
];

export default function RewardsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { blinkCoins } = useAppSelector((state) => state.rewards);
  const holdings = useAppSelector((state) => state.save.holdings);
  const dailySavingCount = holdings.filter((holding) => holding.frequency === "daily").length;
  const monthlySavingCount = holdings.filter((holding) => holding.frequency === "monthly").length;
  const totalInvestedAmount = holdings.reduce((total, holding) => total + Number(holding.sipAmount), 0);
  const getMultiplier = (count: number) => Math.min(count, 3);
  const dailyMultiplier = getMultiplier(dailySavingCount);
  const monthlyMultiplier = getMultiplier(monthlySavingCount);
  const tier = getTier(totalInvestedAmount);

  const icon = (
    name: React.ComponentProps<typeof Feather>["name"],
    color?: string,
  ) => (
    <ThemedView
      style={[
        styles.iconCircle,
        { backgroundColor: color || theme.secondaryInk },
      ]}
    >
      <Feather name={name} size={21} color={theme.primaryInk} />
    </ThemedView>
  );

  const renderTierCard = () => {
    return (
      <ThemedView
        key={tier.tier}
        type="backgroundElement"
        style={[styles.tierCard, {}]}
      >
        {icon("star", tier.color)}
        <ThemedView style={styles.tierHeading}>
          <ThemedText style={styles.tierName}>{tier.tier}</ThemedText>
          <ThemedView type="surface" style={[styles.tierPill]}>
            <ThemedText
              style={[
                styles.tierPillText,
                { color: tier.color, fontFamily: "Mulish-Bold" },
              ]}
            >
              {tier.label}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedText themeColor="textSecondary" style={styles.cardValue}>
          {tier.desc}
        </ThemedText>
      </ThemedView>
    );
  };
  return (
    <ThemedView type="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <Pressable
          accessibilityRole="link"
          onPress={() => router.push("/wealth/invite")}
          style={styles.inviteLink}
        >
          <ThemedText style={[styles.inviteLinkText, { color: theme.accent }]}>
            Invite friends
          </ThemedText>
        </Pressable>
        <ThemedScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <ThemedView type="backgroundElement" style={styles.balanceCard}>
            {icon("dollar-sign")}
            <ThemedText style={styles.balanceTitle}>
              Blink coins balance
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.balanceValue}>
              {blinkCoins.toLocaleString("en-IN")} Blink Coins
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.row}>
            <StreakCard
              icon="zap"
              title="Daily Saving"
              value={`${dailySavingCount} ${dailySavingCount === 1 ? "day" : "days"}`}
              badge={`×${dailyMultiplier} multiplier`}
              note={`Keep saving daily to maintain your ×${dailyMultiplier} reward multiplier.`}
            />
            <StreakCard
              icon="calendar"
              title="Monthly Saving"
              value={`${monthlySavingCount} ${monthlySavingCount === 1 ? "month" : "months"}`}
              badge={`×${monthlyMultiplier} multiplier`}
              note={`Your monthly saving reward multiplier is ×${monthlyMultiplier}.`}
            />
          </ThemedView>
          <ThemedView type="backgroundElement" style={styles.repaymentCard}>
            {icon("check-circle")}
            <ThemedText style={styles.cardTitle}>Repayment Streak</ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.cardValue}>
              0 months
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.cardNote}>
              Keep repayments on time.
            </ThemedText>
            <ThemedView type="surface" style={styles.largeBadge}>
              <ThemedText style={styles.largeBadgeValue}>×0</ThemedText>
              <ThemedText style={styles.largeBadgeLabel}>MULTIPLIER</ThemedText>
            </ThemedView>
          </ThemedView>
          {renderTierCard()}
          <Footer />
        </ThemedScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function getTier(totalInvestedAmount: number) {
  if (totalInvestedAmount > 99999) return REWARDS_TIERS_DATA[3];
  if (totalInvestedAmount > 9999) return REWARDS_TIERS_DATA[2];
  if (totalInvestedAmount > 999) return REWARDS_TIERS_DATA[1];
  if (totalInvestedAmount > 99) return REWARDS_TIERS_DATA[0];
  return {
    tier: "No Tier",
    label: "Getting Started",
    desc: "Invest more to unlock your first rewards tier.",
    color: "#808080",
  };
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: Spacing.two,
    paddingBottom: BottomTabInset,
  },
  content: {
    paddingTop: Spacing.three,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  inviteLink: { alignSelf: "flex-end", paddingVertical: 2 },
  inviteLinkText: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Mulish-SemiBold",
    textDecorationLine: "underline",
  },
  balanceCard: {
    minHeight: 156,
    borderRadius: 16,
    padding: Spacing.three,
    justifyContent: "center",
    gap: 5,
  },
  row: { flexDirection: "row", gap: Spacing.two },
  streakCard: {
    flex: 1,
    minHeight: 238,
    borderRadius: 16,
    padding: Spacing.three,
    gap: 5,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.two,
  },
  balanceTitle: {
    fontFamily: "Mulish-Bold",
    fontSize: 17,
    lineHeight: 22,
    marginTop: Spacing.one,
  },
  balanceValue: { fontSize: 14, lineHeight: 20 },
  cardTitle: { fontFamily: "Mulish-Bold", fontSize: 16, lineHeight: 21 },
  cardValue: { fontSize: 14, lineHeight: 20 },
  cardNote: { fontSize: 12, lineHeight: 16, marginTop: 2 },
  multiplierBadge: {
    alignSelf: "flex-start",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 2,
  },
  multiplierText: {
    fontFamily: "Mulish-SemiBold",
    fontSize: 11,
    lineHeight: 14,
  },
  repaymentCard: {
    minHeight: 188,
    borderRadius: 16,
    padding: Spacing.three,
    position: "relative",
  },
  largeBadge: {
    position: "absolute",
    top: Spacing.two,
    right: Spacing.two,
    width: 87,
    height: 65,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  largeBadgeValue: { fontFamily: "Mulish-Bold", fontSize: 20, lineHeight: 24 },
  largeBadgeLabel: {
    fontFamily: "Mulish-Bold",
    fontSize: 9,
    lineHeight: 13,
    letterSpacing: 0.5,
  },
  tierCard: { minHeight: 180, borderRadius: 16, padding: Spacing.three },
  tierHeading: { flexDirection: "row", alignItems: "center", gap: 8 },
  tierName: { fontFamily: "Mulish-Bold", fontSize: 17, lineHeight: 22 },
  tierPill: { borderRadius: 5, paddingHorizontal: 8, paddingVertical: 4 },
  tierPillText: { fontSize: 11, lineHeight: 14 },
});
