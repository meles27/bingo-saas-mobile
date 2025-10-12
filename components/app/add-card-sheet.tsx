import { BottomSheet } from "@/components/ui/bottom-sheet";
import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import { useAuthStore } from "@/store/auth-store";
import { useGameStore } from "@/store/game-store";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { BingoCard } from "./active-game/bingo-card";

const cardsData = [
  {
    id: 1,
    isWinner: true,
    numbers: [
      [3, 17, 33, 48, 63],
      [11, 28, 41, 52, 71],
      [5, 20, "FREE", 58, 68],
      [14, 25, 38, 46, 75],
      [9, 22, 31, 55, 61],
    ],
    calledNumbers: [3, 41, 68, 22, 55, 11, 20, 75, 9],
  },
  {
    id: 2,
    isWinner: false,
    numbers: [
      [7, 18, 35, 50, 65],
      [1, 21, 44, 56, 70],
      [12, 29, "FREE", 47, 62],
      [4, 26, 39, 53, 73],
      [15, 23, 30, 59, 66],
    ],
    calledNumbers: [18, 44, 62, 59, 15],
  },
  {
    id: 3,
    isWinner: false,
    numbers: [
      [2, 16, 32, 49, 64],
      [10, 27, 40, 51, 72],
      [6, 19, "FREE", 57, 67],
      [13, 24, 37, 45, 74],
      [8, 21, 34, 54, 60],
    ],
    calledNumbers: [16, 40, 67, 21, 60, 10],
  },
  {
    id: 4,
    isWinner: false,
    numbers: [
      [8, 19, 36, 51, 66],
      [2, 22, 45, 57, 71],
      [13, 30, "FREE", 48, 63],
      [5, 27, 40, 54, 74],
      [16, 24, 31, 60, 67],
    ],
    calledNumbers: [19, 45, 63, 60],
  },
];

const snapPoint = 0.85;

interface AddCardSheetProps {
  isVisible: boolean;
  toggle: () => void;
}

const AddCardSheet: React.FC<AddCardSheetProps> = (props) => {
  const userId = useAuthStore((state) => state.user?.id);
  const gameId = useGameStore((state) => state.gameId);
  const { height } = useWindowDimensions();

  const myCardsQuery = useQuery<any>(urls.getCardTemplatesUrl(), {
    skip: !gameId,
  });

  if (!gameId) {
    return null;
  }

  return (
    <BottomSheet
      isVisible={props.isVisible}
      onClose={props.toggle}
      snapPoints={[snapPoint]}
      style={{
        paddingBottom: height - snapPoint * height,
      }}
    >
      {myCardsQuery.isLoading && (
        <ActivityIndicator style={styles.activeIndicator} />
      )}

      {myCardsQuery.isError && (
        <View>
          <Text>Error</Text>
          <Text>{myCardsQuery.error.data?.detail}</Text>
        </View>
      )}

      {myCardsQuery.isSuccess && (
        <FlatList
          data={cardsData}
          numColumns={2}
          renderItem={({ item: card }) => <BingoCard {...card} key={card.id} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </BottomSheet>
  );
};

export default AddCardSheet;

const styles = StyleSheet.create({
  activeIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
