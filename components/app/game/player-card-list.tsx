import { ApiError } from "@/components/api-error";
import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import { useAuthStore } from "@/store/auth-store";
import { useGameStore } from "@/store/game-store";
import { PaginatedResponse } from "@/types/api/base";
import { CardTemplateListEntity } from "@/types/api/game/card-template.type";
import { GameCardListEntity } from "@/types/api/game/game-card.type";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { BingoCard } from "./bingo-card/bingo-card";

export const PlayerCardList = () => {
  const activeGame = useGameStore((state) => state.activeGame);
  const user = useAuthStore((state) => state.user);
  const cardTemplatesQuery = useQuery<
    PaginatedResponse<CardTemplateListEntity>
  >(urls.getGameFreeTemplatesUrl(activeGame?.id || ""), {
    manual: true,
    params: { limit: 5 },
    skip: !activeGame?.id,
  });

  const myCardsQuery = useQuery<PaginatedResponse<GameCardListEntity>>(
    urls.getGameCardsUrl(activeGame?.id || ""),
    {
      params: { limit: 100, userId: user?.id },
      skip: !activeGame?.id,
    }
  );

  useFocusEffect(
    React.useCallback(() => {
      cardTemplatesQuery.refetch();
      myCardsQuery.refetch();
    }, [])
  );

  const isLoading = myCardsQuery.isLoading || cardTemplatesQuery.isLoading;
  const isSuccess = myCardsQuery.isSuccess && cardTemplatesQuery.isSuccess;
  const isError = myCardsQuery.isError || cardTemplatesQuery.isError;

  // Merge myCards first, then the rest of the templates excluding myCards
  const mergedCards = React.useMemo(() => {
    const myCards =
      myCardsQuery.data?.results?.map((myCard) => myCard.template) || [];

    const allTemplates = cardTemplatesQuery.data?.results || [];
    return [...myCards, ...allTemplates];
  }, [myCardsQuery.data, cardTemplatesQuery.data]);

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}

      {isError && (
        <ApiError error={myCardsQuery.error || cardTemplatesQuery.error} />
      )}

      {isSuccess && (
        <FlashList
          data={mergedCards}
          numColumns={2}
          renderItem={({ item: card, index }) => (
            <BingoCard
              id={card.id}
              serial={card.serial}
              layout={card.layout}
              isInteractive={
                index < (myCardsQuery.data?.results.length + 3 || 0)
              }
              isOwned={index < (myCardsQuery.data?.results.length || 0)}
              callback={(actionType) => {
                if (actionType == "register") {
                  myCardsQuery.refetch();
                  cardTemplatesQuery.refetch();
                } else if (actionType == "bingo") {
                  console.log("bingo");
                }
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{}}
          ListEmptyComponent={
            <View>
              <Text style={styles.emptyText}>No card templates available.</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative", // Needed for absolute positioning of children
  },

  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f43f5e",
    textAlign: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#a1a1aa",
  },
});
