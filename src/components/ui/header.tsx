import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import SimpleLineIconsLib, {
  SimpleLineIcons,
} from "@react-native-vector-icons/simple-line-icons";
import type { ComponentProps } from "react";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useTheme } from "@/hooks/use-theme";

const Header = ({
  name = "VISHNUVARDHAN",
  greeting = "Hello",
  subtitle = "Welcome!",
  onHelpPress = undefined,
  showHelp = true,
  avatarIcon = "user",
}: {
  name?: string;
  greeting?: string;
  subtitle?: string;
  onHelpPress?: () => void;
  showHelp?: boolean;
  avatarIcon?: ComponentProps<typeof SimpleLineIconsLib>["name"];
}) => {
  const theme = useTheme();
  const helpColor = theme.primaryInk;

  const openWhatsApp = async () => {
    // The exact target WhatsApp API link
    const url =
      "https://api.whatsapp.com/send/?phone=919004311470&text=Hi%20BlinkMoney%20Support!%0AI%20need%20help&type=phone_number&app_absent=0";

    try {
      // 1. Verify if the device is capable of handling the URL schema
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // 2. Fire the deep-link redirection
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "WhatsApp is not installed on this device");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while trying to open WhatsApp");
    }
  };

  const handleHelpPress = onHelpPress ?? (() => openWhatsApp());

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.identity}>
        <View style={[styles.avatar, { backgroundColor: theme.accent }]}>
          <View style={[styles.avatarInner, { borderColor: helpColor }]}>
            <SimpleLineIcons name={avatarIcon} size={18} color={helpColor} />
          </View>
        </View>
        <View style={styles.copy}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.greeting, { color: theme.text }]}
          >
            {greeting} {name}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        </View>
      </View>

      {showHelp && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Contact WhatsApp help"
          onPress={handleHelpPress}
          style={({ pressed }) => [
            styles.helpButton,
            { backgroundColor: theme.accent, opacity: pressed ? 0.78 : 1 },
          ]}
        >
          <FontAwesome6
            iconStyle="brand"
            name="whatsapp"
            size={18}
            color={helpColor}
          />
          <Text style={[styles.helpLabel, { color: helpColor }]}>Help</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 54,
    paddingHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  identity: {
    minWidth: 0,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  avatarInner: {
    width: 35,
    height: 35,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  copy: { minWidth: 0, flexShrink: 1 },
  greeting: {
    fontFamily: "Mulish-Medium",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
  },
  subtitle: {
    fontFamily: "Mulish-Regular",
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "400",
  },
  helpButton: {
    width: 83,
    height: 37,
    borderRadius: 19,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginLeft: 16,
  },
  helpLabel: {
    fontFamily: "Mulish-Bold",
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "700",
  },
});
