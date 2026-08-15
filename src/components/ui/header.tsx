import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import type { ComponentProps } from "react";
import { Alert, Linking, Pressable, StyleSheet } from "react-native";

import { useTheme } from "@/hooks/use-theme";
import { useAppSelector } from "@/store/hooks";
import Lucide from "@react-native-vector-icons/lucide";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

const Header = ({
  name,
  greeting = "Hello",
  subtitle = "Welcome!",
  onHelpPress = undefined,
  showHelp = true,
  avatarIcon = "user",
  onBackPress,
}: {
  name?: string;
  greeting?: string;
  subtitle?: string;
  onHelpPress?: () => void;
  showHelp?: boolean;
  avatarIcon?: ComponentProps<typeof Lucide>["name"];
  onBackPress?: () => void;
}) => {
  const theme = useTheme();
  const userName = useAppSelector((state) => state.user.currentUser.name);
  const helpColor = theme.primaryInk;

  const openWhatsApp = async () => {
    // 1. Define target contact and message variables
    const phoneNumber = "919004311470"; // Target number with country code
    const message = "Hi BlinkMoney Support!\nI need help"; // Your custom text message

    // 2. Define both the deep-link URL and your explicit web fallback URL
    const nativeUrl = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`;
    const webFallbackUrl = `https://whatsapp.com{phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

    try {
      // 3. Test if the native WhatsApp app protocol is supported on this device
      const isNativeSupported = await Linking.canOpenURL(nativeUrl);

      if (isNativeSupported) {
        // Launch directly inside the native app client
        await Linking.openURL(nativeUrl);
      } else {
        // 4. Fallback execution: Try to launch via the browser API link
        const isWebSupported = await Linking.canOpenURL(webFallbackUrl);

        if (isWebSupported) {
          await Linking.openURL(webFallbackUrl);
        } else {
          Alert.alert(
            "Error",
            "Your device is unable to open web or app links.",
          );
        }
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "An unexpected error occurred while trying to open WhatsApp.",
      );
      console.error(error);
    }
  };

  const handleHelpPress = onHelpPress ?? (() => openWhatsApp());

  const renderBackButton = () => {
    return (
      <Pressable onPress={onBackPress}>
        <ThemedView
          type="surface"
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lucide name="chevron-left" size={18} color={theme.iconColor} />
        </ThemedView>
      </Pressable>
    );
  };
  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {onBackPress ? (
        renderBackButton()
      ) : (
        <ThemedView style={styles.identity}>
          <ThemedView
            style={[styles.avatar, { backgroundColor: theme.accent }]}
          >
            <ThemedView
              style={[styles.avatarInner, { borderColor: helpColor }]}
            >
              <Lucide name={avatarIcon} size={18} color={helpColor} />
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.copy}>
            <ThemedText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[styles.greeting, { color: theme.text }]}
            >
              {greeting} {name ?? userName}
            </ThemedText>
            <ThemedText
              style={[styles.subtitle, { color: theme.textSecondary }]}
            >
              {subtitle}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      )}

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
          <ThemedText style={[styles.helpLabel, { color: helpColor }]}>
            Help
          </ThemedText>
        </Pressable>
      )}
    </ThemedView>
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
    borderWidth: 1,
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
