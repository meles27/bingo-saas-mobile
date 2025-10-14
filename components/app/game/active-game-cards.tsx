import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import { useGameStore } from "@/store/game-store";
import { PaginatedResponse } from "@/types/api/base";
import { GameCardListEntity } from "@/types/api/game/game-card.type";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BingoCard } from "./bingo-card/bingo-card";

const ListStateComponent = ({
  isLoading,
  isError,
  error,
  hasData,
}: {
  isLoading: boolean;
  isError: boolean;
  error?: any;
  hasData: boolean;
}) => (
  <View style={styles.stateContainer}>
    {isLoading && <ActivityIndicator size="large" />}
    {isError && (
      <Text style={styles.errorText}>
        {error?.data?.detail || "Failed to load your cards."}
      </Text>
    )}
    {!isLoading && !isError && !hasData && (
      <Text style={styles.emptyText}>
        You haven't purchased any cards for this game.
      </Text>
    )}
  </View>
);

export const ActiveGameCards = () => {
  const gameId = useGameStore((state) => state.activeGame?.id);

  const myCardsQuery = useQuery<PaginatedResponse<GameCardListEntity>>(
    urls.getGameCardsUrl(gameId || ""),
    { skip: !gameId }
  );

  if (!gameId) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.emptyText}>No active game.</Text>
      </View>
    );
  }

  const hasData = (myCardsQuery.data?.results?.length ?? 0) > 0;

  return (
    <FlatList
      data={myCardsQuery.data?.results || []}
      numColumns={2}
      renderItem={({ item: card }) => (
        <BingoCard
          id={card.template.serial}
          layout={card.template.layout}
          isInteractive // This is an active game card, so it's interactive
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <ListStateComponent
          isLoading={myCardsQuery.isLoading}
          isError={myCardsQuery.isError}
          error={myCardsQuery.error}
          hasData={hasData}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: { flexGrow: 1, padding: 4 },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f43f5e",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#a1a1aa",
  },
});
