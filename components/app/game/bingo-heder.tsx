import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useSidebar } from "@/hooks/base/use-sidebar";
import { SPACING_SM } from "@/theme/globals";
import { BlurView } from "expo-blur";
import { Menu } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { LiveIndicator } from "./live-indicator";

const PRIMARY_COLOR = "#7f13ec";

export const BingoHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <View style={styles.stickyHeader}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.container}>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.infoLabel}>Prize:</Text>
            <Text style={[styles.infoValue, { color: PRIMARY_COLOR }]}>
              $1,500
            </Text>
          </View>
          <View style={styles.liveContainer}>
            <LiveIndicator />
            <Text style={{ color: PRIMARY_COLOR }}>Live</Text>
          </View>
          <View>
            <Text style={styles.infoLabel}>Game Code:</Text>
            <Text style={[styles.infoValue, { color: PRIMARY_COLOR }]}>
              A4B2K
            </Text>
          </View>
          <Button size="icon" onPress={toggleSidebar} style={styles.menuButton}>
            <Icon name={Menu} color="white" size={24} />
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stickyHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: SPACING_SM,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Space Grotesk",
  },
  menuButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontFamily: "Space Grotesk",
  },
  infoValue: {
    fontWeight: "700",
    fontFamily: "Space Grotesk",
  },
  liveContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
