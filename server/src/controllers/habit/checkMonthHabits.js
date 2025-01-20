import Habit from "../../models/Habit.js";
import AppError from "../../util/AppError.js";

const checkMonthHabits = async (req, res, next) => {
  try {
    let { month, year } = req.query;

    // Validate month and year
    if (!month || !year || isNaN(month) || isNaN(year)) {
      throw new AppError(
        400,
        "Invalid month or year. Please provide valid numbers.",
      );
    }

    month = parseInt(month, 10);
    year = parseInt(year, 10);

    if (month < 1 || month > 12) {
      throw new AppError(400, "Month must be between 1 and 12.");
    }

    // Get the number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();

    // Initialize the result object
    const days = {};
    for (let day = 1; day <= daysInMonth; day++) {
      days[day] = false;
    }

    // Search for habits within the specified month and year
    const startDate = new Date(year, month - 1, 1); // First day of the month
    const endDate = new Date(year, month - 1, daysInMonth, 23, 59, 59); // Last day of the month

    const habits = await Habit.find({
      user_id: req.session.user_id,
      $or: [
        {
          "period.start": { $lte: endDate },
          "period.end": { $gte: startDate },
        },
      ],
    });

    // Mark days with habits as true
    habits.forEach((habit) => {
      const habitStart = new Date(habit.period.start);
      const habitEnd = new Date(habit.period.end);

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);

        if (currentDate >= habitStart && currentDate <= habitEnd) {
          days[day] = true;
        }
      }
    });

    // Respond with the result
    res.status(200).json({
      month: month.toString().padStart(2, "0"),
      year: year.toString(),
      days,
    });
  } catch (error) {
    next(error);
  }
};

export default checkMonthHabits;
