/**
 * Message templates for different frequencies and progress levels
 */
const messageTemplates = {
  daily: {
    start: { message: "Ready to start your day! 🌅", threshold: 0 },
    firstStep: { message: "First step of the day! 🎯", threshold: 1 },
    quarter: { message: "Good rhythm today! 🎵", threshold: 25 },
    halfway: { message: "Halfway through the day! 💫", threshold: 50 },
    almostThere: { message: "Almost done with today! 🌟", threshold: 75 },
    complete: { message: "Perfect day achieved! ⭐️", threshold: 100 },
    overachieve: { message: "Daily superstar! 🌟", threshold: 101 },
    progress: { message: "Keep today’s momentum going! 💪", threshold: 2 },
  },
  weekly: {
    start: { message: "New week, new goals! 📆", threshold: 0 },
    firstWin: { message: "Great start this week! 🌱", threshold: 1 },
    twoWins: {
      message: "Two steps forward this week! ⚡️",
      threshold: 20,
    },
    quarter: { message: "Nice weekly progress! 🎵", threshold: 25 },
    threeWins: { message: "Midweek fire! 🔥", threshold: 40 },
    halfway: { message: "Halfway through the week! 💫", threshold: 50 },
    fourWins: { message: "Unstoppable this week! ⚡️", threshold: 60 },
    almostThere: { message: "Close to a perfect week! 🌟", threshold: 75 },
    fiveWins: { message: "Exceptional this week! 🏃", threshold: 90 },
    complete: { message: "Legendary week accomplished! 🏆", threshold: 100 },
    overachieve: { message: "Above and beyond this week! 👑", threshold: 101 },
    progress: { message: "Stay steady this week! 💪", threshold: 2 },
  },
  monthly: {
    start: { message: "Fresh month ahead! 🌙", threshold: 0 },
    firstWeek: { message: "Strong month start! 🌱", threshold: 1 },
    quarter: { message: "A milestone in the month! 🎯", threshold: 25 },
    oneThird: { message: "Building monthly momentum! ⚡️", threshold: 33 },
    halfway: { message: "Halfway through the month! 🦸", threshold: 50 },
    twoThirds: { message: "Crushing it this month! 💥", threshold: 66 },
    almostThere: { message: "Final stretch this month! 🚀", threshold: 75 },
    ninetyPercent: { message: "Nearing monthly excellence! ✨", threshold: 90 },
    complete: { message: "Monthly master achieved! 🌟", threshold: 100 },
    overachieve: { message: "Legendary month! 👑", threshold: 101 },
    progress: { message: "Keep consistent this month! 💪", threshold: 2 },
  },
  yearly: {
    start: { message: "Year of growth begins! 🌱", threshold: 0 },
    firstMonth: { message: "First step of the year! 🎯", threshold: 1 },
    quarter1: { message: "Yearly Quarter accomplished! 🎉", threshold: 25 },
    oneThird: { message: "One-third through the year! 🏗️", threshold: 33 },
    halfway: { message: "Halfway through the year! 🏆", threshold: 50 },
    twoThirds: {
      message: "Great Year! Determination wins! 💫",
      threshold: 66,
    },
    quarter3: { message: "Near the year’s finish line! 🌟", threshold: 75 },
    tenMonths: { message: "Outstanding year! ⭐️", threshold: 83 },
    almostThere: { message: "Final hit this year! 🎯", threshold: 90 },
    complete: { message: "Yearly legend! 👑", threshold: 100 },
    overachieve: {
      message: "Beyond legendary for the year! 🌠",
      threshold: 101,
    },
    progress: { message: "Think big this year! 💪", threshold: 2 },
  },
};

/**
 * Calculate progress percentage
 * @param {number} timesDone - Current count
 * @param {number} goal - Target count
 * @returns {number} Progress percentage
 */
const calculateProgress = (timesDone, goal) => {
  if (goal === 0) return 0;
  return (timesDone / goal) * 100;
};

/**
 * Get appropriate message based on progress and frequency
 * @param {number} timesDone - Current count
 * @param {number} goal - Target count
 * @param {string} frequency - Habit frequency (daily, weekly, monthly, yearly)
 * @returns {string} Motivational message
 */
export const getMotivationalMessage = (timesDone, goal, frequency) => {
  const freq = frequency?.toLowerCase() || "daily";
  const progress = calculateProgress(timesDone, goal);
  const templates = messageTemplates[freq];

  if (!templates) {
    return "Keep it up! 💪";
  }

  // Handle overachievement
  if (timesDone > goal && templates.overachieve) {
    return `${templates.overachieve.message} (${timesDone}x)`;
  }

  // Check progress thresholds in descending order
  const sortedTemplates = Object.values(templates).sort(
    (a, b) => b.threshold - a.threshold,
  );

  for (const template of sortedTemplates) {
    if (progress >= template.threshold) {
      return template.message;
    }
  }

  return templates.progress.message;
};

/**
 * Get all available messages for a frequency
 * @param {string} frequency - Habit frequency
 * @returns {Object} Available messages for the frequency
 */
export const getAvailableMessages = (frequency) => {
  const freq = frequency?.toLowerCase() || "daily";
  return messageTemplates[freq] || {};
};

/**
 * Add custom message template
 * @param {string} frequency - Habit frequency
 * @param {string} key - Message key
 * @param {Object} template - Message template with message and threshold
 */
export const addMessageTemplate = (frequency, key, template) => {
  const freq = frequency?.toLowerCase();
  if (!messageTemplates[freq]) {
    messageTemplates[freq] = {};
  }
  messageTemplates[freq][key] = template;
};
