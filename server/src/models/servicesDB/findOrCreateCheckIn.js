import CheckIn from "../CheckIn.js"; // Assuming the file is in /models folder

export const MS_PER_DAY = 1000 * 60 * 60 * 24;
/**
 * getOrCreateCheckIn - Fetches or creates a CheckIn record for a habit on a specific date.
 *
 * @param {String} habit_id - The ID of the habit.
 * @param {Date} date - The date for which the check-in is needed.
 * @param {Object} habit - The habit object, containing period and goal data.
 * @returns {Object} - The found or created CheckIn record.
 */
const findOrCreateCheckIn = async (date, habit) => {
  const { _id: habitId } = habit;

  // Look for an existing CheckIn that matches the habit_id and date within start_date and end_date
  const existingCheckIn = await CheckIn.findOne({
    habit_id: habitId,
    start_date: { $lte: date },
    end_date: { $gte: date },
  });
  if (existingCheckIn) return existingCheckIn; // Return if found

  const habitStartDate = new Date(habit.period.start);
  habitStartDate.setHours(0, 0, 0, 0);

  const periodLength = getPeriodLength(habit.goal.frequency); // Calculate period length from the habit goal's frequency
  const periodStart = calculatePeriodStart(habitStartDate, date, periodLength); // Calculate the period start date
  const periodEnd = calculatePeriodEnd(periodStart, periodLength); // Calculate the period end date

  // Create a new CheckIn record and return it
  return await CheckIn.create({
    habit_id: habitId,
    start_date: periodStart,
    end_date: periodEnd,
    times_done: 0, // Default times_done to 0
  });
};

/**
 * getPeriodLength - Determines the period length (in days) based on the habit frequency.
 *
 * @param {String} frequency - The frequency of the habit ("daily", "weekly", "monthly", or "yearly").
 * @returns {Number} - The length of the period in days.
 */
export const getPeriodLength = (frequency) => {
  switch (frequency) {
    case "daily":
      return 1;
    case "weekly":
      return 7;
    case "monthly":
      return 30;
    case "yearly":
      return 365;
    default:
      throw new Error("Invalid frequency provided.");
  }
};

/**
 * calculatePeriodStart - Calculates the start date for the check-in period.
 *
 * @param {Date} startDate - The start date of the habit.
 * @param {Date} wantedDate - The current date.
 * @param {Number} periodLength - The length of the period in days.
 * @returns {Date} - The calculated period start date.
 */
const calculatePeriodStart = (startDate, wantedDate, periodLength) => {
  const daysSinceStart = Math.floor((wantedDate - startDate) / MS_PER_DAY);
  const periodsDone = Math.floor(daysSinceStart / periodLength);
  const daysDone = periodsDone * periodLength;

  const periodStart = new Date(startDate.getTime() + daysDone * MS_PER_DAY);
  periodStart.setHours(0, 0, 0, 0);

  return periodStart;
};

/**
 * calculatePeriodEnd - Calculates the end date for the check-in period.
 *
 * @param {Date} periodStart - The start date of the period.
 * @param {Number} periodLength - The length of the period in days.
 * @returns {Date} - The calculated period end date.
 */
const calculatePeriodEnd = (periodStart, periodLength) => {
  return new Date(
    periodStart.getTime() + (periodLength - 1) * MS_PER_DAY,
  ).setHours(23, 59, 59, 999);
};

export default findOrCreateCheckIn;
