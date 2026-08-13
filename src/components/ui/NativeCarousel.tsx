import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { AppCarousel } from "./AppCarousel";

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
    image: "https://picsum.photos/seed/blink1/800/400",
    headline: "Grow Your Savings",
    subheading: "Earn up to 14% returns with automated SIPs",
  },
  {
    id: "2",
    image: "https://picsum.photos/seed/blink2/800/400",
    headline: "Borrow Smarter",
    subheading: "Instant loans against your portfolio at 9.99% p.a.",
  },
  {
    id: "3",
    image: "https://picsum.photos/seed/blink3/800/400",
    headline: "Hands-Off Investing",
    subheading: "We handle research, allocation, and rebalancing",
  },
  {
    id: "4",
    image: "https://picsum.photos/seed/blink4/800/400",
    headline: "Start With ₹21",
    subheading: "Low minimums so everyone can invest",
  },
  {
    id: "5",
    image: "https://picsum.photos/seed/blink5/800/400",
    headline: "Fully Digital",
    subheading: "Set up and manage everything from your phone",
  },
];

// ─── Dimensions ───────────────────────────────────────────────────────────────

const SCREEN_WIDTH = Dimensions.get("window").width;
// Card width matches the cardWidthOffset prop passed to AppCarousel below
const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = 200;

// ─── Render Item ──────────────────────────────────────────────────────────────

// Defined outside the component so its reference is stable (no useCallback needed)
function renderSlide(item: SlideItem): React.ReactElement {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      {/* Overlay sits on top of the image for text legibility */}
      <View style={[StyleSheet.absoluteFill, styles.cardOverlay]}>
        <ThemedText style={styles.headline}>{item.headline}</ThemedText>
        <ThemedText style={styles.subheading}>{item.subheading}</ThemedText>
      </View>
    </View>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImageCarousel() {
  return (
    <AppCarousel<SlideItem>
      data={SLIDES}
      renderItem={renderSlide}
      height={CARD_HEIGHT}
      cardWidthOffset={48}
      autoplay
      autoplayInterval={3500}
      loop
      // Brand colors — swap these per screen without touching AppCarousel internals
      dotActiveColor="#3A5C42"
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
    shadowColor: "#000",
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
    backgroundColor: "rgba(0,0,0,0.35)",
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
