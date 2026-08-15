import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Header from "@/components/ui/header";
import ThemedButton from "@/components/ui/themed-button";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAppSelector } from "@/store/hooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleInvoiceData = {
  sipId: "INV_ORD10003849",
  fundId: "FND10000000",
  fundName: "ICICI Prudential Multi-Asset Fund - Growth",
  startDate: null,
  amount: "100.00",
  frequency: "daily",
  nextInstallmentDate: null,
  status: "amount_selected",
  bankId: null,
  goal: null,
};

const sampleMonthlyInvoiceData = {
  sipId: "INV_ORD10003855",
  fundId: "FND10000000",
  fundName: "ICICI Prudential Multi-Asset Fund - Growth",
  startDate: "2026-08-19",
  amount: "100.00",
  frequency: "monthly",
  nextInstallmentDate: null,
  status: "amount_selected",
  bankId: null,
  goal: null,
};

function formatDateToDDMMMYYYY(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function calculateUpcomingSipData(
  date: string,
  frequency: "daily" | "monthly",
  investmentDay: number,
) {
  let nextDate: Date;
  if (frequency === "daily") {
    nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
  } else {
    const now = new Date();
    nextDate = new Date(now.getFullYear(), now.getMonth(), investmentDay);
    if (nextDate <= now) nextDate.setMonth(nextDate.getMonth() + 1);

    // clamp to last day of month if needed
    const daysInMonth = new Date(
      nextDate.getFullYear(),
      nextDate.getMonth() + 1,
      0,
    ).getDate();
    if (nextDate.getDate() > daysInMonth) {
      nextDate.setDate(daysInMonth);
    }
  }

  return formatDateToDDMMMYYYY(nextDate.toISOString().split("T")[0]); // "YYYY-MM-DD"
}

export default function SipDetailsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { invoiceId } = useLocalSearchParams<{ invoiceId: string }>();
  const { investmentOrders, holdings } = useAppSelector((state) => state.save);

  const invoiceData = useMemo(() => {
    return [...investmentOrders, ...holdings].find((item) => item.id === invoiceId);
  }, [investmentOrders, holdings, invoiceId]);

  if (!invoiceData) return null;

  return (
    <ThemedView type="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header onBackPress={() => router.back()} />
        <ThemedScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <ThemedText style={styles.pageTitle}>SIP details</ThemedText>

          <ThemedView type="backgroundElement" style={styles.detailsCard}>
            <ThemedView style={styles.fundHeader}>
              <ThemedText
                numberOfLines={2}
                style={styles.fundName}
                themeColor="faqTitle"
              >
                {invoiceData.fundName}
              </ThemedText>
              <StatusLabel
                text={invoiceData.status.replaceAll("_", " ")}
                color={
                  invoiceData.status === "completed" || invoiceData.status === "active"
                    ? theme.buttonText
                    : "#F97316"
                }
              />
            </ThemedView>

            <DetailRow label="Frequency" value={capitalizeFirstChar(invoiceData.frequency)} />
            <ThemedView style={styles.divider} />
            <DetailRow
              label={<>SIP{"\n"}Amount</>}
              value={`₹${invoiceData.sipAmount}`}
            />
            <ThemedView style={styles.divider} />
            <ThemedView style={styles.upcomingBlock}>
              <ThemedView style={styles.upcomingRow}>
                <ThemedText themeColor="textSecondary" style={styles.label}>
                  Upcoming SIP
                </ThemedText>
                <ThemedText style={styles.value}>
                  {calculateUpcomingSipData(
                    invoiceData.createdAt,
                    invoiceData.frequency as "daily" | "monthly",
                    invoiceData.investmentDay,
                  ) || "—"}
                </ThemedText>
              </ThemedView>
              {/* <ThemedText themeColor="textSecondary" style={styles.helperText}>
                Complete bank linking to move this SIP forward.
              </ThemedText> */}
            </ThemedView>
          </ThemedView>

          {/* <ThemedView type="backgroundElement" style={styles.journeyCard}>
            <StatusLabel text="SIP JOURNEY" />
            <ThemedText style={styles.journeyTitle}>
              Finish setting up this SIP
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.journeyText}>
              Your amount is saved. Link a bank account next so this SIP can
              move into mandate setup.
            </ThemedText>
          </ThemedView> */}

          {invoiceData.status === "amount_selected" && (
            <ThemedButton
              label="Continue SIP"
              onPress={() =>
                router.push({
                  pathname: "/wealth/details/breakup",
                  params: {
                    amount: invoiceData.sipAmount,
                    frequency: invoiceData.frequency,
                    day: String(new Date(invoiceData.createdAt).getDate()),
                  },
                })
              }
            />
          )}

          {/* <ThemedView style={styles.transactionsSection}>
            <ThemedView style={styles.transactionsHeader}>
              <ThemedView style={styles.transactionsCopy}>
                <ThemedText style={styles.sectionTitle}>
                  Recent transactions
                </ThemedText>
                <ThemedText
                  themeColor="textSecondary"
                  style={styles.sectionSubtitle}
                >
                  Latest SIP activity for this scheme.
                </ThemedText>
              </ThemedView>
              <Pressable
                style={[styles.viewAll, { backgroundColor: theme.surface }]}
              >
                <ThemedText
                  themeColor="textSecondary"
                  style={styles.viewAllText}
                >
                  View all
                </ThemedText>
                <Feather
                  name="chevron-right"
                  size={14}
                  color={theme.textSecondary}
                />
              </Pressable>
            </ThemedView>
            <ThemedView style={styles.emptyTransactions}>
              <ThemedText themeColor="textSecondary" style={styles.emptyText}>
                No SIP transactions found for this scheme yet.
              </ThemedText>
            </ThemedView>
          </ThemedView> */}
        </ThemedScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function capitalizeFirstChar(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function StatusLabel({
  text = "Amount selected",
  color = "#F97316",
}: {
  text?: string;
  color?: string;
}) {
  return (
    <ThemedView style={styles.status}>
      <ThemedView style={[styles.statusDot, { backgroundColor: color }]} />
      <ThemedText style={[styles.statusText, color ? { color } : null]}>
        {capitalizeFirstChar(text)}
      </ThemedText>
    </ThemedView>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: React.ReactNode;
  value: string;
}) {
  return (
    <ThemedView style={styles.detailRow}>
      <ThemedText themeColor="faqTitle" style={styles.label}>
        {label}
      </ThemedText>
      <ThemedText themeColor="faqTitle" style={styles.value}>
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
  content: { paddingTop: Spacing.two, paddingBottom: Spacing.four, gap: 24 },
  pageTitle: { fontSize: 24, lineHeight: 30, fontFamily: "Mulish-Bold" },
  detailsCard: { borderRadius: 16, padding: 20, gap: 12 },
  fundHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  fundName: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "Mulish-Bold",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexShrink: 0,
    paddingTop: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FB923C",
  },
  statusText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#F97316",
    fontFamily: "Mulish-SemiBold",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  label: { width: "25%", fontSize: 13, lineHeight: 17 },
  value: { fontSize: 14, lineHeight: 20, fontFamily: "Mulish-SemiBold" },
  divider: { height: 1, backgroundColor: "#DDE2DB" },
  upcomingBlock: { gap: 6 },
  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  helperText: { fontSize: 12, lineHeight: 17 },
  journeyCard: { borderRadius: 16, padding: 20, gap: 10 },
  journeyTitle: { fontSize: 18, lineHeight: 23, fontFamily: "Mulish-Bold" },
  journeyText: { fontSize: 14, lineHeight: 20 },
  continueButton: {
    minHeight: 57,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: { fontSize: 16, lineHeight: 22, fontFamily: "Mulish-Bold" },
  transactionsSection: { gap: 12 },
  transactionsHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  transactionsCopy: { flex: 1, gap: 2 },
  sectionTitle: { fontSize: 18, lineHeight: 24, fontFamily: "Mulish-Bold" },
  sectionSubtitle: { fontSize: 14, lineHeight: 20 },
  viewAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  viewAllText: { fontSize: 12, lineHeight: 16, fontFamily: "Mulish-SemiBold" },
  emptyTransactions: {
    minHeight: 62,
    borderWidth: 1,
    borderColor: "#DDE2DB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  emptyText: { fontSize: 14, lineHeight: 20, textAlign: "center" },
});
