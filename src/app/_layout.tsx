import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import {
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_800ExtraBold,
} from "@expo-google-fonts/mulish";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

import { store } from "@/store";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    "Mulish-Regular": Mulish_400Regular,
    "Mulish-Medium": Mulish_500Medium,
    "Mulish-SemiBold": Mulish_600SemiBold,
    "Mulish-Bold": Mulish_700Bold,
    "Mulish-ExtraBold": Mulish_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
