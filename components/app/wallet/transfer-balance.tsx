import { BottomSheet } from "@/components/ui/bottom-sheet";
import React from "react";
import { Text, useWindowDimensions } from "react-native";

interface TransferBalanceProps {
  isVisible: boolean;
  onClose: () => void;
}
const snapPoint = 0.8;
const TransferBalance: React.FC<TransferBalanceProps> = ({
  onClose,
  isVisible,
}) => {
  const { height } = useWindowDimensions();
  return (
    <BottomSheet
      title="Edit Profile"
      isVisible={isVisible}
      onClose={onClose}
      snapPoints={[snapPoint]}
      style={{
        paddingBottom: height - height * snapPoint,
      }}
    >
      <Text>TransferBalance</Text>
    </BottomSheet>
  );
};

export default TransferBalance;
