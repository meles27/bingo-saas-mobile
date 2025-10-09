import { useAuthStore } from "@/store/auth-store";
import { Redirect, Slot } from "expo-router";

export default function PrivateLayout() {
  // get authentication state from Zustand store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // if not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Redirect href="/(auth)/signin" />;
  }

  // if authenticated, render nested screens
  return <Slot />;
}
