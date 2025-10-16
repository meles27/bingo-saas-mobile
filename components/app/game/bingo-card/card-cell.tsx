import { Text } from "@/components/ui/text";
import { useGameStore } from "@/store/game-store";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface CardCellProps {
  num: number;
  isInteractive: boolean; // Controls if the cell can be daubed
}

const PRIMARY_COLOR = "#7f13ec";

export const CardCell = React.memo(({ num, isInteractive }: CardCellProps) => {
  const isFree = num === -1;
  let isDaubed = false;
  let isDisabled = true;
  let isCalled = true;

  const toggleDaubedNumber = useGameStore.getState().toggleDaubedNumber;

  if (isInteractive) {
    const { calledNumbers } = useGameStore((state) => state.activeGame) || {};
    const daubedNumbers = useGameStore((state) => state.daubedNumbers);

    isCalled = (calledNumbers && calledNumbers.includes(num)) || isFree;
    isDaubed = daubedNumbers.has(num);
    isDisabled = !isCalled;
  }

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isDaubed ? styles.daubedCell : styles.defaultCell,
        isDisabled && !isFree && isInteractive ? styles.disabledCell : {},
      ]}
      disabled={isDisabled}
      onPress={() => toggleDaubedNumber(num)}
    >
      <Text style={[styles.cellText, isFree && { fontSize: 10 }]}>
        {isFree ? "FREE" : num}
      </Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cell: {
    flex: 1,

    aspectRatio: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ffffff20",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  defaultCell: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  daubedCell: {
    backgroundColor: PRIMARY_COLOR,
    shadowColor: PRIMARY_COLOR,
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
