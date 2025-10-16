import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

/**
 * A truly universal and server-safe storage object.
 * This is the core utility that enables persistence in an Expo Router app.
 *
 * - On the server (SSR), it acts as a "no-op" (no operation) to prevent crashes.
 * - On the client, it uses AsyncStorage for native and localStorage for web.
 */
export const universalStorage = {
  /**
   * Reads a value from storage. Returns null on the server.
   */
  getItem: (name: string): string | null | Promise<string | null> => {
    // On the server, `window` is not defined. Immediately return null.
    if (typeof window === "undefined") {
      return null;
    }
    return Platform.OS === "web"
      ? localStorage.getItem(name)
      : AsyncStorage.getItem(name);
  },
  /**
   * Writes a value to storage. Does nothing on the server.
   */
  setItem: (name: string, value: string): void | Promise<void> => {
    // On the server, do nothing.
    if (typeof window === "undefined") {
      return;
    }
    return Platform.OS === "web"
      ? localStorage.setItem(name, value)
      : AsyncStorage.setItem(name, value);
  },
  /**
   * Removes a value from storage. Does nothing on the server.
   */
  removeItem: (name: string): void | Promise<void> => {
    // On the server, do nothing.
    if (typeof window === "undefined") {
      return;
    }
    return Platform.OS === "web"
      ? localStorage.removeItem(name)
      : AsyncStorage.removeItem(name);
  },
};
