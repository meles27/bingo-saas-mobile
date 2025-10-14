import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { SPACING_XS } from "@/theme/globals";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CardCell } from "./card-cell";

const PRIMARY_COLOR = "#7f13ec";

interface BingoCardProps {
  id: number;
  layout: number[];
  isInteractive?: boolean; // Controls if cells can be daubed and Bingo button is shown
  isSelected?: boolean; // Optional visual highlight
  onBingo?: () => void; // For interactive cards
  highlight?: boolean; // Optional, only used for non-interactive cards
}

export const BingoCard = React.memo(
  ({
    id,
    layout,
    isInteractive = true,
    isSelected = false,
    onBingo,
    highlight = false,
  }: BingoCardProps) => {
    const shouldHighlight = isInteractive ? isSelected : highlight;

    return (
      <View
        style={[styles.cardContainer, shouldHighlight && styles.selectedCard]}
      >
        <View style={styles.content}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Card #{id}</Text>
            {isInteractive && onBingo && (
              <TouchableOpacity onPress={onBingo}>
                <Badge>Bingo</Badge>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.grid}>
            {/* Bingo letters */}
            <View style={styles.row}>
              {["B", "I", "N", "G", "O"].map((letter) => (
                <Text key={letter} style={styles.headerCell}>
                  {letter}
                </Text>
              ))}
            </View>

            {/* Number cells */}
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {layout
                  .slice(rowIndex * 5, rowIndex * 5 + 5)
                  .map((num, colIndex) => (
                    <CardCell
                      key={colIndex}
                      num={num}
                      isInteractive={isInteractive}
                    />
                  ))}
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
    overflow: "hidden",
    margin: 4,
  },
  selectedCard: {
    borderColor: PRIMARY_COLOR,
    shadowColor: PRIMARY_COLOR,
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10,
  },
  content: { padding: 8 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "Space Grotesk",
  },
  grid: {
    flexDirection: "column",
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING_XS,
  },
  headerCell: {
    width: "20%", // exactly 5 columns
    textAlign: "center",
    color: PRIMARY_COLOR,
    fontWeight: "700",
    fontFamily: "Space Grotesk",
    marginBottom: 4,
  },
});
