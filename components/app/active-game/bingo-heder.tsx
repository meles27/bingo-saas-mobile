import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useSidebar } from "@/hooks/base/use-sidebar";
import { useAuthStore } from "@/store/auth-store";
import { useGameStore } from "@/store/game-store";
import { SPACING_SM } from "@/theme/globals";
import { formatPrice } from "@/utils/format-price";
import { BlurView } from "expo-blur";
import { Menu } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { LiveIndicator } from "./live-indicator";

const PRIMARY_COLOR = "#7f13ec";

/**
 * A sticky header component that displays real-time information about the active bingo game.
 * It receives all its data and actions via props.
 *
 * @param {BingoHeaderProps} props - The component props.
 */
export const BingoHeader = () => {
  const { toggleSidebar } = useSidebar();
  const access = useAuthStore((state) => state.token?.access);

  const activeGame = useGameStore((state) => state.activeGame);

  // --- 2. Gracefully handle the case where there is no active game ---
  if (!activeGame) {
    // You can return null to render nothing, or return a placeholder skeleton view.
    // Returning null is often the cleanest approach.
    return null;
  }

  // Helper to format the prize with a currency symbol if needed (adjust as necessary)
  const formattedPrize = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activeGame?.game.currency || "USD",
  }).format(parseFloat(activeGame?.game.prize));

  return (
    <View style={styles.stickyHeader}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.container}>
        <View style={styles.bottomRow}>
          {/* --- 3. Use dynamic data from the 'activeGame' prop --- */}
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Prize:</Text>
            <Text style={[styles.infoValue, { color: PRIMARY_COLOR }]}>
              {formatPrice(activeGame?.game?.prize || 0)}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Game Code:</Text>
            <Text style={[styles.infoValue, { color: PRIMARY_COLOR }]}>
              #{activeGame?.game.serial}
            </Text>
          </View>

          <View style={styles.liveContainer}>
            <LiveIndicator />
            <Text style={{ color: PRIMARY_COLOR }}>Live</Text>
          </View>

          {/* --- 4. Use the handler function from props --- */}
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
  infoColumn: {
    // Added for better alignment if text wraps
    alignItems: "flex-start",
  },
  infoLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontFamily: "Space Grotesk",
  },
  infoValue: {
    fontWeight: "700",
    fontSize: 14, // Slightly larger for emphasis
    fontFamily: "Space Grotesk",
  },
  liveContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // Position it absolutely to ensure it's always centered regardless of text length
    // position: "absolute",
    // left: "50%",
    transform: [{ translateX: -40 }], // Adjust this value to perfectly center your content
  },
});
