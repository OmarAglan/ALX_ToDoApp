/**
 * @fileoverview Main entry point for the ALX TaskMaster application.
 * Sets up the React application with routing, service worker, and context providers.
 * 
 * Key Features:
 * - Progressive Web App (PWA) support with offline capabilities
 * - Automatic updates with user prompts
 * - Color name initialization for the color picker
 * - React Router for navigation
 * - Global user context for state management
 */

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { initColors } from "ntc-ts";
import { ORIGINAL_COLORS } from "ntc-ts";
import { UserContextProvider } from "./contexts/UserProvider.tsx";
import { registerSW } from "virtual:pwa-register";
import { showToast } from "./utils/showToast.tsx";
import { updatePrompt } from "./utils/updatePrompt.tsx";

/**
 * Initialize the color name library with the original color set.
 * This enables color name lookups for the color picker component.
 */
initColors(ORIGINAL_COLORS);

/**
 * Register the service worker for PWA functionality.
 * Handles:
 * - App updates with user prompts
 * - Offline capability notifications
 * - Automatic page reload after updates
 */
registerSW({
  onRegistered(r) {
    if (r) {
      updatePrompt(r);
    }
  },
  onOfflineReady() {
    showToast("App is ready to work offline.", { type: "success", duration: 2000 });
  },
});

/**
 * Listen for service worker controller changes.
 * Reloads the page when a new service worker takes over,
 * ensuring the user gets the latest version of the app.
 */
navigator.serviceWorker?.addEventListener("controllerchange", () => {
  window.location.reload();
});

/**
 * Render the React application.
 * Wraps the app with:
 * - BrowserRouter for client-side routing
 * - UserContextProvider for global state management
 */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>,
);
