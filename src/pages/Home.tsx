/**
 * @fileoverview Home page component that displays the main task dashboard.
 * Features include task statistics, greeting messages, and the main task list.
 */

import { useState, useEffect, ReactNode, useContext, useMemo, lazy, Suspense } from "react";
import {
  AddButton,
  GreetingHeader,
  GreetingText,
  Offline,
  ProgressPercentageContainer,
  StyledProgress,
  TaskCompletionText,
  TaskCountHeader,
  TaskCountTextContainer,
  TasksCount,
  TasksCountContainer,
} from "../styles";

import { getRandomGreeting } from "../utils";
import { Emoji } from "emoji-picker-react";
import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { AddRounded, TodayRounded, WifiOff } from "@mui/icons-material";
import { UserContext } from "../contexts/UserContext";
import { useResponsiveDisplay } from "../hooks/useResponsiveDisplay";
import { useNavigate } from "react-router-dom";
import { TaskProvider } from "../contexts/TaskProvider";

// Lazy load the TasksList component to improve initial page load performance
const TasksList = lazy(() =>
  import("../components/tasks/TasksList").then((module) => ({ default: module.TasksList })),
);

/**
 * Home page component that serves as the main dashboard for the todo application.
 * Displays user greeting, task completion statistics, and the list of tasks.
 * 
 * Features:
 * - Dynamic greeting message with emoji support
 * - Task completion progress indicator
 * - Tasks due today counter
 * - Responsive design for mobile and desktop
 * - Offline mode support
 * - Add task button
 * 
 * @returns {JSX.Element} The home page component
 */
