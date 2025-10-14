import { BottomSheet } from "@/components/ui/bottom-sheet";
import React from "react";
import { Text, useWindowDimensions } from "react-native";

interface DepositBalanceProps {
  isVisible: boolean;
  onClose: () => void;
}
const snapPoint = 0.8;
const DepositBalance: React.FC<DepositBalanceProps> = ({
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
      <Text>DepositBalance</Text>
    </BottomSheet>
  );
};

export default DepositBalance;
