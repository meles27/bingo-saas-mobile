// import { Text } from "@/components/ui/text";
// import { useGameStore } from "@/store/game-store";
// import React from "react";
// import { StyleSheet, TouchableOpacity } from "react-native";

// interface CardCellProps {
//   num: number;
//   isInteractive: boolean; // Controls if the cell can be daubed
// }

// const PRIMARY_COLOR = "#7f13ec";

// // Memoize the cell to prevent unnecessary re-renders
// export const CardCell = React.memo(({ num, isInteractive }: CardCellProps) => {
//   const isFree = num === -1;
//   const numValue = Number(num);

//   const calledNumbers =
//     useGameStore((state) => state.activeGame?.calledNumbers) || [];
//   const daubedNumbers = useGameStore((state) => state.daubedNumbers);
//   const toggleDaubedNumber = useGameStore((state) => state.toggleDaubedNumber);
//   const isCalled =
//     isInteractive &&
//     (isFree || (calledNumbers && calledNumbers.includes(numValue)));
//   const isDaubed = isInteractive && daubedNumbers.has(numValue);

//   const isDisabled = !isInteractive || !isCalled;

//   return (
//     <TouchableOpacity
//       style={[
//         styles.cell,
//         isDaubed ? styles.daubedCell : styles.defaultCell,
//         isDisabled && !isFree && isInteractive ? styles.disabledCell : {},
//       ]}
//       disabled={isDisabled}
//       onPress={() => toggleDaubedNumber(numValue)}
//     >
//       <Text style={[styles.cellText, isFree && { fontSize: 10 }]}>
//         {isFree ? "FREE" : num}
//       </Text>
//     </TouchableOpacity>
//   );
// });

// const styles = StyleSheet.create({
//   cell: {
//     flex: 1,
//     aspectRatio: 1, // perfect square
//     borderRadius: 6,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 4,
//   },
//   defaultCell: {
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//   },
//   daubedCell: {
//     backgroundColor: PRIMARY_COLOR,
//     shadowColor: PRIMARY_COLOR,
//     shadowRadius: 8,
//     shadowOpacity: 1,
//     elevation: 5,
//   },
//   disabledCell: {
//     opacity: 0.5,
//   },
//   cellText: {
//     fontWeight: "700",
//     fontSize: 14,
//     fontFamily: "Space Grotesk",
//   },
// });

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
  const numValue = Number(num);

  let isDaubed = false;
  let isDisabled = true;
  let isCalled = true;

  // Only subscribe to store if interactive
  const toggleDaubedNumber = isInteractive
    ? useGameStore((state) => state.toggleDaubedNumber)
    : undefined;

  if (isInteractive) {
    const { calledNumbers } = useGameStore((state) => state.activeGame) || {};
    const daubedNumbers = useGameStore((state) => state.daubedNumbers);

    isCalled = (calledNumbers && calledNumbers.includes(numValue)) || isFree;
    isDaubed = daubedNumbers.has(numValue);
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
      onPress={() => toggleDaubedNumber?.(numValue)}
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