const Home = () => {
  const { user } = useContext(UserContext);
  const { tasks, emojisStyle, settings, name } = user;
  const [randomGreeting, setRandomGreeting] = useState<string | ReactNode>("");
  const [greetingKey, setGreetingKey] = useState<number>(0);
  const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);

  const [tasksWithDeadlineTodayCount, setTasksWithDeadlineTodayCount] = useState<number>(0);
  const [tasksDueTodayNames, setTasksDueTodayNames] = useState<string[]>([]);

  /**
   * Calculate the percentage of completed tasks
   */
  const completedTaskPercentage = useMemo<number>(
    () => (completedTasksCount / tasks.length) * 100,
    [completedTasksCount, tasks.length],
  );

  const isOnline = useOnlineStatus();
  const n = useNavigate();
  const isMobile = useResponsiveDisplay();

  /**
   * Initialize the page with a random greeting and set the document title
   */
  useEffect(() => {
    setRandomGreeting(getRandomGreeting());
    document.title = "ToDoY";

    const interval = setInterval(() => {
      setRandomGreeting(getRandomGreeting());
      setGreetingKey((prevKey) => prevKey + 1); // Update the key on each interval
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Update task statistics whenever tasks change
   */
  useEffect(() => {
    const completedCount = tasks.filter((task) => task.done).length;
    setCompletedTasksCount(completedCount);

    const today = new Date().setHours(0, 0, 0, 0);

    const dueTodayTasks = tasks.filter((task) => {
      if (task.deadline) {
        const taskDeadline = new Date(task.deadline).setHours(0, 0, 0, 0);
        return taskDeadline === today && !task.done;
      }
      return false;
    });

    setTasksWithDeadlineTodayCount(dueTodayTasks.length);

    // Use Intl to format and display task names due today
    const taskNamesDueToday = dueTodayTasks.map((task) => task.name);
    setTasksDueTodayNames(taskNamesDueToday);
  }, [tasks]);

  /**
   * Replace emoji codes in a given text with Emoji components
   * 
   * @param {string} text The text to replace emoji codes in
   * @returns {ReactNode[]} An array of React nodes with emoji codes replaced
   */
  const replaceEmojiCodes = (text: string): ReactNode[] => {
    const emojiRegex = /\*\*(.*?)\*\*/g;
    const parts = text.split(emojiRegex);

    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // It's an emoji code, render Emoji component
        const emojiCode = part.trim();
        return <Emoji key={index} size={20} unified={emojiCode} emojiStyle={emojisStyle} />;
      } else {
        // It's regular text
        return part;
      }
    });
  };

  /**
   * Render a greeting message with emoji support
   * 
   * @param {string | ReactNode} text The greeting message to render
   * @returns {ReactNode} The rendered greeting message
   */
  const renderGreetingWithEmojis = (text: string | ReactNode) => {
    if (typeof text === "string") {
      return replaceEmojiCodes(text);
    } else {
      // It's already a ReactNode, no need to process
      return text;
    }
  };

  /**
   * Returns a greeting based on the current time.
   * 
   * @returns {string} The greeting message
   */
  const displayGreeting = (): string => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greeting: string;
    if (currentHour < 12 && currentHour >= 5) {
      greeting = "Good morning";
    } else if (currentHour < 18 && currentHour > 12) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }

    return greeting;
  };

  /**
   * Returns a task completion message based on the completion percentage.
   * 
   * @param {number} completionPercentage The completion percentage
   * @returns {string} The task completion message
   */
  const getTaskCompletionText = (completionPercentage: number): string => {
    switch (true) {
      case completionPercentage === 0:
        return "No tasks completed yet. Keep going!";
      case completionPercentage === 100:
        return "Congratulations! All tasks completed!";
      case completionPercentage >= 75:
        return "Almost there!";
      case completionPercentage >= 50:
        return "You're halfway there! Keep it up!";
      case completionPercentage >= 25:
        return "You're making good progress.";
      default:
        return "You're just getting started.";
    }
  };

  return (
    <>
      <GreetingHeader>
        <Emoji unified="1f44b" emojiStyle={emojisStyle} /> &nbsp; {displayGreeting()}
        {name && (
          <span translate="no">
            , <span>{name}</span>
          </span>
        )}
      </GreetingHeader>
      <GreetingText key={greetingKey}>{renderGreetingWithEmojis(randomGreeting)}</GreetingText>
      {!isOnline && (
        <Offline>
          <WifiOff /> You're offline but you can use the app!
        </Offline>
      )}
      {tasks.length > 0 && (
        <TasksCountContainer>
          <TasksCount glow={settings.enableGlow}>
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <StyledProgress
                variant="determinate"
                value={completedTaskPercentage}
                size={64}
                thickness={5}
                aria-label="Progress"
                glow={settings.enableGlow}
              />

              <ProgressPercentageContainer
                glow={settings.enableGlow && completedTaskPercentage > 0}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="white"
                  sx={{ fontSize: "16px", fontWeight: 600 }}
                >{`${Math.round(completedTaskPercentage)}%`}</Typography>
              </ProgressPercentageContainer>
            </Box>
            <TaskCountTextContainer>
              <TaskCountHeader>
                {completedTasksCount === 0
                  ? `You have ${tasks.length} task${tasks.length > 1 ? "s" : ""} to complete.`
                  : `You've completed ${completedTasksCount} out of ${tasks.length} tasks.`}
              </TaskCountHeader>
              <TaskCompletionText>
                {getTaskCompletionText(completedTaskPercentage)}
              </TaskCompletionText>
              {tasksWithDeadlineTodayCount > 0 && (
                <span
                  style={{
                    opacity: 0.8,
                    display: "inline-block",
                  }}
                >
                  <TodayRounded sx={{ fontSize: "20px", verticalAlign: "middle" }} />
                  &nbsp;Tasks due today:&nbsp;
                  <span translate="no">
                    {new Intl.ListFormat("en", { style: "long" }).format(tasksDueTodayNames)}
                  </span>
                </span>
              )}
            </TaskCountTextContainer>
          </TasksCount>
        </TasksCountContainer>
      )}
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        }
      >
        <TaskProvider>
          <TasksList />
        </TaskProvider>
      </Suspense>
      {!isMobile && (
        <Tooltip title={tasks.length > 0 ? "Add New Task" : "Add Task"} placement="left">
          <AddButton
            animate={tasks.length === 0}
            glow={settings.enableGlow}
            onClick={() => n("add")}
            aria-label="Add Task"
          >
            <AddRounded style={{ fontSize: "44px" }} />
          </AddButton>
        </Tooltip>
      )}
    </>
  );
};

export default Home;
