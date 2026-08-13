import { useTheme } from "@/hooks/use-theme";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import SimpleLineIcons from "@react-native-vector-icons/simple-line-icons";
import { StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

const Footer = () => {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>
        Designed to help your savings grow regularly
      </ThemedText>

      <ThemedView style={styles.registration}>
        <ThemedText themeColor="textSecondary" style={styles.detail}>
          AMFI registered Mutual Fund Distributor
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.detail}>
          Capline ventures private limited ARN: 330047
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.certification}>
        <SimpleLineIcons name="globe" size={16} color={theme.iconColor} />
        <ThemedText themeColor="textSecondary" style={styles.detail}>
          Certified to ISO/IEC 27001:2022
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.madeInIndia}>
        <ThemedText style={styles.country}>🇮🇳 Made in India</ThemedText>
        <FontAwesome6
          name="heart"
          size={16}
          color={"#EF4445"}
          iconStyle="solid"
        />
      </ThemedView>
    </ThemedView>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "600",
  },
  registration: {
    alignItems: "center",
    gap: 4,
  },
  certification: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  detail: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 11,
  },
  madeInIndia: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  country: {
    fontSize: 11,
    lineHeight: 11,
    fontWeight: "500",
  },
});
