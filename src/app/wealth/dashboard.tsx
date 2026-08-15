import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { formatAmount } from "@/components/themed-textinput";
import { ThemedView } from "@/components/themed-view";
import Header from "@/components/ui/header";
import ThemedButton from "@/components/ui/themed-button";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAppSelector } from "@/store/hooks";
import Feather from "@react-native-vector-icons/feather";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function QuickAccess({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Feather>["name"];
  label: string;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable style={styles.quickAction} onPress={onPress}>
      <ThemedView style={[styles.quickIcon, { backgroundColor: theme.accent }]}>
        <Feather name={icon} size={23} color={theme.iconColor2} />
      </ThemedView>
      <ThemedText style={[styles.quickLabel, { color: theme.buttonText }]}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

function SipEntry({
  order,
}: {
  order: {
    fundName: string;
    status: string;
    sipAmount: string;
    frequency: string;
  };
}) {
  const theme = useTheme();
  const statusColor =
    order.status === "active" || order.status === "completed"
      ? theme.buttonText
      : "#F59E0B";

  return (
    <ThemedView style={styles.sipEntry}>
      <ThemedView style={styles.fundNameContainer}>
        <ThemedText style={styles.fundName}>{order.fundName}</ThemedText>
        <ThemedView style={styles.status}>
          <ThemedView
            style={[styles.statusDot, { backgroundColor: statusColor }]}
          />
          <ThemedText style={[styles.statusText, { color: statusColor }]}>
            {order.status === "amount_selected"
              ? "Amount selected"
              : order.status}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedText
        themeColor="textSecondary"
        style={[styles.sipDetails, { color: theme.textSecondary }]}
      >
        ₹{Number(order.sipAmount).toLocaleString("en-IN")} •{" "}
        {order.frequency[0].toUpperCase() + order.frequency.slice(1)}
      </ThemedText>
    </ThemedView>
  );
}

const sampleSummaryData = {
  totalInvestedAmount: 0,
  currentMarketValue: 0,
  returnsAndLoss: 0,
  returnsAndLossPercentage: 0,
  cagr: 0,
  xirr: 0,
  pendingInvestmentAmount: 0,
};

export default function DashboardScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { investmentOrders, holdings } = useAppSelector((state) => state.save);

  const basketData = useMemo(() => {
    return {
      summary: {
        ...sampleSummaryData,
        totalInvestedAmount: holdings.reduce(
          (total, holding) => total + Number(holding.sipAmount),
          0,
        ),
      },
      orders: [...investmentOrders, ...holdings],
    };
  }, [investmentOrders, holdings]);

  return (
    <ThemedView type="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <ThemedScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <ThemedView style={styles.balanceSection}>
            <ThemedText themeColor="textSecondary" style={styles.eyebrow}>
              Total Balance
            </ThemedText>
            <ThemedView style={styles.balanceRow}>
              <ThemedText style={styles.balance}>
                {formatAmount(String(basketData.summary.totalInvestedAmount))}
              </ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.currency}>
                INR
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.returnsCard}>
            <SummaryRow
              label="Total return"
              value="₹0 (0.0%)"
              valueColor={"#059669"}
            />
            <SummaryRow
              label="Amount invested"
              value="₹0"
              valueColor={theme.faqTitle}
            />
            <SummaryRow
              label="XIRR"
              value={String(basketData.summary.xirr) || "0.0%"}
              valueColor={theme.faqTitle}
            />
          </ThemedView>

          <ThemedButton href="/wealth/sip" label="Invest more" />

          <ThemedView style={styles.section}>
            <ThemedView style={styles.sectionHeader}>
              <ThemedText style={styles.sectionTitle}>My SIPs</ThemedText>
              <Pressable
                onPress={() =>
                  Alert.alert("Coming soon", "Filter not implemented yet!")
                }
              >
                <ThemedView style={styles.filterButton}>
                  <ThemedText
                    themeColor="textSecondary"
                    style={styles.filterText}
                  >
                    Filter
                  </ThemedText>
                  <Feather
                    name="sliders"
                    size={15}
                    color={theme.textSecondary}
                    style={{ transform: "rotate(270deg)" }}
                  />
                </ThemedView>
              </Pressable>
            </ThemedView>

            <ThemedView type="backgroundElement" style={styles.sipCard}>
              <ThemedView style={styles.sipEntry}>
                <ThemedText style={styles.basketTitle}>Basket</ThemedText>
                <ThemedText
                  themeColor="textSecondary"
                  style={styles.basketSubtitle}
                >
                  SIP amount • Frequency
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.divider} />
              {basketData.orders.map((order, index) => {
                return (
                  <Pressable
                    key={order.id}
                    onPress={() => {
                      if (
                        order.status === "completed" ||
                        order.status === "active" ||
                        order.status === "amount_selected"
                      ) {
                        router.push({
                          pathname: "/wealth/details/[invoiceId]",
                          params: { invoiceId: order.id },
                        });
                      }
                    }}
                  >
                    <SipEntry key={order.id} order={order} />
                    {index < basketData.orders.length - 1 && (
                      <ThemedView style={styles.divider} />
                    )}
                  </Pressable>
                );
              })}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Quick access</ThemedText>
            <ThemedView style={styles.quickRow}>
              <QuickAccess
                icon="clock"
                label="Transactions"
                onPress={() => router.push("/wealth/transactions")}
              />
              <QuickAccess
                icon="arrow-up-right"
                label="Upgrade amount"
                onPress={() => router.push("/wealth/sip")}
              />
              <QuickAccess
                icon="credit-card"
                label="Redeem Funds"
                onPress={() => {
                  Alert.alert("Coming soon", "Refunds not implemented yet");
                }}
              />
            </ThemedView>
          </ThemedView>
        </ThemedScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function SummaryRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <ThemedView style={styles.summaryRow}>
      <ThemedText themeColor="faqDescription" style={styles.summaryLabel}>
        {label}
      </ThemedText>
      <ThemedText
        style={[styles.summaryValue, valueColor ? { color: valueColor } : null]}
      >
        {value}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingBottom: BottomTabInset,
  },
  content: { paddingBottom: Spacing.five, gap: Spacing.three },
  balanceSection: { gap: 2, marginTop: Spacing.two },
  eyebrow: { fontSize: 11, lineHeight: 22 },
  balanceRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  balance: { fontSize: 27, lineHeight: 36, fontFamily: "Mulish-Bold" },
  currency: { fontSize: 11, lineHeight: 22, fontFamily: "Mulish-Medium" },
  returnsCard: { borderRadius: 16, padding: 16, gap: 8 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: { fontSize: 12, lineHeight: 16 },
  summaryValue: { fontSize: 12, lineHeight: 16, fontFamily: "Mulish-SemiBold" },
  investButton: {
    minHeight: 57,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  investButtonText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "Mulish-SemiBold",
  },
  section: { gap: Spacing.two },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 17, lineHeight: 24, fontFamily: "Mulish-SemiBold" },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#C1C9B6",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterText: { fontSize: 14, lineHeight: 20 },
  sipCard: { borderRadius: 16, paddingHorizontal: 16 },
  basketTitle: { fontSize: 12, lineHeight: 16, fontFamily: "Mulish-SemiBold" },
  basketSubtitle: { fontSize: 11, lineHeight: 20, marginTop: 2 },
  divider: { height: 1, backgroundColor: "#DDE2DB" },
  sipEntry: {
    paddingVertical: Spacing.two + Spacing.one,
  },
  fundNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fundName: { fontSize: 12, lineHeight: 16 },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 11, lineHeight: 16 },
  sipDetails: { fontSize: 11, lineHeight: 16, marginTop: 2 },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    paddingTop: 8,
  },
  quickAction: { flex: 1, alignItems: "center", gap: 8 },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: { fontSize: 12, lineHeight: 16, textAlign: "center" },
});
