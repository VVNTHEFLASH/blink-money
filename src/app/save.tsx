import { ThemedView } from "@/components/themed-view";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SaveScreen() {
  const router = useRouter();
  useEffect(() => {
    router.push("/wealth/sip");
  }, []);
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
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
});
