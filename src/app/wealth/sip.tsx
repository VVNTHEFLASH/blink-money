import { ThemedDatePicker } from "@/components/themed-datepicker";
import { ThemedScrollView } from "@/components/themed-scrollview";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-textinput";
import { ThemedView } from "@/components/themed-view";
import Header from "@/components/ui/header";
import ThemedButton from "@/components/ui/themed-button";
import {
  BottomTabInset,
  MaxContentWidth,
  Spacing,
  ThemeColor,
} from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import Feather from "@react-native-vector-icons/feather";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import Lucide, { LucideIconName } from "@react-native-vector-icons/lucide";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { RefObject, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface GenericPlanViewProps {
  title: string;
  popularPlans: number[];
  amount: string;
  onChangeAmount: (amount: string) => void;
  amountRef: RefObject<TextInput | null>;
  minimumAmount?: number;
  maximumAmount?: number;
  onPressMinus: (amount: string, minimumAmount?: number) => void;
  onPressPlus: (amount: string, maximumAmount?: number) => void;
  disabled: {
    minus: boolean;
    plus: boolean;
  };
}

function IconButton({
  iconName,
  onPress,
  disabled,
}: {
  iconName: LucideIconName;
  onPress: () => void;
  disabled: boolean;
}) {
  const theme = useTheme();
  return (
    <Pressable onPress={onPress} disabled={disabled}>
      <ThemedView
        style={{
          width: 24,
          height: 24,
          borderRadius: 32,
          backgroundColor: theme.accent,
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.3 : 1,
        }}
      >
        {!disabled && (
          <Lucide name={iconName} size={14} color={theme.primaryInk} />
        )}
      </ThemedView>
    </Pressable>
  );
}

interface PopularPlanButtonProps {
  amount: number;
  onPress: (amount: number) => void;
}

export function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
}

