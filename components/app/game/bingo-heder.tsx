import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGameStore } from "@/store/game-store";
import { SPACING_SM } from "@/theme/globals";
import { formatPrice } from "@/utils/format-price";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";
import { GameIndicator } from "./game-indicator";

const PRIMARY_COLOR = "#7f13ec";

/**
 * A sticky header component that displays real-time information about the active bingo game.
 * It receives all its data and actions via props.
 *
 * @param {BingoHeaderProps} props - The component props.
 */
export const BingoHeader = () => {
  const activeGame = useGameStore((state) => state.activeGame);

  return (
    <View style={styles.stickyHeader}>
      <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.container}>
        <View style={styles.bottomRow}>
          {/* --- 3. Use dynamic data from the 'activeGame' prop --- */}
          <View>
            <View style={[styles.infoColumn, { flexDirection: "row" }]}>
              <Text style={styles.infoLabel}>Prize: </Text>
              <Text style={[styles.infoValue, { color: PRIMARY_COLOR }]}>
                {formatPrice(activeGame?.prize || 0)}
              </Text>
            </View>

            <View style={[styles.infoColumn, { flexDirection: "row" }]}>
              <Text style={styles.infoLabel}>Status: </Text>
              <Text style={[styles.infoValue, { color: PRIMARY_COLOR }]}>
                <GameIndicator status={activeGame?.status || "in_progress"} />
              </Text>
            </View>
          </View>

          <View style={styles.lastNumberContainer}>
            <View style={styles.lastNumberBadge}>
              <Text style={styles.lastNumberText}>
                {activeGame?.lastNumberCalled || "--"}
              </Text>
            </View>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Game Code:</Text>
            <Text style={[styles.infoValue, { color: PRIMARY_COLOR }]}>
              #{activeGame?.serial}
            </Text>
          </View>

          {/* --- 4. Use the handler function from props --- */}
          {/* <Button size="icon" onPress={toggleSidebar} style={styles.menuButton}>
            <Icon name={Menu} color="white" size={24} />
          </Button> */}
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
    // position: "absolute",
    // left: "50%",
    transform: [{ translateX: -40 }], // Adjust this value to perfectly center your content
  },

  lastNumberContainer: {
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  lastNumberBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
    borderRadius: 50,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 6,
  },

  lastNumberText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Space Grotesk",
  },
});
