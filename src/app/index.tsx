import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
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
import { useState } from "react";

const faqs = [
  {
    title: "What is BlinkMoney?",
    description:
      "BlinkMoney gives you instant access to up to ₹1 Crore,  without selling your mutual funds. You can access cash when you need it, while your investments keep growing ,  all through an easy digital process.",
  },
  {
    title: "Who is eligible for BlinkMoney?",
    description:
      "To unlock BlinkMoney's potential, you should be a Resident Indian individual between 18 and 65 years of age, with a mutual fund portfolio of ₹20,000 or more. We believe in empowering responsible financial access.",
  },
  {
    title: "What mutual funds are eligible?",
    description:
      "BlinkMoney deals in Mutual funds that perform, more than 6000 mutual fund schemes. We work with CAMS & KFintech approved funds. Some have limitations, such as fixed tenure MF; we'll tell you what's what. You focus on the win. Additionally, your investments in MF through your demat account are also not eligible.",
  },
  {
    title: "What documents are required to apply?",
    description:
      "BlinkMoney is 100% digital and paperless. Have your PAN, CAMS/KFintech linked email, bank details, and net banking access ready. We're efficient; you should be too.",
  },
  {
    title: "How much can I borrow?",
    description:
      "BlinkMoney gives you access to credit lines of up to ₹1 crore ,  without selling your investments. Unlock up to 50% of your equity/ hybrid funds and 90% of your debt funds, so the wealth you've built keeps working for you while powering what's next.",
  },
  {
    title: "What are the interest rates?",
    description:
      "Staring at 9.99% pa, BlinkMoney is committed to providing competitive and transparent pricing. Our interest rates are tailored to your unique financial profile. You'll receive clear details on your applicable rate upfront.",
  },
  {
    title: "Do I have to pay interest on the entire credit line?",
    description:
      "You pay for what you use. Not a penny more. Unused credit remains cost-free. That's how smart money works.",
  },
  {
    title: "What is lien marking/pledging of mutual funds?",
    description:
      "Lien marking/pledging is the process of using your mutual fund investments as collateral for the loan. It's digital, it's standard, and you still own your mutual funds just can't sell them until the loan is repaid.",
  },
  {
    title: "Can I still get returns on my pledged investments?",
    description:
      "Absolutely! BlinkMoney ensures your investments work for you. You continue to earn returns on your pledged mutual funds, capturing market upside while accessing liquidity.",
  },
  {
    title: "Do I have to pay EMIs?",
    description:
      "With BlinkMoney, you pay monthly interest on the amount you withdraw , not on your full credit line. The principal can be repaid anytime, in parts or in full, giving you complete control over cash flow.",
  },
];

function FAQSection() {
  const theme = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ThemedView style={styles.faqSection}>
      <ThemedText style={styles.sectionTitle} themeColor="faqTitle">
        FAQs
      </ThemedText>
      <ThemedView
        style={[styles.faqList, { backgroundColor: theme.backgroundElement }]}
      >
        {faqs.map((question, index) => {
          const isOpen = openIndex === index;
          return (
            <View key={question.title}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
                onPress={() => setOpenIndex(isOpen ? null : index)}
                style={({ pressed }) => [
                  styles.faqRow,
                  pressed && styles.cardPressed,
                ]}
              >
                <ThemedText themeColor="faqTitle" style={[styles.faqQuestion]}>
                  {question.title}
                </ThemedText>
                <Lucide
                  name={isOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={theme.text}
                />
              </Pressable>
              {isOpen && (
                <ThemedText
                  themeColor="faqDescription"
                  style={[styles.faqAnswer]}
                >
                  {question.description}
                </ThemedText>
              )}
              {index < faqs.length - 1 && (
                <View
                  style={[
                    styles.faqDivider,
                    { backgroundColor: theme.backgroundSelected },
                  ]}
                />
              )}
            </View>
          );
        })}
      </ThemedView>
    </ThemedView>
  );
}

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
          <ThemedText style={styles.cardTitle} themeColor="faqTitle">
            {title}
          </ThemedText>
          <ThemedText
            style={styles.cardDescription}
            themeColor="faqDescription"
          >
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
          <FAQSection />
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
  faqSection: { gap: Spacing.two },
  faqList: { overflow: "hidden", borderRadius: 16 },
  faqRow: {
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.two,
  },
  faqQuestion: { flex: 1, fontSize: 12, lineHeight: 20, fontWeight: "400" },
  faqAnswer: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    fontSize: 11,
    lineHeight: 19,
  },
  faqDivider: { height: 1, width: "100%" },
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
