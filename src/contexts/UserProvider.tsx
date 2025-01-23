/**
 * @fileoverview User Context Provider for ALX TaskMaster
 * Manages global user state including preferences, tasks, and settings.
 * Uses local storage for persistence between sessions.
 */

import { defaultUser } from "../constants/defaultUser";
import { useStorageState } from "../hooks/useStorageState";
import { User } from "../types/user";
import { UserContext } from "./UserContext";

/**
 * Props interface for the UserContextProvider component
 */
interface UserProviderProps {
  children: React.ReactNode;
}

/**
 * UserContextProvider component that provides global user state management.
 * 
 * Features:
 * - Persistent storage using localStorage
 * - Default user state initialization
 * - Global access to user data and settings
 * - Type-safe user state updates
 * 
 * Usage:
 * ```tsx
 * <UserContextProvider>
 *   <App />
 * </UserContextProvider>
 * ```
 * 
 * @param {UserProviderProps} props - Component props
 * @returns {JSX.Element} Provider component wrapping children
 */
export const UserContextProvider = ({ children }: UserProviderProps) => {
  // Initialize user state with default values and persist to localStorage
  const [user, setUser] = useStorageState<User>(defaultUser, "user");

  /**
   * Note: Commented out type-safe user update function.
   * Can be uncommented and used for more controlled state updates.
   */
  // const updateUser = <K extends keyof User>(
  //   updater: (prevUser: User) => Pick<User, K> | Partial<User>,
  // ): void => {
  //   setUser((prevUser) => ({
  //     ...prevUser,
  //     ...updater(prevUser),
  //   }));
  // };

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
