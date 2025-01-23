/**
 * @fileoverview Type definitions for user-related data structures in ALX TaskMaster.
 * Contains interfaces and types for users, tasks, categories, and application settings.
 */

import type { EmojiStyle } from "emoji-picker-react";

/**
 * Represents a universally unique identifier.
 * Uses the crypto.randomUUID() for secure, unique ID generation.
 */
export type UUID = ReturnType<typeof crypto.randomUUID>;

/**
 * Available options for dark mode settings.
 * - system: Follow system preferences
 * - auto: Automatically switch based on time
 * - light: Always use light mode
 * - dark: Always use dark mode
 */
export type DarkModeOptions = "system" | "auto" | "light" | "dark";

/**
 * Core user interface representing a user in the application.
 * Contains all user-specific data and preferences.
 * 
 * @property {string | null} name - User's display name
 * @property {Date} createdAt - Account creation timestamp
 * @property {string | null} profilePicture - URL to user's profile picture
 * @property {EmojiStyle} emojisStyle - Preferred emoji rendering style
 * @property {Task[]} tasks - Array of user's tasks
 * @property {Category[]} categories - User-defined task categories
 * @property {string[]} colorList - Custom color palette for tasks
 * @property {AppSettings} settings - User's application preferences
 * @property {string} theme - UI theme preference
 * @property {DarkModeOptions} darkmode - Dark mode configuration
 */
export interface User {
  name: string | null;
  createdAt: Date;
  profilePicture: string | null;
  emojisStyle: EmojiStyle;
  tasks: Task[];
  categories: Category[];
  colorList: string[];
  settings: AppSettings;
  theme: "system" | (string & {});
  darkmode: DarkModeOptions;
}

/**
 * Represents a task in the application.
 * Tasks are the core data structure for managing user's todos.
 * 
 * @property {UUID} id - Unique identifier for the task
 * @property {boolean} done - Completion status
 * @property {boolean} pinned - Whether task is pinned to top
 * @property {string} name - Task title
 * @property {string} [description] - Optional detailed description
 * @property {string} [emoji] - Optional emoji identifier
 * @property {string} color - Task color for UI
 * @property {Date} date - Creation date
 * @property {Date} [deadline] - Optional due date
 * @property {Category[]} [category] - Associated categories
 * @property {Date} [lastSave] - Last modification timestamp
 * @property {string} [sharedBy] - Username of task sharer
 */
export interface Task {
  id: UUID;
  done: boolean;
  pinned: boolean;
  name: string;
  description?: string;
  emoji?: string;
  color: string;
  date: Date;
  deadline?: Date;
  category?: Category[];
  lastSave?: Date;
  sharedBy?: string;
}

/**
 * Represents a task category.
 * Categories help organize tasks into logical groups.
 * 
 * @property {UUID} id - Unique identifier
 * @property {string} name - Category name
 * @property {string} [emoji] - Optional emoji identifier
 * @property {string} color - Category color for UI
 */
export interface Category {
  id: UUID;
  name: string;
  emoji?: string;
  color: string;
}

/**
 * Application settings interface.
 * Controls various features and behaviors of the application.
 * 
 * @property {boolean} enableCategories - Whether categories feature is enabled
 * @property {boolean} doneToBottom - Move completed tasks to bottom
 * @property {boolean} enableGlow - Enable UI glow effects
 * @property {boolean} simpleEmojiPicker - Use simplified emoji picker
 * @property {boolean} enableReadAloud - Enable text-to-speech features
 * @property {boolean} appBadge - Show app badge with task count
 * @property {string} voice - Selected text-to-speech voice
 * @property {number} voiceVolume - Text-to-speech volume (0-1)
 */
export interface AppSettings {
  enableCategories: boolean;
  doneToBottom: boolean;
  enableGlow: boolean;
  simpleEmojiPicker: boolean;
  enableReadAloud: boolean;
  appBadge: boolean;
  voice: string;
  voiceVolume: number;
}
