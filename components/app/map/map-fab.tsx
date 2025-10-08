import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";

export const MapFab = () => {
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");
  const router = useRouter();
  return (
    <View style={styles.fabContainer}>
      <Button
        size="icon"
        style={styles.fab}
        onPress={() => {
          router.push("/chat");
        }}
      >
        <Icon name={MapPin} size={28} color={primaryForegroundColor} />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    bottom: 96,
    right: 16,
    zIndex: 20,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
