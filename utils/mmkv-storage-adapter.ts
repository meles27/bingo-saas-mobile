import { MMKV } from "react-native-mmkv";
import type { StateStorage } from "zustand/middleware";

// Create a new MMKV instance
const storage = new MMKV();

/**
 * A synchronous storage adapter for Zustand's persist middleware using react-native-mmkv.
 * This is significantly faster than AsyncStorage and provides a synchronous API.
 */
export const mmkvStorageAdapter: StateStorage = {
  /**
   * Reads a string from MMKV storage.
   */
  getItem: (name: string): string | null => {
    const value = storage.getString(name);
    return value ?? null;
  },
  /**
   * Writes a string to MMKV storage.
   */
  setItem: (name: string, value: string): void => {
    storage.set(name, value);
  },
  /**
   * Removes an item from MMKV storage.
   */
  removeItem: (name: string): void => {
    storage.delete(name);
  },
};
