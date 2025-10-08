import { View } from "@/components/ui/view";
import React from "react";
import { Text } from "react-native";

const User = () => {
  return (
    <View className="border border-red-500" style={{ flex: 1, paddingTop: 20 }}>
      <Text>User Profile</Text>
    </View>
  );
};

export default User;