function PopularPlanButton({ amount, onPress }: PopularPlanButtonProps) {
  const theme = useTheme();
  return (
    <Pressable onPress={() => onPress(amount)} style={{ flex: 1 }}>
      <ThemedView
        type="backgroundElement"
        style={{
          borderColor: theme.accent,
          borderWidth: 1,
          borderRadius: 8,
          padding: Spacing.one / 2,
        }}
      >
        <ThemedText style={{ fontSize: 10, textAlign: "center" }}>
          ₹{formatAmount(amount)}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

function GenericPlanView({
  title,
  popularPlans,
  amount,
  onChangeAmount,
  amountRef,
  minimumAmount,
  onPressMinus,
  onPressPlus,
  disabled,
}: GenericPlanViewProps) {
  const theme = useTheme();
  return (
    <ThemedView
      type="surface"
      style={{
        marginBlock: Spacing.three,
        justifyContent: "space-between",
        paddingBlock: Spacing.three,
        borderRadius: 12,
      }}
    >
      <ThemedText
        style={{
          fontSize: 11,
          textAlign: "center",
        }}
        themeColor="faqDescription"
      >
        {title}
      </ThemedText>
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: Spacing.two,
          borderRadius: 12,
          marginBlock: Spacing.three,
        }}
      >
        <IconButton
          iconName="minus"
          disabled={disabled?.minus}
          onPress={() => onPressMinus(amount, minimumAmount)}
        />
        <ThemedView
          // type="backgroundElement"
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ThemedText
            themeColor="faqDescription"
            style={{
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            ₹
          </ThemedText>
          <ThemedTextInput
            ref={amountRef}
            value={amount}
            style={{
              borderWidth: 0,
              fontSize: 32,
              fontWeight: "bold",
              padding: 0,
              paddingHorizontal: 0,
              margin: 0,
              textDecorationLine: "underline",
              height: 32,
              color: theme.faqDescription,
            }}
            inputType="amount"
            placeholder="0"
            onChangeText={(val) => onChangeAmount(val)}
            max={99999999}
            min={minimumAmount}
          />
        </ThemedView>
        <IconButton
          iconName="plus"
          onPress={() => onPressPlus(amount, 999999999)}
          disabled={disabled?.plus}
        />
      </ThemedView>
      <ThemedView>
        <ThemedText
          style={{ fontSize: 11, textAlign: "center" }}
          themeColor="accent"
        >
          Popular Plans
        </ThemedText>
        <ThemedView
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: Spacing.one,
            marginInline: Spacing.two,
          }}
        >
          {popularPlans.map((planAmount) => (
            <PopularPlanButton
              key={planAmount}
              amount={planAmount}
              onPress={() => {
                onChangeAmount(formatAmount(planAmount));
              }}
            />
          ))}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

function calculateGrowth(
  amount: number,
  isDay: boolean,
  years = 5,
  annualRate = 15,
) {
  const r = annualRate / 100;
  const k = isDay ? 365 : 12; // 365 periods for daily, 12 for monthly

  const i = r / k;
  const n = years * k;

  // Future Value of an Annuity Due formula
  const growth = amount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);

  return parseFloat(growth.toFixed(0));
}

interface GenericGrowthViewProps {
  amount: string;
  isDay: boolean;
}

function GenericGrowthView({ amount, isDay }: GenericGrowthViewProps) {
  const theme = useTheme();
  const growth = useMemo(() => {
    return calculateGrowth(Number(amount), isDay);
  }, [amount, isDay]);

  const formattedAmount = formatAmount(Number(amount));
  const formattedGrowth = formatAmount(growth);
  return (
    <ThemedView
      type="backgroundElement"
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 16,
        gap: Spacing.two,
      }}
    >
      <ThemedView
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.background,
        }}
      >
        <FontAwesome6
          iconStyle="solid"
          name="arrow-trend-up"
          size={16}
          color={theme.iconColor}
        />
      </ThemedView>
      <ThemedText
        themeColor="text"
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 11,
          lineHeight: 16,
          fontFamily: "Mulish-Regular",
        }}
      >
        Just{" "}
        <ThemedText
          style={{
            color: theme.secondaryInk,
            fontFamily: "Mulish-SemiBold",
            fontSize: 10,
          }}
        >
          ₹{formattedAmount}
        </ThemedText>
        {` a ${isDay ? "day" : "month"} could grow to ₹`}
        <ThemedText
          style={{
            color: theme.secondaryInk,
            fontFamily: "Mulish-SemiBold",
            fontSize: 10,
          }}
        >
          {formattedGrowth}
        </ThemedText>
        {" in "}
        <ThemedText
          style={{
            color: theme.secondaryInk,
            fontFamily: "Mulish-SemiBold",
            fontSize: 10,
          }}
        >
          5 yrs
        </ThemedText>
        {" at "}
        <ThemedText
          style={{
            color: theme.secondaryInk,
            fontFamily: "Mulish-SemiBold",
            fontSize: 10,
          }}
        >
          15% p.a.
        </ThemedText>
      </ThemedText>
    </ThemedView>
  );
}

const GenericSchemeView = () => {
  const theme = useTheme();
  return (
    <ThemedView
      style={{
        borderRadius: 16,
        padding: Spacing.half,
      }}
    >
      <ThemedText themeColor="faqDescription" style={{ fontSize: 10 }}>
        SCHEME
      </ThemedText>
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: Spacing.two,
        }}
      >
        {/* Logo + name — flex:1 so the name wraps instead of overflowing */}
        <ThemedView
          style={{
            flex: 1,
            flexDirection: "row",
            gap: Spacing.two,
            alignItems: "center",
          }}
        >
          <ThemedView
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              backgroundColor: "#fff",
            }}
          >
            <Image
              source={{
                uri: "https://assets.blinkmoney.in/mobile-app/images/amc/icici_blinkmoney.png",
              }}
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
          </ThemedView>
          <ThemedText
            themeColor="faqTitle"
            style={{
              flex: 1,
              fontSize: 12,
              fontFamily: "Mulish-SemiBold",
              lineHeight: 15,
            }}
          >
            ICICI PRUDENTIAL MULTI-ASSET FUND - GROWTH
          </ThemedText>
        </ThemedView>
        {/* Learn more — flexShrink:0 keeps it always visible */}
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            flexShrink: 0,
          }}
        >
          <ThemedText type="link">Learn more</ThemedText>
          <Lucide name="chevron-right" size={14} color={theme.accent} />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

