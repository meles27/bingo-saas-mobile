import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const PRIMARY_COLOR = "#7f13ec";

interface BingoCardProps {
  id: number;
  numbers: (number | string)[][];
  calledNumbers: number[];
  isWinner?: boolean;
}

export const BingoCard = ({
  id,
  numbers,
  calledNumbers,
  isWinner = false,
}: BingoCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <BlurView intensity={25} tint="dark" style={styles.blurView} />
      <View style={styles.content}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Card #{id}</Text>
          <TouchableOpacity>
            <Badge
              variant={isWinner ? "default" : "secondary"}
              textStyle={{ fontSize: 12, fontWeight: "600" }}
            >
              Bingo
            </Badge>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {["B", "I", "N", "G", "O"].map((letter) => (
            <Text key={letter} style={styles.headerCell}>
              {letter}
            </Text>
          ))}
          {numbers.flat().map((num, index) => {
            const isFree = num === "FREE";
            const isCalled = isFree || calledNumbers.includes(num as number);
            return (
              <View
                key={index}
                style={[
                  styles.cell,
                  isCalled ? styles.calledCell : styles.defaultCell,
                  isCalled && isWinner
                    ? {
                        shadowColor: PRIMARY_COLOR,
                        shadowRadius: 8,
                        shadowOpacity: 1,
                      }
                    : {},
                ]}
              >
                <Text style={[styles.cellText, isFree && { fontSize: 10 }]}>
                  {num}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    // overflow: "hidden",
    marginBottom: 12,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 12,
  },
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
    gap: 4,
  },
  headerCell: {
    width: "18%", // Adjusted for gap
    textAlign: "center",
    color: PRIMARY_COLOR,
    fontWeight: "700",
    fontFamily: "Space Grotesk",
  },
  cell: {
    width: "18%", // Adjusted for gap
    aspectRatio: 1,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultCell: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  calledCell: {
    backgroundColor: PRIMARY_COLOR,
  },
  cellText: {
    fontWeight: "700",
    fontSize: 12,
    fontFamily: "Space Grotesk",
  },
  bingoButton: {
    marginTop: 12,
    height: 40,
    shadowColor: PRIMARY_COLOR,
    shadowRadius: 10,
    shadowOpacity: 0.8,
  },
  disabledButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    shadowOpacity: 0,
  },
});
