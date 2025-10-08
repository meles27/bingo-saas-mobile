import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "@/theme/theme-provider";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { useAuthStore } from "@/store/auth-store";

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{ flex: 1 }}>
        <ToastProvider>
          <ThemeProvider>
            <Stack>
              <Stack.Protected guard={!isAuthenticated()}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="(modal)"
                  options={{
                    headerShown: false,
                    presentation: "modal",
                    animation: "fade_from_bottom",
                  }}
                />
              </Stack.Protected>

              <Stack.Protected guard={!!isAuthenticated()}>
                <Stack.Screen
                  name="(auth)"
                  options={{
                    headerShown: false,
                    animation: "fade_from_bottom",
                  }}
                />
              </Stack.Protected>

              <Stack.Screen
                name="+not-found"
                options={{ title: "Not Found" }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </ToastProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
