import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGameStore } from "@/store/game-store";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const PRIMARY_COLOR = "#7f13ec";

type CardStatus = "open" | "disqualified";

interface BingoCardProps {
  id: number;
  layout: number[]; // flat array of 25 numbers
  isWinner?: boolean;
  disabled?: boolean;
  shade?: boolean;
  status?: CardStatus;
  onBingo?: () => void;
}

export const BingoCard = ({
  id,
  layout,
  isWinner = false,
  disabled = false,
  shade = true,
  status = "open",
  onBingo,
}: BingoCardProps) => {
  /* --------------------------- GAME STORE --------------------------- */
  const toggleSelectedNumber = useGameStore(
    (state) => state.toggleSelectedNumber
  );
  const selectedNumbers = useGameStore((state) => state.selectedNumbers);

  return (
    <View style={styles.cardContainer}>
      <BlurView intensity={25} tint="dark" style={styles.blurView} />
      <View style={styles.content}>
        {/* --------------------------- HEADER --------------------------- */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Card #{id}</Text>
          <TouchableOpacity
            onPress={onBingo}
            disabled={disabled || status === "disqualified"}
          >
            <Badge
              variant={isWinner ? "default" : "secondary"}
              textStyle={{ fontSize: 12, fontWeight: "600" }}
            >
              Bingo
            </Badge>
          </TouchableOpacity>
        </View>

        {/* --------------------------- GRID --------------------------- */}
        <View style={styles.grid}>
          {["B", "I", "N", "G", "O"].map((letter) => (
            <Text key={letter} style={styles.headerCell}>
              {letter}
            </Text>
          ))}

          {layout.flat().map((num, index) => {
            const isFree = num === -1;
            const numValue = Number(num) ?? -1;
            const isSelected = shade
              ? selectedNumbers.includes(numValue)
              : false;
            const isCellDisabled =
              disabled || status === "disqualified" || num === -1;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.cell,
                  isSelected ? styles.selectedCell : styles.defaultCell,
                  isWinner && isSelected
                    ? {
                        shadowColor: PRIMARY_COLOR,
                        shadowRadius: 8,
                        shadowOpacity: 1,
                      }
                    : {},
                  isCellDisabled ? { opacity: 0.6 } : {},
                ]}
                disabled={isCellDisabled}
                onPress={() => toggleSelectedNumber(numValue)}
              >
                <Text
                  style={[
                    styles.cellText,
                    isFree && { fontSize: num != -1 ? 14 : 10 },
                  ]}
                >
                  {num > 0 ? num : "FREE"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

/* --------------------------- STYLES --------------------------- */
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 12,
    fontFamily: "Space Grotesk",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  headerCell: {
    width: "18%",
    textAlign: "center",
    color: PRIMARY_COLOR,
    fontWeight: "700",
    fontFamily: "Space Grotesk",
  },
  cell: {
    width: "18%",
    aspectRatio: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultCell: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  selectedCell: {
    backgroundColor: "#1abc9c",
  },
  cellText: {
    fontWeight: "700",
    fontSize: 12,
    fontFamily: "Space Grotesk",
  },
});
