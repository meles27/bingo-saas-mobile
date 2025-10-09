import { View } from "@/components/ui/view";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const PARTICLE_COUNT = 9;
const PRIMARY_COLOR = "rgba(127, 19, 236, 0.5)";

const Particle = ({ index }: { index: number }) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  const config = {
    size: Math.random() * 10 + 8,
    duration: Math.random() * 15000 + 20000,
    delay: Math.random() * -15000,
    initialX: Math.random() * screenWidth,
    targetXVariance: screenWidth * 0.2,
  };

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-screenHeight, {
        duration: config.duration,
        easing: Easing.inOut(Easing.ease),
      }),
      -1
    );
    translateX.value = withRepeat(
      withTiming(translateX.value + config.targetXVariance, {
        duration: config.duration / 2,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: config.size,
          height: config.size,
          left: config.initialX,
          backgroundColor: PRIMARY_COLOR,
        },
        animatedStyle,
      ]}
    />
  );
};

export const ParticleBackground = () => {
  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
        <Particle key={index} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  particle: {
    position: "absolute",
    bottom: -20,
    borderRadius: 999,
  },
});
