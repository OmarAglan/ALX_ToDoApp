const recentGreetings: Set<number> = new Set();
export const maxRecentGreetings = 8; // Number of recent greetings to track

const hoursLeft = 24 - new Date().getHours();

const greetingsText: string[] = [
  "Ready for a productive adventure! **1f680**",
  "Time to make your mark on today's tasks!",
  "Your journey to success starts with a single task **1f3c1**",
  "Transform your ideas into achievements **2728**",
  "ALX Todo: Where productivity meets creativity! **1f3a8**",
  "Craft your success story, one task at a time **1f4d6**",
  "Navigate your day with purpose **1f9ed**",
  "Design your day, shape your future **1f4aa**",
  "Your personal mission control center **1f6f8**",
  "Unlock new levels of productivity **1f511**",
  "Turn your vision into reality **1f52e**",
  "Master your tasks, master your destiny **2b50**",
  "Innovate your daily routine **1f4a1**",
  "Your productivity journey awaits **1f30f**",
  "Mission control: Task management **1f680**",
  "Ready to conquer your task universe! **1f31f**",
  "Your daily achievement hub **1f3c6**",
  "Elevate your productivity game **1f3c0**",
  "Command center: Task edition **1f4bb**",
  "Transforming todos into triumphs! **1f3c6**",
  `Welcome to ${new Date().toLocaleDateString("en", {
    weekday: "long",
  })} adventures!`,
  `${new Date().toLocaleDateString("en", {
    month: "long",
  })}: Your month of extraordinary achievements!`,
  hoursLeft > 4
    ? `${hoursLeft} hours of potential ahead. Make them extraordinary!`
    : `Final countdown: ${hoursLeft} hours to shine!`,
];

/**
 * Returns a random greeting message to inspire productivity.
 * @returns {string} A random greeting message with optional emoji code.
 */
export const getRandomGreeting = (): string => {
  // Function to get a new greeting that hasn't been used recently
  const getUniqueGreeting = (): string => {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * greetingsText.length);
    } while (recentGreetings.has(randomIndex));

    // Update recent greetings
    recentGreetings.add(randomIndex);
    if (recentGreetings.size >= maxRecentGreetings) {
      recentGreetings.clear();
    }

    return greetingsText[randomIndex];
  };

  return getUniqueGreeting();
};
