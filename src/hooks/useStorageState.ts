/**
 * @fileoverview Custom React hook for persistent state management with web storage.
 * Provides synchronized state across browser tabs and automatic persistence.
 */

import { useState, useEffect } from "react";

/**
 * Type definition for supported web storage types
 */
type StorageType = "localStorage" | "sessionStorage";

/**
 * A custom React hook that manages state with automatic persistence to web storage.
 * 
 * Features:
 * - Automatic state persistence to localStorage or sessionStorage
 * - Real-time synchronization across browser tabs
 * - Type-safe state management
 * - Automatic JSON serialization/deserialization
 * - Fallback to default value if storage is empty
 * 
 * @template T The type of the state value
 * @param {T} defaultValue - Initial value if nothing is stored
 * @param {string} key - Storage key for persistence
 * @param {StorageType} storageType - Which storage to use (defaults to localStorage)
 * 
 * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} Tuple of:
 *   - Current state value
 *   - State update function
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const [count, setCount] = useStorageState(0, "counter");
 * 
 * // With custom type
 * interface User {
 *   name: string;
 *   age: number;
 * }
 * const [user, setUser] = useStorageState<User>({ name: "", age: 0 }, "user");
 * 
 * // With session storage
 * const [theme, setTheme] = useStorageState("light", "theme", "sessionStorage");
 * ```
 */
export function useStorageState<T>(
  defaultValue: T,
  key: string,
  storageType: StorageType = "localStorage",
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Get reference to the specified storage type
  const storage = window[storageType];

  /**
   * Initialize state with stored value or default
   * Handles cases where stored value might be undefined or invalid JSON
   */
  const [value, setValue] = useState<T>(() => {
    const storedValue = storage.getItem(key);
    return storedValue !== null && storedValue !== undefined && storedValue !== "undefined"
      ? JSON.parse(storedValue)
      : defaultValue;
  });

  /**
   * Sync effect: Persist value to storage whenever it changes
   * This ensures storage is always up to date with the latest state
   */
  useEffect(() => {
    storage.setItem(key, JSON.stringify(value));
  }, [key, value, storage]);

  /**
   * Cross-tab synchronization effect
   * Listens for storage events from other tabs and updates local state
   * This enables real-time synchronization across browser tabs
   */
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null && event.key !== "") {
        setValue(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup: Remove event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [value, setValue];
}