interface AllocatedFundDataProps {
  title: string;
  icon: (iconColor: ThemeColor) => React.ReactNode;
  iconBackground: string;
}

interface AllocatedFundDataWithAmount extends AllocatedFundDataProps {
  allocationPercentage: number;
}

const AllocatedFundData: Array<AllocatedFundDataWithAmount> = [
  {
    title: "Stocks",
    icon: (iconColor: ThemeColor) => (
      <Feather name="bar-chart-2" size={20} color={iconColor} />
    ),
    iconBackground: "#3a4f6a",
    allocationPercentage: 65,
  },
  {
    title: "FD",
    icon: (iconColor: ThemeColor) => (
      <Lucide name="piggy-bank" size={20} color={iconColor} />
    ),
    iconBackground: "#8b6a4e",
    allocationPercentage: 25,
  },
  {
    title: "Gold",
    icon: (iconColor: ThemeColor) => (
      <Lucide name="coins" size={20} color={iconColor} />
    ),
    iconBackground: "#c2b06f",
    allocationPercentage: 10,
  },
];

const GenericFundAllocationView = ({ amount }: { amount: string }) => {
  const theme = useTheme();
  const [allocatedFunds, setAllocatedFund] =
    useState<AllocatedFundDataWithAmount[]>(AllocatedFundData);

  const renderItem = (
    item: {
      title: string;
      icon: (iconColor: ThemeColor) => React.ReactNode;
      iconBackground: string;
      allocationPercentage: number;
    },
    index: number,
  ) => {
    return (
      <ThemedView
        style={[
          {
            flexDirection: "row",
            padding: Spacing.two,
            justifyContent: "space-between",
            alignItems: "center",
          },
          index !== 2 && {
            borderBottomWidth: 1,
            borderColor: theme.iconBorderColor,
          },
        ]}
      >
        <ThemedView
          style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
        >
          <ThemedView
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: item.iconBackground,
              alignItems: "center",
              justifyContent: "center",
              //   marginInline: Spacing.two,
            }}
          >
            {item.icon("iconColor")}
          </ThemedView>
          <ThemedView>
            <ThemedText style={{ fontSize: 12, fontFamily: "Mulish-SemiBold" }}>
              {item.title}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView>
          <ThemedText style={{ fontSize: 12, fontFamily: "Mulish-SemiBold" }}>
            ₹
            {formatAmount(
              Math.floor(
                Number(amount) * (Number(item.allocationPercentage) / 100),
              ),
            )}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  };
  return (
    // <FlatList
    //   data={AllocatedFundData}
    //   renderItem={({ item, separators, index }) => renderItem(item, index)}
    //   keyExtractor={(item) => item.title}
    //   ItemSeparatorComponent={() => <ThemedView />}
    // />
    <ThemedView style={{ marginTop: Spacing.two }}>
      <ThemedText
        themeColor="faqTitle"
        style={{ fontSize: 13, fontWeight: "bold" }}
      >
        Fund allocation details
      </ThemedText>
      <ThemedView type="backgroundElement" style={{ borderRadius: 12 }}>
        {allocatedFunds.map((item, index) => (
          <ThemedView key={index}>{renderItem(item, index)}</ThemedView>
        ))}
      </ThemedView>
      <ThemedText type="XXsmall" themeColor={"faqDescription"}>
        For informational purposes only
      </ThemedText>
    </ThemedView>
  );
};
const DAILY_PLANS = [51, 101, 501];
const MONTHLY_PLANS = [1000, 5000, 10000];

