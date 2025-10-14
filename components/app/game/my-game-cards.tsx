import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import { useAuthStore } from "@/store/auth-store";
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

// A dedicated component for the list's state (loading, error, empty)
const ListStateComponent = ({
  isLoading,
  isError,
  error,
}: {
  isLoading: boolean;
  isError: boolean;
  error?: any;
}) => (
  <View style={styles.stateContainer}>
    {isLoading && <ActivityIndicator size="large" />}
    {isError && (
      <>
        <Text style={styles.errorText}>Failed to load your cards.</Text>
        <Text style={styles.errorDetail}>{error?.data?.detail}</Text>
      </>
    )}
    <Text>there is no cards</Text>
  </View>
);

const MyGameCards = () => {
  const userId = useAuthStore((state) => state.user?.id);
  const gameId = useGameStore((state) => state.activeGame?.id || "");

  // Fetch the user's purchased cards for the active game.
  const myCardsQuery = useQuery<PaginatedResponse<GameCardListEntity>>(
    urls.getGameCardsUrl(gameId || ""),
    {
      params: { gameId },
      skip: !gameId,
    }
  );

  if (!gameId) {
    return (
      <View style={styles.stateContainer}>
        <Text>No active game.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={myCardsQuery.data?.results || []}
      numColumns={2}
      renderItem={({ item: card }) => (
        <BingoCard
          id={card.template.serial}
          layout={card.template.layout}
          key={card.id}
          isInteractive
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <ListStateComponent
          isLoading={myCardsQuery.isLoading}
          isError={myCardsQuery.isError}
          error={myCardsQuery.error}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  errorDetail: {
    color: "gray",
  },
});

export default MyGameCards;
