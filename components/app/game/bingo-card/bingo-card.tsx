import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CardCell } from "./card-cell";

const PRIMARY_COLOR = "#7f13ec";

interface BingoCardProps {
  id: number;
  layout: number[];
  isInteractive?: boolean; // Controls if cells are daubable and Bingo button is shown
  isSelected?: boolean; // For the selection UI state
  onPress?: () => void; // For the selection action
  onBingo?: () => void; // For the in-game action
}

export const BingoCard = React.memo(
  ({
    id,
    layout,
    isInteractive = true,
    isSelected = false,
    onPress,
    onBingo,
  }: BingoCardProps) => {
    return (
      <View style={[styles.cardContainer, isSelected && styles.selectedCard]}>
        <BlurView intensity={25} tint="dark" style={styles.blurView} />
        <View style={styles.content}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Card #{id}</Text>
            {isInteractive && (
              <TouchableOpacity onPress={onBingo}>
                <Badge>Bingo</Badge>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.grid}>
            {["B", "I", "N", "G", "O"].map((letter) => (
              <Text key={letter} style={styles.headerCell}>
                {letter}
              </Text>
            ))}
            {layout.map((num, index) => (
              <CardCell key={index} num={num} isInteractive={isInteractive} />
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
  blurView: { ...StyleSheet.absoluteFillObject },
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 2,
  },
  headerCell: {
    width: "18.4%",
    textAlign: "center",
    color: PRIMARY_COLOR,
    fontWeight: "700",
    fontFamily: "Space Grotesk",
    marginBottom: 4,
  },
});
