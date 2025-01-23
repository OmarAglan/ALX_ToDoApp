/**
 * @fileoverview Application routing configuration using React Router.
 * Implements lazy loading for all routes to optimize initial bundle size.
 */

import { ReactElement, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "./components";

// Lazy load all page components to improve initial load performance
const Home = lazy(() => import("./pages/Home"));
const TaskDetails = lazy(() => import("./pages/TaskDetails"));
const SharePage = lazy(() => import("./pages/Share"));
const AddTask = lazy(() => import("./pages/AddTask"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Transfer = lazy(() => import("./pages/Transfer"));
const Categories = lazy(() => import("./pages/Categories"));
const Purge = lazy(() => import("./pages/Purge"));
const NotFound = lazy(() => import("./pages/NotFound"));

/**
 * Main router component that defines all application routes.
 * Uses React.Suspense for lazy loading with a loading fallback.
 * 
 * Available routes:
 * - / : Home page with task list
 * - /task/:id : Individual task details
 * - /share : Share tasks functionality
 * - /add : Add new task
 * - /user : User profile and settings
 * - /transfer : Data transfer functionality
 * - /categories : Task categories management
 * - /purge : Data cleanup functionality
 * - * : 404 Not Found page
 * 
 * @returns {ReactElement} Router component with defined routes
 */
const AppRouter = (): ReactElement => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/purge" element={<Purge />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
