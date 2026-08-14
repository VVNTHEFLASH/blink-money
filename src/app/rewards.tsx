import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTheme } from "@/hooks/use-theme";
import Feather from "@react-native-vector-icons/feather";
import { Alert, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RewardsScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <ThemedScrollView>
          <ThemedView
            style={[
              styles.inviteContainer,
              {
                borderColor: scheme === "dark" ? "#1b2418" : "#0f5132",
              },
            ]}
            type="backgroundElement"
          >
            <ThemedView type="backgroundElement">
              <ThemedView type="accent" style={styles.inviteIconCircle}>
                <Feather name="gift" size={28} color="rgb(41 102 0)" />
              </ThemedView>
            </ThemedView>
            <ThemedView type="backgroundElement">
              <ThemedText themeColor="faqTitle" style={styles.inviteTitle}>
                Invite friends to BlinkMoney
              </ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement">
              <ThemedText
                themeColor="faqDescription"
                style={styles.inviteDescription}
              >
                Share your referral code and help them start investing or unlock
                credit against mutual funds.
              </ThemedText>
            </ThemedView>
            <ThemedView
              style={styles.inviteReferralContainer}
              lightColor="#FFF"
              darkColor="#0B0F0A"
            >
              <ThemedText
                themeColor="faqDescription"
                style={styles.referralCodeLabel}
              >
                Referral code
              </ThemedText>
              <ThemedText
                style={[
                  styles.referralCode,
                  { color: scheme === "dark" ? "#DFFFD0" : "#1E4A00" },
                ]}
              >
                AXBH
              </ThemedText>
            </ThemedView>
          </ThemedView>
          <Pressable
            onPress={() => {
              Alert.alert("Share invite", "Share link is not available.");
            }}
          >
            <ThemedView style={styles.shareInviteContainer} type="accent">
              <Feather name="share-2" size={18} color={theme.primaryInk} />
              <ThemedText
                style={styles.shareInviteText}
                className="text-[#296600]"
              >
                Share invite
              </ThemedText>
              <ThemedView />
            </ThemedView>
          </Pressable>
          <Footer />
        </ThemedScrollView>
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
    // alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  inviteContainer: {
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
    marginBottom: Spacing.three,
    borderWidth: 1,
  },
  inviteTitle: {
    fontSize: 17,
    textAlign: "center",
    lineHeight: 16,
  },
  inviteDescription: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
  inviteIconCircle: {
    width: 56,
    height: 56,
    alignSelf: "center",
    marginVertical: Spacing.two,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  inviteReferralContainer: {
    borderRadius: 8,
    padding: Spacing.two,
  },
  referralCodeLabel: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
  },
  referralCode: {
    fontSize: 23,
    textAlign: "center",
  },
  shareInviteContainer: {
    borderRadius: 12,
    padding: Spacing.three,
    gap: Spacing.two,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.three,
  },
  shareInviteText: {
    fontSize: 13,
    lineHeight: 16,
    color: "#296600",
  },
});
