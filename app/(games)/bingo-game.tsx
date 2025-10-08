import {
  AddCardSheet,
  BingoCardData,
  generateBingoCard,
} from "@/components/app/add-card-sheet"; // Import the main component
import { useBottomSheet } from "@/components/ui/bottom-sheet";
import { Icon } from "@/components/ui/icon";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  BORDER_RADIUS,
  SPACING_LG,
  SPACING_MD,
  SPACING_SM,
} from "@/theme/globals";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

// --- Helper Components (CalledNumbersBoard, BingoCard - Unchanged) ---
const CalledNumbersBoard = ({
  calledNumbers,
}: {
  calledNumbers: Set<number>;
}) => {
  const primaryColor = useThemeColor({}, "primary");
  const cardColor = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");
  const rows = [
    { s: 1, e: 15 },
    { s: 16, e: 30 },
    { s: 31, e: 45 },
    { s: 46, e: 60 },
    { s: 61, e: 75 },
  ];
  return (
    <View style={styles.boardContainer}>
      {rows.map((r, ri) => (
        <View key={ri} style={styles.boardRow}>
          {Array.from({ length: r.e - r.s + 1 }, (_, i) => i + r.s).map((n) => {
            const iC = calledNumbers.has(n);
            return (
              <View
                key={n}
                style={[
                  styles.boardNumber,
                  { backgroundColor: iC ? primaryColor : cardColor },
                ]}
              >
                <Text
                  style={[
                    styles.boardNumberText,
                    { color: iC ? "white" : textColor },
                  ]}
                >
                  {n}
                </Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};
const BingoCard = ({
  card,
  onDaub,
  calledNumbers,
}: {
  card: BingoCardData;
  onDaub: (cardId: string, num: number) => void;
  calledNumbers: Set<number>;
}) => {
  const cardColor = useThemeColor({}, "card");
  const primaryColor = useThemeColor({}, "primary");
  return (
    <View style={[styles.bingoCard, { backgroundColor: cardColor }]}>
      {["B", "I", "N", "G", "O"].map((l) => (
        <View key={l} style={styles.bingoHeaderCell}>
          <Text style={[styles.bingoHeaderText, { color: primaryColor }]}>
            {l}
          </Text>
        </View>
      ))}
      {card.grid.flat().map((c, i) => {
        const iC = c.number !== "F" && calledNumbers.has(c.number);
        const iF = c.number === "F";
        return (
          <TouchableOpacity
            key={i}
            style={styles.bingoCell}
            onPress={() => !iF && onDaub(card.id, c.number as number)}
            disabled={!iC && !iF}
          >
            {c.daubed && (
              <View
                style={[
                  StyleSheet.absoluteFill,
                  styles.daubOverlay,
                  { backgroundColor: primaryColor },
                ]}
              />
            )}
            <Text
              style={[
                styles.bingoCellText,
                (iC || iF) && styles.bingoCellCalled,
              ]}
            >
              {c.number}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// --- Main Screen Component ---
export default function BingoGameScreen() {
  const router = useRouter();
  // State for sheet visibility is still managed here
  const { isVisible, open, close } = useBottomSheet();
  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");

  const [calledNumbers, setCalledNumbers] = useState(
    new Set([5, 21, 33, 48, 62, 16, 70])
  );
  const [playerCards, setPlayerCards] = useState(() => [
    generateBingoCard(),
    generateBingoCard(),
  ]);

  const handleDaub = useCallback((cardId: string, num: number) => {
    setPlayerCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          const newGrid = card.grid.map((row) =>
            row.map((cell) =>
              cell.number === num ? { ...cell, daubed: !cell.daubed } : cell
            )
          );
          return { ...card, grid: newGrid };
        }
        return card;
      })
    );
  }, []);

  const handleAddCard = useCallback((newCard: BingoCardData) => {
    setPlayerCards((prev) => [...prev, newCard]);
  }, []);

  return (
    <View style={[styles.flex1, { backgroundColor }]}>
      <CalledNumbersBoard calledNumbers={calledNumbers} />

      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {playerCards.map((card) => (
          <View key={card.id} style={styles.cardWrapper}>
            <BingoCard
              card={card}
              onDaub={handleDaub}
              calledNumbers={calledNumbers}
            />
          </View>
        ))}
      </ScrollView>

      {/* The FAB now simply calls `open` to change the state */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: primaryColor }]}
        onPress={open}
      >
        <Icon name={Plus} color={primaryForegroundColor} />
        <Text style={{ color: primaryForegroundColor, fontWeight: "bold" }}>
          Add Card
        </Text>
      </TouchableOpacity>

      {/* Render the self-contained AddCardSheet component */}
      <AddCardSheet
        isVisible={isVisible}
        onClose={close}
        onAddCard={handleAddCard}
      />
    </View>
  );
}

// --- Styles (Unchanged) ---
const styles = StyleSheet.create({
  flex1: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING_SM,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: { flex: 1, textAlign: "center" },
  headerSpacer: { width: 40 },
  boardContainer: {
    paddingHorizontal: SPACING_SM,
    paddingVertical: SPACING_MD,
    backgroundColor: "rgba(0,0,0,0.1)",
    gap: 4,
  },
  boardRow: { flexDirection: "row", justifyContent: "space-between" },
  boardNumber: {
    width: (screenWidth - SPACING_SM * 2) / 15.5,
    aspectRatio: 1,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  boardNumberText: { fontWeight: "bold", fontSize: 10 },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: SPACING_MD,
    gap: SPACING_MD,
  },
  cardWrapper: { width: (screenWidth - SPACING_MD * 3) / 2 },
  bingoCard: {
    borderRadius: BORDER_RADIUS,
    padding: SPACING_SM,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bingoHeaderCell: {
    width: "20%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bingoHeaderText: { fontSize: 18, fontWeight: "900" },
  bingoCell: {
    width: "20%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bingoCellText: { fontSize: 16, fontWeight: "bold", color: "#a1a1aa" },
  bingoCellCalled: { color: "#FFFFFF" },
  daubOverlay: { borderRadius: 999, opacity: 0.6, margin: 4 },
  fab: {
    position: "absolute",
    bottom: SPACING_LG,
    right: SPACING_LG,
    height: 56,
    borderRadius: 28,
    paddingHorizontal: SPACING_LG,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING_SM,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
