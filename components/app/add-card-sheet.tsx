import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { SPACING_MD, SPACING_SM } from "@/theme/globals";
import { RefreshCw, X } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

type Value = number | string;

// --- Types and Helpers (Unchanged) ---
export type BingoCardData = {
  id: string;
  grid: { number: Value; daubed: boolean }[][];
};

export const generateBingoCard = (): BingoCardData => {
  const generateColumn = (s: number, e: number) => {
    const a = new Set<number>();
    while (a.size < 5) a.add(Math.floor(Math.random() * (e - s + 1)) + s);
    return Array.from(a);
  };
  const b = generateColumn(1, 15),
    i = generateColumn(16, 30),
    n = generateColumn(31, 45),
    g = generateColumn(46, 60),
    o = generateColumn(61, 75);
  const grid = Array(5)
    .fill(null)
    .map((_, r) =>
      [{ n: b[r] }, { n: i[r] }, { n: n[r] }, { n: g[r] }, { n: o[r] }].map(
        (c) => ({ number: c.n, daubed: false })
      )
    );
  grid[2][2] = { number: "F", daubed: true };
  return { id: `card_${Date.now()}_${Math.random()}`, grid };
};

// --- Helper Component (Unchanged) ---
const CardPreview = ({
  card,
  onSelect,
}: {
  card: BingoCardData;
  onSelect: () => void;
}) => {
  const cardColor = useThemeColor({}, "card");
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");
  return (
    <View style={[styles.previewCard, { backgroundColor: cardColor }]}>
      <View style={styles.previewGrid}>
        {["B", "I", "N", "G", "O"].map((l) => (
          <View key={l} style={styles.previewHeaderCell}>
            <Text style={[styles.previewHeaderText, { color: primaryColor }]}>
              {l}
            </Text>
          </View>
        ))}
        {card.grid.flat().map((c, i) => (
          <View key={i} style={styles.previewCell}>
            <Text style={[styles.previewCellText, { color: textColor }]}>
              {c.number}
            </Text>
          </View>
        ))}
      </View>
      <Button size="sm" onPress={onSelect} style={styles.previewSelectButton}>
        Select
      </Button>
    </View>
  );
};

// --- Props Interface (Unchanged) ---
interface AddCardSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onAddCard: (card: BingoCardData) => void;
}

// --- Main Sheet Component ---
export function AddCardSheet({
  isVisible,
  onClose,
  onAddCard,
}: AddCardSheetProps) {
  const [previewCards, setPreviewCards] = useState(() =>
    Array(0).fill(null).map(generateBingoCard)
  );
  const borderColor = useThemeColor({}, "border");

  const refreshPreviews = useCallback(() => {
    setPreviewCards(Array(4).fill(null).map(generateBingoCard));
  }, []);

  const handleSelectCard = (card: BingoCardData) => {
    onAddCard(card);
    onClose();
  };

  const renderCardItem = ({ item }: { item: BingoCardData }) => (
    <View style={styles.cardWrapper}>
      <CardPreview card={item} onSelect={() => handleSelectCard(item)} />
    </View>
  );

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose} snapPoints={[0.95]}>
      {/* <View
        style={[
          styles.sheetContainer,
          {
            position: "sticky",
            top: 0,
          },
        ]}
      > */}
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <Text variant="title" style={styles.headerTitle}>
          Choose a New Card
        </Text>
        <Button size="icon" variant="ghost" onPress={onClose}>
          <Icon name={X} />
        </Button>
      </View>

      {/* Content - Now a FlatList */}
      <FlatList
        data={previewCards}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
      />

      {/* Footer */}
      <View style={[styles.footer, { borderTopColor: borderColor }]}>
        <Button variant="outline" onPress={refreshPreviews} icon={RefreshCw}>
          Get New Cards
        </Button>
      </View>
      {/* </View> */}
    </BottomSheet>
  );
}

// --- Styles (UPDATED for FlatList) ---
const cardWidth = (screenWidth - SPACING_MD * 3) / 2;

const styles = StyleSheet.create({
  sheetContainer: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING_SM,
    borderBottomWidth: 1,
  },
  headerTitle: { flex: 1, textAlign: "center", marginLeft: 40 },
  listContainer: {
    // Style for the FlatList's content
    padding: SPACING_MD,
    gap: SPACING_MD,
  },
  columnWrapper: {
    // Style for each row in the FlatList
    justifyContent: "space-between",
  },
  cardWrapper: {
    // Style for each item wrapper
    width: cardWidth,
  },
  previewCard: {
    borderRadius: SPACING_SM,
    padding: SPACING_SM,
    gap: SPACING_SM,
  },
  previewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  previewHeaderCell: {
    width: "20%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previewHeaderText: { fontSize: 14, fontWeight: "900" },
  previewCell: {
    width: "20%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previewCellText: { fontSize: 12, fontWeight: "bold" },
  previewSelectButton: { alignSelf: "center" },
  footer: { padding: SPACING_MD, borderTopWidth: 1 },
});
