import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import { useAuthStore } from "@/store/auth-store";
import { useGameStore } from "@/store/game-store";
import { PaginatedResponse } from "@/types/api/base";
import { CardTemplateListEntity } from "@/types/api/game/card-template.type";
import { GameCardListEntity } from "@/types/api/game/game-card.type";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BingoCard } from "./bingo-card";

const cardsData = [
  {
    id: 1,
    isWinner: true,
    layout: [
      3,
      17,
      33,
      48,
      63,
      11,
      28,
      41,
      52,
      71,
      5,
      20,
      -1,
      58,
      68, // FREE = -1
      14,
      25,
      38,
      46,
      75,
      9,
      22,
      31,
      55,
      61,
    ],
  },
  {
    id: 2,
    isWinner: false,
    layout: [
      7, 18, 35, 50, 65, 1, 21, 44, 56, 70, 12, 29, -1, 47, 62, 4, 26, 39, 53,
      73, 15, 23, 30, 59, 66,
    ],
  },
  {
    id: 3,
    isWinner: false,
    layout: [
      2, 16, 32, 49, 64, 10, 27, 40, 51, 72, 6, 19, -1, 57, 67, 13, 24, 37, 45,
      74, 8, 21, 34, 54, 60,
    ],
  },
  {
    id: 4,
    isWinner: false,
    layout: [
      8, 19, 33, 51, 66, 2, 22, 45, 57, 71, 13, 30, -1, 48, 63, 5, 27, 40, 54,
      74, 16, 24, 31, 60, 67,
    ],
  },
];

const MyGameCards = () => {
  const userId = useAuthStore((state) => state.user?.id);
  const gameId = useGameStore((state) => state.gameId);
  const myCardsQuery = useQuery<PaginatedResponse<GameCardListEntity>>(
    urls.getGameCardsUrl(gameId || ""),
    {
      params: {
        userId,
      },
      skip: !gameId,
    }
  );

  const cardTemplatesQuery = useQuery<
    PaginatedResponse<CardTemplateListEntity>
  >(urls.getCardTemplatesUrl(), {
    params: {
      userId,
    },
    skip: !gameId,
  });

  console.log(userId, gameId);

  if (!gameId) {
    return null;
  }

  const isLoading = myCardsQuery.isLoading && cardTemplatesQuery.isLoading;
  const isError = myCardsQuery.isError && cardTemplatesQuery.isError;
  const isSuccess = myCardsQuery.isSuccess && cardTemplatesQuery.isSuccess;

  return (
    <>
      {isLoading && <ActivityIndicator style={styles.activeIndicator} />}

      {isError && (
        <View>
          <Text>Error</Text>
          <Text>
            {myCardsQuery.error.data?.detail ||
              cardTemplatesQuery.error.data?.detail}
          </Text>
        </View>
      )}

      {isSuccess && (
        <>
          {/* <FlatList
            data={cardsData}
            numColumns={2}
            renderItem={({ item: card }) => (
              <BingoCard {...card} key={card.id} />
            )}
            keyExtractor={(item) => item.id.toString()}
          /> */}
          {/* <JsonViewer
            data={cardTemplatesQuery.data?.results?.map((item) => item)}
          /> */}
          <FlatList
            data={cardTemplatesQuery.data.results || []}
            numColumns={2}
            renderItem={({ item: card }) => (
              <BingoCard
                id={card?.serial}
                layout={card?.layout || []}
                key={card.id}
                disabled={card.serial > 1204 ? true : false}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </>
  );
};

export default MyGameCards;

const styles = StyleSheet.create({
  activeIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
