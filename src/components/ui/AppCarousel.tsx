import React, { useCallback, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Carousel,
  type CarouselRef,
  type CarouselRenderItemInfo,
} from "react-native-reanimated-carousel";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// ─── Constants ────────────────────────────────────────────────────────────────

const SCREEN_WIDTH = Dimensions.get("window").width;

// ─── Props API ────────────────────────────────────────────────────────────────

export interface AppCarouselProps<T> {
  /** The generic data array — any shape is accepted */
  data: T[];
  /** Render callback; receives the typed item and its index */
  renderItem: (item: T, index: number) => React.ReactElement;
  /** Slider height in px (default: 200) */
  height?: number;
  /** Amount subtracted from screen width so adjacent cards peek (default: 48) */
  cardWidthOffset?: number;
  /** Enable auto-rotation (default: true) */
  autoplay?: boolean;
  /** Auto-play interval in ms (default: 3500) */
  autoplayInterval?: number;
  /** Enable infinite loop (default: true) */
  loop?: boolean;
  /** Active pagination dot color (default: "#3A5C42") */
  dotActiveColor?: string;
  /** Inactive pagination dot color (default: "#3A5C42") */
  dotInactiveColor?: string;
}

// ─── PaginationDot ────────────────────────────────────────────────────────────

interface PaginationDotProps {
  index: number;
  /** Fractional scroll position shared value — updated every frame */
  progressValue: SharedValue<number>;
  activeColor: string;
  inactiveColor: string;
}

function PaginationDot({
  index,
  progressValue,
  activeColor,
  inactiveColor,
}: PaginationDotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    // Distance of this dot from the current fractional scroll position
    // e.g. progressValue=1.5 means halfway between item 1 and 2
    const distance = Math.abs(progressValue.value - index);

    // Active dot (distance=0) → 20px wide; inactive (distance≥1) → 8px
    const width = interpolate(distance, [0, 1], [20, 8], "clamp");
    // Active dot fully opaque; inactive dimmed to 40%
    const opacity = interpolate(distance, [0, 1], [1, 0.4], "clamp");
    // Interpolate between active and inactive color based on distance
    // We achieve this by rendering two overlapping dots and cross-fading opacity
    const activeOpacity = interpolate(distance, [0, 1], [1, 0], "clamp");

    return { width, opacity, backgroundColor: distance < 0.5 ? activeColor : inactiveColor, activeOpacity };
  });

  return <Animated.View style={[styles.dot, animatedStyle]} />;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface PaginationProps {
  progressValue: SharedValue<number>;
  count: number;
  activeColor: string;
  inactiveColor: string;
}

function Pagination({
  progressValue,
  count,
  activeColor,
  inactiveColor,
}: PaginationProps) {
  return (
    <View style={styles.pagination}>
      {Array.from({ length: count }).map((_, i) => (
        <PaginationDot
          key={i}
          index={i}
          progressValue={progressValue}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
        />
      ))}
    </View>
  );
}

// ─── AppCarousel ──────────────────────────────────────────────────────────────

export function AppCarousel<T>({
  data,
  renderItem,
  height = 200,
  cardWidthOffset = 48,
  autoplay = true,
  autoplayInterval = 3500,
  loop = true,
  dotActiveColor = "#3A5C42",
  dotInactiveColor = "#3A5C42",
}: AppCarouselProps<T>) {
  const carouselRef = useRef<CarouselRef>(null);

  // Shared value updated on every scroll frame via onProgressChange
  // Fractional index: 0.0 = item 0, 1.5 = halfway between item 1 and 2
  const progressValue = useSharedValue(0);

  // Card width derived from screen width minus the peek offset
  const cardWidth = SCREEN_WIDTH - cardWidthOffset;

  // Wrap the consumer's renderItem into the internal CarouselRenderItemInfo shape
  // This prevents leaking react-native-reanimated-carousel internals to consumers
  const internalRenderItem = useCallback(
    ({ item, index }: CarouselRenderItemInfo<T>) => renderItem(item, index),
    [renderItem]
  );

  return (
    // GestureHandlerRootView prevents gesture conflicts on Android
    <GestureHandlerRootView>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={internalRenderItem}
        // itemSize drives the slot width used for parallax offset calculations
        itemSize={cardWidth}
        loop={loop}
        autoplay={autoplay}
        autoplayInterval={autoplayInterval}
        layout={{
          type: "parallax",
          // Neighboring cards scale down so the active card feels elevated
          adjacentScale: 0.85,
          // Pulls neighboring cards partially into view from the edges
          offset: 50,
        }}
        onProgressChange={(progress: number) => {
          progressValue.value = progress;
        }}
        style={{ width: SCREEN_WIDTH, height }}
      />
      <Pagination
        progressValue={progressValue}
        count={data.length}
        activeColor={dotActiveColor}
        inactiveColor={dotInactiveColor}
      />
    </GestureHandlerRootView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