const DAILY_ADJUST_LIMIT = 50;
const MONTHLY_ADJUST_LIMIT = 500;

const DAILY_DEFAULT_VALUE = 100;
const MONTHLY_DEFAULT_VALUE = 10000;

function DailyTab({
  onAmountChange,
}: {
  onAmountChange?: (amount: string) => void;
}) {
  const amountRef = useRef<TextInput>(null);
  const [amount, setAmount] = useState<string>(String(DAILY_DEFAULT_VALUE));
  const [disabled, setDisabled] = useState({
    minus: false,
    plus: false,
  });

  const updateAmount = (val: string) => {
    setAmount(val);
    onAmountChange?.(val);
  };

  const handleMinusPress = (amount: string, minimumAmount?: number) => {
    const numericAmount = Number(amount.replace(/[^0-9]/g, ""));
    if (!amount || numericAmount === 0) {
      setDisabled({ minus: true, plus: false });
      return;
    }
    if (minimumAmount && numericAmount <= minimumAmount) {
      setDisabled({ minus: true, plus: false });
      return;
    }
    const next = numericAmount - DAILY_ADJUST_LIMIT;
    updateAmount(String(next));
    setDisabled({
      minus: minimumAmount ? next <= minimumAmount : false,
      plus: false,
    });
  };

  const handlePlusPress = (amount: string, maximumAmount = 999999999) => {
    const numericAmount = Number(amount.replace(/[^0-9]/g, ""));
    if (!amount || numericAmount === 0) {
      updateAmount(String(DAILY_ADJUST_LIMIT));
      setDisabled({ minus: false, plus: false });
      return;
    }
    if (numericAmount >= maximumAmount) {
      setDisabled({ minus: false, plus: true });
      return;
    }
    const next = numericAmount + DAILY_ADJUST_LIMIT;
    updateAmount(String(next));
    setDisabled({ minus: false, plus: next >= maximumAmount });
  };

  return (
    <ThemedView style={{}}>
      <GenericPlanView
        title="Set your daily SIP amount"
        popularPlans={DAILY_PLANS}
        amountRef={amountRef}
        amount={amount}
        onChangeAmount={(val) => {
          setAmount(val);
          onAmountChange?.(val);
        }}
        minimumAmount={20}
        onPressMinus={handleMinusPress}
        onPressPlus={handlePlusPress}
        disabled={disabled}
      />
      <GenericGrowthView amount={amount} isDay={true} />
      <GenericSchemeView />
      <GenericFundAllocationView amount={amount} />
    </ThemedView>
  );
}

/** Return ordinal suffix for a positive integer day and the full formatted string */
export function getOrdinalSuffix(n: number): string {
  const abs = Math.abs(Math.floor(n));
  const rem100 = abs % 100;
  if (rem100 >= 11 && rem100 <= 13) return "th";
  const rem10 = abs % 10;
  if (rem10 === 1) return "st";
  if (rem10 === 2) return "nd";
  if (rem10 === 3) return "rd";
  return "th";
}

/** Return the number with suffix, e.g. 1 -> "1st", 31 -> "31st" */
export function formatOrdinal(n: number): string {
  return `${n}${getOrdinalSuffix(n)}`;
}

