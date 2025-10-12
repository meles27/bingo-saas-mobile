import { View } from "@/components/ui/view";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const PRIMARY_COLOR = "#7f13ec";

export const LiveIndicator = () => {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    const animationConfig = { duration: 1000, easing: Easing.out(Easing.ease) };
    opacity.value = withRepeat(withTiming(0, animationConfig), -1);
    scale.value = withRepeat(withTiming(2, animationConfig), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ping, animatedStyle]} />
      <View style={styles.dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ping: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 999,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 999,
  },
});
