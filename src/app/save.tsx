import { ThemedView } from "@/components/themed-view";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SaveScreen() {
  const router = useRouter();
  const [sips, setSips] = useState([
    // { id: 1, amount: 1000, frequency: "daily" },
    // { id: 2, amount: 2000, frequency: "monthly" },
    // { id: 3, amount: 5000, frequency: "monthly" },
  ]);

  useFocusEffect(
    useCallback(() => {
      if (sips.length <= 0) router.push("/wealth/sip");
      console.log(sips, "focused!");
    }, [sips]),
  );
  return (
    <ThemedView style={styles.container} type="background">
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <Footer />
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
    paddingBottom: BottomTabInset,
    maxWidth: MaxContentWidth,
  },
});
