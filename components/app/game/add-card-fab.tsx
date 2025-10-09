import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useThemeColor } from "@/hooks/useThemeColor";
import { CORNERS, SPACING_LG } from "@/theme/globals";
import { Plus } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";

interface AddCardFabProps {
  onPress: () => void;
}

export const AddCardFab = ({ onPress }: AddCardFabProps) => {
  const primaryColor = useThemeColor({}, "primary");
  const primaryForegroundColor = useThemeColor({}, "primaryForeground");

  return (
    <Button
      style={[styles.fab, { backgroundColor: primaryColor }]}
      onPress={onPress}
      size="icon"
    >
      <Icon name={Plus} color={primaryForegroundColor} />
    </Button>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: SPACING_LG,
    right: SPACING_LG,
    borderRadius: CORNERS,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
