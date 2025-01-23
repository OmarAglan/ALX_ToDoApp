/**
 * @fileoverview Main application component that handles theme management, user initialization,
 * and global application layout.
 * 
 * This component is responsible for:
 * - Theme management (dark/light mode)
 * - User context initialization and updates
 * - Global error boundary
 * - Global styles and layout
 * - Routing setup
 */

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { DataObjectRounded, DeleteForeverRounded } from "@mui/icons-material";
import { ThemeProvider as MuiThemeProvider, type Theme } from "@mui/material";
import { useCallback, useContext, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./layouts/MainLayout";
import { CustomToaster } from "./components/Toaster";
import { defaultUser } from "./constants/defaultUser";
import { UserContext } from "./contexts/UserContext";
import { useSystemTheme } from "./hooks/useSystemTheme";
import AppRouter from "./router";
import { GlobalStyles } from "./styles";
import { Themes, createCustomTheme, isDarkMode } from "./theme/createTheme";
import { showToast } from "./utils";

/**
 * Root application component that sets up the app's theme, layout, and global state.
 * Handles user data initialization and updates, theme management, and global error handling.
 * 
 * @returns {JSX.Element} The root application component
 */
function App() {
  const { user, setUser } = useContext(UserContext);
  const systemTheme = useSystemTheme();

  /**
   * Updates nested properties in the user object to ensure compatibility with new features.
   * Preserves existing user preferences while adding any new default properties.
   * 
   * @param userObject - The current user object
   * @param defaultObject - The default user object containing all expected properties
   * @returns The updated user object
   */
  const updateNestedProperties = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (userObject: any, defaultObject: any) => {
      if (!userObject) {
        return defaultObject;
      }

      Object.keys(defaultObject).forEach((key) => {
        if (key === "categories") {
          return;
        }
        if (
          key === "colorList" &&
          user.colorList &&
          !defaultUser.colorList.every((element, index) => element === user.colorList[index])
        ) {
          return;
        }

        if (key === "settings" && Array.isArray(userObject.settings)) {
          delete userObject.settings;
          showToast("Removed old settings array format.", {
            duration: 6000,
            icon: <DeleteForeverRounded />,
            disableVibrate: true,
          });
        }

        const userValue = userObject[key];
        const defaultValue = defaultObject[key];

        if (typeof defaultValue === "object" && defaultValue !== null) {
          userObject[key] = updateNestedProperties(userValue, defaultValue);
        } else if (userValue === undefined) {
          userObject[key] = defaultValue;
          showToast(
            <div>
              Added new property to user object{" "}
              <i translate="no">
                {key.toString()}: {userObject[key].toString()}
              </i>
            </div>,
            {
              duration: 6000,
              icon: <DataObjectRounded />,
              disableVibrate: true,
            },
          );
        }
      });

      return userObject;
    },
    [user.colorList],
  );

  /**
   * Effect hook to handle user data initialization and updates.
   * Ensures all required user properties are present and up-to-date.
   */
  useEffect(() => {
    setUser((prevUser) => {
      const updatedUser = updateNestedProperties({ ...prevUser }, defaultUser);
      return prevUser !== updatedUser ? updatedUser : prevUser;
    });
  }, [setUser, user.colorList, updateNestedProperties]);

  useEffect(() => {
    const setBadge = async (count: number) => {
      if ("setAppBadge" in navigator) {
        try {
          await navigator.setAppBadge(count);
        } catch (error) {
          console.error("Failed to set app badge:", error);
        }
      }
    };

    const clearBadge = async () => {
      if ("clearAppBadge" in navigator) {
        try {
          await navigator.clearAppBadge();
        } catch (error) {
          console.error("Failed to clear app badge:", error);
        }
      }
    };

    const displayAppBadge = async () => {
      if (user.settings.appBadge) {
        if ((await Notification.requestPermission()) === "granted") {
          const incompleteTasksCount = user.tasks.filter((task) => !task.done).length;
          if (!isNaN(incompleteTasksCount)) {
            setBadge(incompleteTasksCount);
          }
        }
      } else {
        clearBadge();
      }
    };

    if ("setAppBadge" in navigator) {
      displayAppBadge();
    }
  }, [user.settings.appBadge, user.tasks]);

  /**
   * Initializes the application theme based on user preferences or system theme.
   * Creates and applies the appropriate theme using Material-UI and Emotion.
   * 
   * @returns {Theme} The configured Material-UI theme
   */
  const getMuiTheme = useCallback((): Theme => {
    if (systemTheme === "unknown") {
      return Themes[0].MuiTheme;
    }
    if (user.theme === "system") {
      return systemTheme === "dark" ? Themes[0].MuiTheme : Themes[1].MuiTheme;
    }
    const selectedTheme = Themes.find((theme) => theme.name === user.theme);
    return selectedTheme ? selectedTheme.MuiTheme : Themes[0].MuiTheme;
  }, [systemTheme, user.theme]);

  useEffect(() => {
    const themeColorMeta = document.querySelector("meta[name=theme-color]");
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", getMuiTheme().palette.secondary.main);
    }
  }, [user.theme, getMuiTheme]);

  /**
   * Creates the custom theme based on the user's preferences and system theme.
   * 
   * @returns {Theme} The custom theme
   */
  const theme: Theme = createCustomTheme(
    getMuiTheme().palette.primary.main,
    getMuiTheme().palette.secondary.main,
    isDarkMode(user.darkmode, systemTheme, getMuiTheme().palette.secondary.main)
      ? "dark"
      : "light",
  );

  return (
    <ErrorBoundary>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider
          theme={{
            primary: getMuiTheme().palette.primary.main,
            secondary: getMuiTheme().palette.secondary.main,
            darkmode: isDarkMode(user.darkmode, systemTheme, getMuiTheme().palette.secondary.main),
          }}
        >
          <GlobalStyles />
          <CustomToaster />
          <MainLayout>
            <AppRouter />
          </MainLayout>
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