function MonthlyTab({
  onAmountChange,
  setShowDatePicker,
  selectedDay,
}: {
  onAmountChange?: (amount: string) => void;
  setShowDatePicker?: (show: boolean) => void;
  selectedDay?: number;
}) {
  const theme = useTheme();
  const amountRef = useRef<TextInput>(null);
  const [amount, setAmount] = useState<string>(String(MONTHLY_DEFAULT_VALUE));

  const [disabled, setDisabled] = useState({
    minus: false,
    plus: false,
  });

  const updateAmount = (val: string) => {
    setAmount(val);
    onAmountChange?.(val);
  };

  const handleMinusPress = (amount: string, minimumAmount?: number) => {
    const numericAmount = Number(amount.replace(/[^0-9]/g, ""));
    if (!amount || numericAmount === 0) {
      setDisabled({ minus: true, plus: false });
      return;
    }
    if (minimumAmount && numericAmount <= minimumAmount) {
      setDisabled({ minus: true, plus: false });
      return;
    }
    const next = numericAmount - MONTHLY_ADJUST_LIMIT;
    updateAmount(String(next));
    setDisabled({
      minus: minimumAmount ? next <= minimumAmount : false,
      plus: false,
    });
  };

  const handlePlusPress = (amount: string, maximumAmount = 999999999) => {
    const numericAmount = Number(amount.replace(/[^0-9]/g, ""));
    if (!amount || numericAmount === 0) {
      updateAmount(String(MONTHLY_ADJUST_LIMIT));
      setDisabled({ minus: false, plus: false });
      return;
    }
    if (numericAmount >= maximumAmount) {
      setDisabled({ minus: false, plus: true });
      return;
    }
    const next = numericAmount + MONTHLY_ADJUST_LIMIT;
    updateAmount(String(next));
    setDisabled({ minus: false, plus: next >= maximumAmount });
  };

  return (
    <ThemedView style={{}}>
      <GenericPlanView
        title="Set your monthly SIP amount"
        popularPlans={MONTHLY_PLANS}
        amountRef={amountRef}
        amount={amount}
        onChangeAmount={(val) => {
          setAmount(val);
          onAmountChange?.(val);
        }}
        minimumAmount={100}
        onPressMinus={handleMinusPress}
        onPressPlus={handlePlusPress}
        disabled={disabled}
      />
      <GenericGrowthView amount={amount} isDay={false} />
      <Pressable
        onPress={() => {
          if (setShowDatePicker) {
            setShowDatePicker(true);
          }
        }}
      >
        <ThemedView
          type="surface"
          style={{
            borderRadius: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: Spacing.two,
            marginBlock: Spacing.three,
          }}
        >
          <ThemedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: Spacing.two,
            }}
          >
            <ThemedView
              type="backgroundElement"
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: Spacing.two,
                borderRadius: 32,
              }}
            >
              <Lucide name="calendar" size={16} color={theme.faqDescription} />
            </ThemedView>
            <ThemedText
              themeColor="faqTitle"
              type="Xsmall"
              style={{
                fontWeight: "bold",
                fontFamily: undefined,
              }}
            >
              Invest every {formatOrdinal(Number(selectedDay))} of the month
            </ThemedText>
          </ThemedView>
          <Lucide name="chevron-right" size={16} color={theme.faqDescription} />
        </ThemedView>
      </Pressable>
      <GenericSchemeView />
      <GenericFundAllocationView amount={amount} />
    </ThemedView>
  );
}

const TAB_ENUMS = {
  DAILY: "DAILY",
  MONTHLY: "MONTHLY",
};

const Tabs = {
  DAILY: DailyTab,
  MONTHLY: MonthlyTab,
};

function getInitialDayAllowNextMonth(offset = 4, base = new Date()) {
  const d = new Date(base);
  d.setDate(d.getDate() + offset);
  return d.getDate();
}

