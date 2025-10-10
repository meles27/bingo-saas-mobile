import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { SPACING_LG, SPACING_SM } from "@/theme/globals";
import React, { useMemo } from "react";
import { Dimensions, StyleSheet } from "react-native";

const PRIMARY_COLOR = "#7f13ec";
const { width: screenWidth } = Dimensions.get("window");
const PADDING = 4;
const GAP = 2;
const NUM_COLS = 15;
const CELL_SIZE = (screenWidth - PADDING * 2 - GAP * (NUM_COLS - 1)) / NUM_COLS;
const TOTAL_NUMBERS = 75;

// --- 1. Define the updated props interface ---
interface CalledNumbersDisplayProps {
  /** An array of numbers that have been called in the game. */
  calledNumbers: number[];
  /** The most recently called number, to be highlighted. */
  lastCalledNumber?: number | null;
}

/**
 * A display component that renders a grid of 75 numbers, highlighting
 * all called numbers and giving special prominence to the most recent one.
 *
 * @param {CalledNumbersDisplayProps} props - The component props.
 */
export const CalledNumbersDisplay = ({
  calledNumbers = [],
  lastCalledNumber = null, // Destructure the new prop with a default value
}: CalledNumbersDisplayProps) => {
  const calledNumbersSet = useMemo(
    () => new Set(calledNumbers),
    [calledNumbers]
  );
  const numbersCalledCount = calledNumbersSet.size;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Progress
          value={(numbersCalledCount / TOTAL_NUMBERS) * 100}
          height={8}
          style={{ flex: 9 }}
        />
        <Text style={styles.progressText}>
          {numbersCalledCount}/{TOTAL_NUMBERS}
        </Text>
      </View>

      <View style={styles.grid}>
        {Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1).map((num) => {
          // --- 2. Determine the state for each cell ---
          const isCalled = calledNumbersSet.has(num);
          const isLastCalled = num === lastCalledNumber;

          return (
            <View
              key={num}
              style={[
                styles.cell,
                // --- 3. Apply styles with priority ---
                // The most specific style (last called) comes first.
                isLastCalled
                  ? styles.lastCalledCell
                  : isCalled
                  ? styles.calledCell
                  : styles.defaultCell,
              ]}
            >
              <Text
                style={[
                  styles.cellText,
                  // Both last called and regularly called numbers get bright text.
                  isLastCalled || isCalled
                    ? styles.calledCellText
                    : styles.defaultCellText,
                ]}
              >
                {num}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING,
    paddingVertical: SPACING_SM,
    gap: SPACING_SM,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    // borderRadius: BORDER_RADIUS,
    borderRadius: SPACING_SM,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultCell: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  calledCell: {
    backgroundColor: "rgba(127, 19, 236, 0.2)",
    borderColor: PRIMARY_COLOR,
    borderWidth: 1.5,
  },
  // --- 4. Add the new, high-visibility style for the last called number ---
  lastCalledCell: {
    backgroundColor: PRIMARY_COLOR, // Bright, solid background
    borderColor: "white", // Contrasting white border
    borderWidth: 1.5,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 10,
  },
  cellText: {
    fontSize: CELL_SIZE > 20 ? 12 : 10,
    fontFamily: "Space Grotesk",
  },
  // --- 5. Add distinct text styles for clarity ---
  defaultCellText: {
    color: "rgba(255, 255, 255, 0.3)",
  },
  calledCellText: {
    color: "white",
    fontWeight: "bold",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING_LG,
  },
  progressText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: "Space Grotesk",
    flex: 1,
    flexShrink: 0,
    textAlign: "right",
  },
});
