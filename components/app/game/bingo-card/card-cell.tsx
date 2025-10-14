import { Text } from "@/components/ui/text";
import { useGameStore } from "@/store/game-store";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CardCellProps {
  num: number;
  isInteractive: boolean; // Controls if the cell can be daubed
}

const PRIMARY_COLOR = "#7f13ec";

// Memoize the cell to prevent re-renders when other cells change. This is a key performance optimization.
export const CardCell = React.memo(({ num, isInteractive }: CardCellProps) => {
  const isFree = num === -1;
  const numValue = Number(num);

  // Select state from the store. This hook will trigger re-renders ONLY for this cell.
  const { calledNumbers } = useGameStore((state) => state.activeGame) || {};
  const daubedNumbers = useGameStore((state) => state.daubedNumbers);
  const toggleDaubedNumber = useGameStore((state) => state.toggleDaubedNumber);

  // Determine the cell's state based on the store, but only if interactive.
  const isCalled =
    isInteractive &&
    (isFree || (calledNumbers && calledNumbers.includes(numValue)));
  const isDaubed = isInteractive && daubedNumbers.has(numValue);

  // A cell can only be interacted with if it's part of an interactive card and the number has been called.
  const isDisabled = !isInteractive || !isCalled;

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isDaubed ? styles.daubedCell : styles.defaultCell,
        isDisabled && !isFree && isInteractive ? styles.disabledCell : {},
      ]}
      disabled={isDisabled}
      onPress={() => toggleDaubedNumber(numValue)}
    >
      <Text style={[styles.cellText, isFree && { fontSize: 10 }]}>
        {isFree ? "FREE" : num}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cell: {
    width: "18.4%", // Adjusted for a 5-column grid with gaps
    aspectRatio: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultCell: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  daubedCell: {
    backgroundColor: PRIMARY_COLOR,
    shadowColor: PRIMARY_COLOR,
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 5,
  },
  disabledCell: {
    opacity: 0.5,
  },
  cellText: {
    fontWeight: "700",
    fontSize: 14,
    fontFamily: "Space Grotesk",
  },
});
