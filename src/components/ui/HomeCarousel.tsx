import { Colors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { AppCarousel } from "./AppCarousel";

const SlideImage = [
  require("../../../assets/images/home-page-banner-no-sip-1.png"),
  require("../../../assets/images/home-page-banner-no-sip-2.png"),
  require("../../../assets/images/home-page-banner-no-sip-3.png"),
  require("../../../assets/images/home-page-banner-no-sip-4.png"),
  require("../../../assets/images/home-page-banner-no-sip-5.png"),
];
// ─── Types ────────────────────────────────────────────────────────────────────

interface SlideItem {
  id: string;
  image: string;
  headline: string;
  subheading: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SLIDES: SlideItem[] = [
  {
    id: "1",
    image: SlideImage[0],
    headline: "",
    subheading: "",
  },
  {
    id: "2",
    image: SlideImage[1],
    headline: "",
    subheading: "",
  },
  {
    id: "3",
    image: SlideImage[2],
    headline: "",
    subheading: "",
  },
  {
    id: "4",
    image: SlideImage[3],
    headline: "",
    subheading: "",
  },
  {
    id: "5",
    image: SlideImage[4],
    headline: "",
    subheading: "",
  },
];

// ─── Dimensions ───────────────────────────────────────────────────────────────

const SCREEN_WIDTH = Dimensions.get("window").width;
// Card width matches the cardWidthOffset prop passed to AppCarousel below
const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = 200;

// ─── Render Item ──────────────────────────────────────────────────────────────
const getImageSource = (image: string | number) => {
  if (typeof image === "string") {
    return { uri: image };
  }
  return image;
};
// Defined outside the component so its reference is stable (no useCallback needed)
type Theme = typeof Colors.light | typeof Colors.dark;

function renderSlide(item: SlideItem, theme: Theme): React.ReactElement {
  return (
    <View
      style={[
        styles.card,
        {
          shadowColor: theme.shadowColor,
        },
      ]}
    >
      <Image source={getImageSource(item.image)} style={styles.cardImage} />
      {/* Overlay sits on top of the image for text legibility */}
      <View style={[StyleSheet.absoluteFill, styles.cardOverlay]}>
        <ThemedText style={styles.headline}>{item.headline}</ThemedText>
        <ThemedText style={styles.subheading}>{item.subheading}</ThemedText>
      </View>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomeCarousel() {
  const theme = useTheme();

  return (
    <AppCarousel<SlideItem>
      data={SLIDES}
      renderItem={(item) => renderSlide(item, theme)}
      height={CARD_HEIGHT}
      cardWidthOffset={48}
      autoplay
      autoplayInterval={3500}
      loop
      // Brand colors — swap these per screen without touching AppCarousel internals
      dotActiveColor="#5fc477"
      dotInactiveColor="#3A5C42"
    />
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardOverlay: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    justifyContent: "flex-end",
    padding: 16,
  },
  headline: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    lineHeight: 24,
  },
  subheading: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
    marginTop: 2,
  },
});
