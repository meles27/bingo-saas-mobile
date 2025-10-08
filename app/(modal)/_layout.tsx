import { Stack } from "expo-router";
import React from "react";

const ModalLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="user" options={{ title: "User" }} />
    </Stack>
  );
};

export default ModalLayout;
