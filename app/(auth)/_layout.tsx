import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{ title: "Welcome", headerShown: false }}
      />
      <Stack.Screen name="signin" options={{ title: "Sign In" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen
        name="forget-password"
        options={{ title: "Forgot Password" }}
      />
    </Stack>
  );
}
