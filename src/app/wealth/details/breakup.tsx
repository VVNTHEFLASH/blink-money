import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Header from "@/components/ui/header";
import { MaxContentWidth } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAppDispatch } from "@/store/hooks";
import {
    addHolding,
    addInvestmentOrder,
    type InvestmentOrder,
} from "@/store/slices/saveSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FUND_NAME = "ICICI Prudential Multi-Asset Fund - Growth";

export default function BreakupScreen() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useLocalSearchParams<{
    amount?: string;
    frequency?: string;
    day?: string;
  }>();
  const amount = params.amount ?? "0";
  const frequency: InvestmentOrder["frequency"] =
    params.frequency === "daily" ? "daily" : "monthly";
  const orderId = `INV_ORD${Date.now()}`;
  const createdAt = new Date().toISOString();
  const investmentDay = Number(params.day ?? "1");
  const startDate = getStartDate(investmentDay);
  const order = {
    fundName: FUND_NAME,
    frequency: frequency === "daily" ? "Daily" : "Monthly",
    amount: `₹${Number(amount).toLocaleString("en-IN")}`,
    startDate,
  };
  const makeOrder = () => ({
    id: orderId,
    fundId: "FND10000000",
    isin: "INF109K01761",
    fundName: FUND_NAME,
    status: "amount_selected" as const,
    sipAmount: Number(amount).toFixed(2),
    frequency,
    investmentDay,
    goal: null,
    createdAt,
  });

  return (
    <ThemedView type="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header onBackPress={() => router.back()} />
        <ThemedView style={styles.content}>
          <ThemedText style={styles.title}>Order Summary</ThemedText>
          <ThemedView style={styles.card} type="backgroundElement">
            <ThemedText style={styles.fundName}>{order.fundName}</ThemedText>
            <ThemedView style={styles.divider} />
            <DetailRow label="Frequency" value={order.frequency} />
            <ThemedView style={styles.divider} />
            <DetailRow label="SIP Amount" value={order.amount} />
            <ThemedView style={styles.divider} />
            <DetailRow label="Start Date" value={order.startDate} />
            {frequency === "monthly" && (
              <>
                <ThemedView style={styles.divider} />
                <DetailRow
                  label="Invest Every Month"
                  value={`${investmentDay}${getOrdinalSuffix(investmentDay)}`}
                />
              </>
            )}
          </ThemedView>
          <ThemedView style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                dispatch(
                  addHolding({
                    ...makeOrder(),
                    id: `HLD_${Date.now()}`,
                    orderId,
                    status: "active",
                  }),
                );
                router.replace("/(tabs)");
              }}
              style={[styles.confirmButton, { backgroundColor: theme.accent }]}
            >
              <ThemedText
                style={[styles.confirmText, { color: theme.buttonText }]}
              >
                Confirm
              </ThemedText>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                dispatch(addInvestmentOrder(makeOrder()));
                router.replace("/(tabs)/save");
              }}
              style={[
                styles.cancelButton,
                { borderColor: theme.accent, borderWidth: 1 },
              ]}
            >
              <ThemedText
                style={[styles.cancelText, { color: theme.buttonText }]}
              >
                Cancel
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

function getOrdinalSuffix(day: number) {
  if (day % 100 >= 11 && day % 100 <= 13) return "th";
  return ["th", "st", "nd", "rd"][Math.min(day % 10, 3)];
}

function getStartDate(day: number) {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), day);
  if (start <= today) start.setMonth(start.getMonth() + 1);
  return start.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <ThemedView style={styles.row}>
      <ThemedText themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>
      <ThemedText style={styles.value}>{value}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    width: "100%",
    maxWidth: MaxContentWidth,
    paddingHorizontal: 20,
  },
  content: { flex: 1, paddingTop: 23 },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: "Mulish-Bold",
    marginBottom: 26,
  },
  card: {
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  fundName: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Mulish-SemiBold",
    maxWidth: "95%",
  },
  divider: { height: 1, backgroundColor: "#DDE2EC", marginVertical: 14 },
  row: {
    minHeight: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: { fontSize: 14, lineHeight: 20 },
  value: { fontSize: 14, lineHeight: 20, fontFamily: "Mulish-SemiBold" },
  actions: { flex: 1, gap: 8, justifyContent: "flex-end" },
  confirmButton: {
    minHeight: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmText: { fontSize: 16, lineHeight: 22, fontFamily: "Mulish-Bold" },
  cancelButton: {
    minHeight: 52,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
  },
  cancelText: { fontSize: 16, lineHeight: 22, fontFamily: "Mulish-SemiBold" },
});
