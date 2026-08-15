import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import ThemedButton from "@/components/ui/themed-button";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import Feather from "@react-native-vector-icons/feather";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionsScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  return (
    <ThemedView type="background" style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <Pressable
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={[styles.iconButton, { backgroundColor: theme.surface }]}
          >
            <Feather name="chevron-left" size={22} color={theme.text} />
          </Pressable>
          <ThemedText style={styles.title}>Transactions</ThemedText>
          <Pressable
            accessibilityLabel="Filter transactions"
            style={[
              styles.iconButton,
              {
                borderColor: theme.iconBorderColor,
                transform: "rotate(270deg)",
                backgroundColor: theme.surface,
              },
            ]}
          >
            <Feather name="sliders" size={19} color={theme.text} />
          </Pressable>
        </ThemedView>
        <ThemedScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <ThemedView
            style={[styles.summaryCard, { borderColor: theme.borderColor }]}
            type="transactionSummaryCard"
          >
            <ThemedText style={[styles.summaryTitle]} themeColor="faqTitle">
              Wealth transactions
            </ThemedText>
            <ThemedText themeColor="textSecondary" style={styles.summaryText}>
              0 movements across SIP instalments and withdrawals.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.transactionContainer}>
            {transactions.length <= 0 ? (
              <ThemedView style={styles.emptyState}>
                <ThemedView style={{ alignItems: "center" }}>
                  <ThemedView
                    style={[styles.emptyIcon]}
                    type="transactionFilterIcon"
                  >
                    <Feather
                      name="sliders"
                      size={24}
                      color={theme.secondaryInk}
                      style={{
                        transform: "rotate(270deg)",
                      }}
                    />
                  </ThemedView>
                </ThemedView>
                <ThemedText style={styles.emptyTitle} themeColor="faqTitle">
                  No transactions yet
                </ThemedText>
                <ThemedText
                  themeColor="faqDescription"
                  style={styles.emptyText}
                >
                  Start a SIP and each successful instalment will appear here.
                </ThemedText>
                <ThemedButton label="Start a SIP" href="/wealth/sip" />
              </ThemedView>
            ) : (
              <ThemedView>
                {/* TODO */}
                <ThemedText>Transaction List Data</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedScrollView>
      </SafeAreaView>
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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.two,
    marginTop: Spacing.one,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  title: { fontSize: 18, lineHeight: 24, fontFamily: "Mulish-SemiBold" },
  content: {
    flexGrow: 1,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.four,
    gap: Spacing.three,
  },
  summaryCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    gap: 4,
  },
  summaryTitle: { fontSize: 17, lineHeight: 24, fontFamily: "Mulish-Bold" },
  summaryText: { fontSize: 11, lineHeight: 16 },
  transactionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  emptyState: {
    borderWidth: 1,
    borderColor: "#E1E4E3",
    borderRadius: 24,
    padding: 24,
    justifyContent: "flex-end",
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: "Mulish-Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 24,
  },
});