const sip = () => {
  const router = useRouter();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(TAB_ENUMS.MONTHLY);
  const [amount, setAmount] = useState(MONTHLY_DEFAULT_VALUE);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(
    getInitialDayAllowNextMonth(4),
  );

  const CurrentTab = Tabs[activeTab as keyof typeof Tabs];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setAmount(
      tab === TAB_ENUMS.DAILY ? DAILY_DEFAULT_VALUE : MONTHLY_DEFAULT_VALUE,
    );
  };

  const handleContinueWithSip = () => {
    console.log("Continue with SIP");
    router.push({
      pathname: "/wealth/details/breakup",
      params: {
        amount: amount.toString(),
        frequency: activeTab.toLowerCase(),
        day: selectedDay.toString(),
      },
    });
  };

  const handleBackPress = () => {
    router.replace("/(tabs)");
  };
  return (
    <ThemedView style={styles.container} type="background">
      <SafeAreaView style={styles.safeArea}>
        <ThemedDatePicker
          visible={showDatePicker}
          onCancel={() => setShowDatePicker(false)}
          onConfirm={(day) => {
            setSelectedDay(day);
            setShowDatePicker(false);
          }}
          initialDay={selectedDay}
          modalStyle={
            {
              // TODO:
            }
          }
        />
        <Header onBackPress={handleBackPress} />
        <ThemedScrollView
          type="background"
          style={[styles.scrollView]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Fix Carousel then use it */}
          {/* <SaveCarousel /> */}
          <ThemedView style={styles.tabContainer} type="surface">
            <Pressable
              style={{ flex: 1 }}
              onPress={() => handleTabChange(TAB_ENUMS.DAILY)}
            >
              <ThemedView
                style={[
                  styles.tabIndexContainer,
                  {
                    backgroundColor:
                      activeTab === TAB_ENUMS.DAILY
                        ? theme.background
                        : theme.transparent,
                  },
                  activeTab === TAB_ENUMS.DAILY && {
                    borderRadius: 36,
                    borderWidth: 1,
                    borderColor: theme.accent,
                  },
                ]}
              >
                <ThemedText>Daily</ThemedText>
              </ThemedView>
            </Pressable>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => handleTabChange(TAB_ENUMS.MONTHLY)}
            >
              <ThemedView
                style={[
                  styles.tabIndexContainer,
                  {
                    backgroundColor:
                      activeTab === TAB_ENUMS.MONTHLY
                        ? theme.background
                        : theme.transparent,
                  },
                  activeTab === TAB_ENUMS.MONTHLY && {
                    borderRadius: 36,
                    borderWidth: 1,
                    borderColor: theme.accent,
                  },
                ]}
              >
                <ThemedText>Monthly</ThemedText>
              </ThemedView>
            </Pressable>
          </ThemedView>
          <ThemedView style={{ marginBlock: Spacing.three }}>
            <CurrentTab
              onAmountChange={(val) =>
                setAmount(Number(val.replace(/[^0-9]/g, "")))
              }
              setShowDatePicker={setShowDatePicker}
              selectedDay={selectedDay}
            />
          </ThemedView>
        </ThemedScrollView>
        <ThemedView style={{ marginVertical: Spacing.three, gap: Spacing.two }}>
          <ThemedView
            type="infoBgColor"
            style={{
              flexDirection: "row",
              gap: 8,
              borderRadius: 24,
              alignItems: "center",
              justifyContent: "flex-start",
              padding: Spacing.three,
            }}
          >
            <Lucide name="info" size={16} color={"#1570EF"} />
            <ThemedText
              style={{
                fontSize: 11,
                color: theme.text,
                lineHeight: 14,
                flex: 1,
              }}
            >
              You can modify or pause your SIP anytime
            </ThemedText>
          </ThemedView>

          <ThemedButton
            label={`Continue with ₹${formatAmount(amount)}/${activeTab === TAB_ENUMS.DAILY ? "day" : "month"} SIP`}
            onPress={handleContinueWithSip}
          />
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default sip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset,
    maxWidth: MaxContentWidth,
  },
  scrollView: { flex: 1 },
  scrollContent: {
    gap: Spacing.three,
    paddingBottom: Spacing.three,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 36,
    padding: 2,
  },
  tabIndexContainer: {
    flex: 0.5,
    alignItems: "center",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
});
