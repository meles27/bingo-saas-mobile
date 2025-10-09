import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { BORDER_RADIUS, SPACING_LG, SPACING_SM } from "@/theme/globals";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const PRIMARY_COLOR = "#7f13ec";
const { width: screenWidth } = Dimensions.get("window");
const PADDING = 16;
const GAP = 2;
const NUM_COLS = 15;
const CELL_SIZE = (screenWidth - PADDING * 2 - GAP * (NUM_COLS - 1)) / NUM_COLS;

const calledNumbersMock = new Set(
  Array.from({ length: 12 }, () => Math.floor(Math.random() * 75) + 1)
);

export const CalledNumbersDisplay = () => {
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Progress
          value={16}
          height={8}
          style={{
            flex: 9,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: "Space Grotesk",
            flex: 1,
            flexShrink: 0,
          }}
        >
          12/75
        </Text>
      </View>

      <View style={styles.grid}>
        {Array.from({ length: 75 }, (_, i) => i + 1).map((num) => {
          const isCalled = calledNumbersMock.has(num);
          return (
            <View
              key={num}
              style={[
                styles.cell,
                isCalled
                  ? {
                      ...styles.calledCell,
                      borderColor: PRIMARY_COLOR,
                      backgroundColor: "rgba(127, 19, 236, 0.2)",
                    }
                  : styles.defaultCell,
              ]}
            >
              <Text
                style={[
                  styles.cellText,
                  { color: isCalled ? "white" : "rgba(255, 255, 255, 0.3)" },
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Space Grotesk",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    // borderRadius: 999,
    borderRadius: BORDER_RADIUS,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultCell: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  calledCell: {
    borderWidth: 2,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  cellText: {
    fontSize: 12,
    fontFamily: "Space Grotesk",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: SPACING_LG,
  },
});
