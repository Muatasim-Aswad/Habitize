/**
 * Message templates for different frequencies and progress levels
 */
const messageTemplates = {
  daily: {
    start: { message: "Ready to start! 🌱", threshold: 0 },
    firstStep: { message: "First step taken! 🎯", threshold: 1 },
    quarter: { message: "Good rhythm! 🎵", threshold: 25 },
    halfway: { message: "Halfway there! 💫", threshold: 50 },
    almostThere: { message: "Almost done! 🌟", threshold: 75 },
    complete: { message: "Perfect day! ⭐️", threshold: 100 },
    overachieve: { message: "Superstar! 🌟", threshold: 101 },
    progress: { message: "Keep the momentum! 💪", threshold: 2 },
  },
  weekly: {
    start: { message: "New week, new goals! 🎯", threshold: 0 },
    firstWin: { message: "Great start! 🌱", threshold: 1 },
    twoWins: { message: "Building momentum! ⚡️", threshold: 20 },
    quarter: { message: "Nice progress! 🎵", threshold: 25 },
    threeWins: { message: "You're on fire! 🔥", threshold: 40 },
    halfway: { message: "Halfway champion! 💫", threshold: 50 },
    fourWins: { message: "Unstoppable! ⚡️", threshold: 60 },
    almostThere: { message: "So close! 🌟", threshold: 75 },
    fiveWins: { message: "Exceptional! 🏃", threshold: 90 },
    complete: { message: "Legendary week! 🏆", threshold: 100 },
    overachieve: { message: "Beyond amazing! 👑", threshold: 101 },
    progress: { message: "Stay strong! 💪", threshold: 2 },
  },
  monthly: {
    start: { message: "Fresh month ahead! 📅", threshold: 0 },
    firstWeek: { message: "Strong start! 🌱", threshold: 1 },
    quarter: { message: "First milestone! 🎯", threshold: 25 },
    oneThird: { message: "Gaining momentum! ⚡️", threshold: 33 },
    halfway: { message: "Halfway hero! 🦸", threshold: 50 },
    twoThirds: { message: "Keep crushing it! 💥", threshold: 66 },
    almostThere: { message: "Final push! 🚀", threshold: 75 },
    ninetyPercent: { message: "Excellence achieved! ✨", threshold: 90 },
    complete: { message: "Monthly master! 🌟", threshold: 100 },
    overachieve: { message: "Legendary status! 👑", threshold: 101 },
    progress: { message: "Stay consistent! 💪", threshold: 2 },
  },
  yearly: {
    start: { message: "Year of growth! 🌱", threshold: 0 },
    firstMonth: { message: "Journey begun! 🎯", threshold: 1 },
    quarter1: { message: "First quarter done! 🎉", threshold: 25 },
    oneThird: { message: "Building success! 🏗️", threshold: 33 },
    halfway: { message: "Halfway champion! 🏆", threshold: 50 },
    twoThirds: { message: "Determination wins! 💫", threshold: 66 },
    quarter3: { message: "Final quarter! 🎯", threshold: 75 },
    tenMonths: { message: "Outstanding year! ⭐️", threshold: 83 },
    almostThere: { message: "Victory ahead! 🌟", threshold: 90 },
    complete: { message: "Yearly legend! 👑", threshold: 100 },
    overachieve: { message: "Beyond legendary! 🌠", threshold: 101 },
    progress: { message: "Think long-term! 💪", threshold: 2 },
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
