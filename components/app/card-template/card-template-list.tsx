import { urls } from "@/config/urls";
import { useQuery } from "@/hooks/base/api/useQuery";
import { PaginatedResponse } from "@/types/api/base";
import { CardTemplateListEntity } from "@/types/api/game/card-template.type";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { BingoCard } from "../game/bingo-card/bingo-card";

// A dedicated component for the overlay states (loading, error)
const ListOverlayState = ({
  isLoading,
  isError,
  error,
}: {
  isLoading: boolean;
  isError: boolean;
  error?: any;
}) => {
  if (!isLoading && !isError) {
    return null; // Render nothing if not loading or errored
  }

  return (
    <View style={styles.overlayContainer}>
      {isLoading && <ActivityIndicator size="large" color="#fff" />}
      {isError && (
        <Text style={styles.errorText}>
          {error?.data?.detail || "Failed to load card templates."}
        </Text>
      )}
    </View>
  );
};

export const CardTemplateList = () => {
  const cardTemplatesQuery = useQuery<
    PaginatedResponse<CardTemplateListEntity>
  >(urls.getCardTemplatesUrl(), {
    manual: true,
    params: {
      limit: 100,
    },
  });

  const handleToggleSelection = (cardId: string) => {
    // This logic should be lifted up to the parent component (AddCardSheet)
    console.log("cardId", cardId);
  };

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        cardTemplatesQuery.refetch();
      }, 100);
    }, [])
  );

  const hasData = (cardTemplatesQuery.data?.results?.length ?? 0) > 0;

  return (
    <View style={styles.container}>
      <FlashList
        data={cardTemplatesQuery.data?.results || []}
        numColumns={2}
        renderItem={({ item: card }) => (
          <BingoCard
            id={card.serial}
            layout={card.layout}
            isInteractive={true} // For selection, not gameplay
          />
        )}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          // Show "no templates" message only on success with no data
          cardTemplatesQuery.isSuccess && !hasData ? (
            <View style={styles.overlayContainer}>
              <Text style={styles.emptyText}>No card templates available.</Text>
            </View>
          ) : null
        }
      />

      <ListOverlayState
        isLoading={cardTemplatesQuery.isLoading}
        isError={cardTemplatesQuery.isError}
        error={cardTemplatesQuery.error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the component fills the available space in the Bottom Sheet
    position: "relative", // Needed for absolute positioning of children
  },
  listContent: {
    padding: 4,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject, // Makes the view cover the entire container
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Optional semi-transparent background
    borderRadius: 10,
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
