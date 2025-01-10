import Habit from "../../models/Habit.js";
import CheckIn from "../../models/checkIn.js";
import {
  getPeriodLength,
  MS_PER_DAY,
} from "../../models/servicesDB/findOrCreateCheckIn.js";

// Helper function to calculate periods
const calculatePeriods = (startDate, endDate, periodLength) => {
  const totalPeriods = Math.ceil(
    (endDate - startDate) / (MS_PER_DAY * periodLength),
  );
  return totalPeriods;
};

// Helper function to calculate percentages
const percentage = (numerator, denominator) => {
  return denominator === 0 ? 0 : Math.round((numerator / denominator) * 100);
};

// Helper function to calculate habit progress
const calculateHabitProgress = async (habit) => {
  const checkIns = await CheckIn.find({ habit_id: habit._id });

  const target = habit.goal.number;
  const period = getPeriodLength(habit.goal.frequency);
  const startDate = new Date(habit.period.start);
  const endDate = new Date(habit.period.end);

  const totalPeriods = calculatePeriods(startDate, endDate, period);
  const donePeriods = checkIns.length;

  const checkedIn = checkIns.reduce(
    (acc, checkIn) => acc + checkIn.times_done,
    0,
  );

  const toTodaySuccessPercentage = percentage(checkedIn, donePeriods * target);
  const overallProgressPercentage = percentage(
    checkedIn,
    totalPeriods * target,
  );

  return {
    toTodaySuccessPercentage,
    overallProgressPercentage,
    _id: habit._id,
    name: habit.name,
    icon: habit.icon,
    target: `${target} ${habit.goal.unit} ${habit.goal.frequency}`,
    achieved: `${checkedIn} ${habit.goal.unit}`,
    age: `${donePeriods * period} days`,
    expectedLife: `${totalPeriods * period} days`,
  };
};

// Main handler function
const getHabitsProgress = async (req, res, next) => {
  try {
    const searchOptions = {
      user_id: req.session.user_id,
    };

    let habits = await Habit.find(searchOptions);

    habits = await Promise.all(habits.map(calculateHabitProgress));

    res.status(200).json({
      success: true,
      message: "Habits progress details retrieved successfully.",
      note: "The progress is calculated by comparing the number of check-ins to the target during the whole period -not per cycle.",
      count: habits.length,
      habits,
    });
  } catch (error) {
    next(error);
  }
};

export default getHabitsProgress;
