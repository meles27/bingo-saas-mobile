import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

export function useBottomTabOverflow() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return Platform.OS === "ios" ? useBottomTabBarHeight() : 0;
}
