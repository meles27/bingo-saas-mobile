import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React, { useMemo } from "react";
import { Dimensions, Text, View } from "react-native";

interface GridItem {
  id: string;
  serial: string;
}

interface TwoColumnGridProps {
  data: GridItem[];
  onEndReached?: () => void;
}

export const TwoColumnGrid: React.FC<TwoColumnGridProps> = ({
  data,
  onEndReached,
}) => {
  const numColumns = 2;
  const windowWidth = Dimensions.get("window").width;

  // Precompute item width (avoid recalculating on each render)
  const itemWidth = useMemo(() => windowWidth / numColumns, [windowWidth]);

  const renderItem: ListRenderItem<GridItem> = ({ item, index }) => (
    <View
      style={{
        width: itemWidth,
        height: 150, // or dynamic
        margin: 4,
        backgroundColor: "white",
        elevation: 2,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{item.serial}</Text>
      {/* Add more content here */}
    </View>
  );

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
    />
  );
};
