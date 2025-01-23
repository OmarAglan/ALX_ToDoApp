/**
 * @fileoverview Theme creation and management for ALX TaskMaster.
 * Provides utilities for creating and managing Material-UI themes with custom colors and modes.
 */

import type { PaletteMode, Theme } from "@mui/material";
import { createTheme } from "@mui/material";
import type { SystemTheme } from "../hooks/useSystemTheme";
import type { User } from "../types/user";
import { getFontColor } from "../utils";
import { muiComponentsProps } from "./muiComponents";
import { ColorPalette, themeConfig } from "./themeConfig";

/**
 * Creates a custom Material-UI theme with specified colors and mode.
 * 
 * Features:
 * - Custom primary and background colors
 * - Light/dark mode support
 * - Consistent component styling
 * - Custom warning and error colors
 * - Responsive typography
 * 
 * @param {string} primaryColor - Main brand color for the theme
 * @param {string} backgroundColor - Secondary/background color, defaults to deep blue
 * @param {PaletteMode} mode - Theme mode ('light' or 'dark'), defaults to dark
 * @returns {Theme} Configured Material-UI theme object
 * 
 * @example
 * ```typescript
 * const theme = createCustomTheme('#1976d2', '#f5f5f5', 'light');
 * ```
 */
export const createCustomTheme = (
  primaryColor: string,
  backgroundColor = "#232e58",
  mode: PaletteMode = "dark",
): Theme => {
  return createTheme({
    components: {
      ...muiComponentsProps,
    },
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: backgroundColor,
      },
      warning: {
        main: mode === "dark" ? ColorPalette.orange : ColorPalette.orangeDark,
      },
      error: {
        main: ColorPalette.red,
      },
      mode,
    },
  });
};

/**
 * Predefined themes available in the application.
 * Each theme includes a name and its corresponding Material-UI theme configuration.
 * Themes are generated from the themeConfig object.
 * 
 * @type {Array<{name: string, MuiTheme: Theme}>}
 */
export const Themes: { name: string; MuiTheme: Theme }[] = Object.entries(themeConfig).map(
  ([name, config]) => ({
    name: name as string,
    MuiTheme: createCustomTheme(config.primaryColor, config.secondaryColor),
  }),
);

/**
 * Determines if dark mode should be enabled based on user preferences and system theme.
 * 
 * Logic:
 * - If user preference is 'light' or 'dark', use that directly
 * - If 'auto', check system theme
 * - If system theme is unknown, use the background color to determine mode
 * 
 * @param {User["darkmode"]} userPreference - User's dark mode preference
 * @param {SystemTheme} systemTheme - Current system theme
 * @param {string} backgroundColor - Current background color
 * @returns {boolean} Whether dark mode should be enabled
 */
export const isDarkMode = (
  userPreference: User["darkmode"],
  systemTheme: SystemTheme,
  backgroundColor: string,
): boolean => {
  if (userPreference === "light") return false;
  if (userPreference === "dark") return true;

  if (systemTheme === "unknown") {
    return getFontColor(backgroundColor) === "#ffffff";
  }

  return systemTheme === "dark";
};
