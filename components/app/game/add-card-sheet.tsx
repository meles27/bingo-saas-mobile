// components/add-card-sheet.tsx

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { CardTemplateList } from "../card-template/card-template-list";

const snapPoint = 0.85; // 85% of the screen height

interface AddCardSheetProps {
  isVisible: boolean;
  onClose: () => void;
  // Callback to pass the selected cards up
  onAddCards: (selectedIds: Set<string>) => void;
}

export const AddCardSheet: React.FC<AddCardSheetProps> = ({
  isVisible,
  onClose,
  onAddCards,
}) => {
  const { height } = useWindowDimensions();
  // State for selected cards now lives here
  const [selectedIds, setSelectedIds] = useState(new Set<string>());

  const handleConfirm = () => {
    onAddCards(selectedIds);
    onClose(); // Close the sheet after confirming
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onClose}
      snapPoints={[snapPoint]}
      style={{ paddingBottom: height - height * snapPoint, flex: 1 }}
      // snapPoints={[height * snapPoint]} // Calculate snap point in pixels
    >
      <View style={styles.sheetContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Cards to Add</Text>
        </View>

        {/* The list component now takes state and callbacks as props */}
        <CardTemplateList />

        <View style={styles.footer}>
          <Button onPress={handleConfirm} disabled={selectedIds.size === 0}>
            <Text>Add {selectedIds.size} Selected Cards</Text>
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    paddingBottom: 20, // Add some padding at the bottom
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
});
