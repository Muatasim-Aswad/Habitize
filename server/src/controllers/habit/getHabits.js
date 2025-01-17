import Habit from "../../models/Habit.js";
import AppError from "../../util/AppError.js";
import findOrCreateCheckIn from "../../models/servicesDB/findOrCreateCheckIn.js";

const getHabits = async (req, res, next) => {
  try {
    let { date } = req.query;
    if (!date || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      throw new AppError(400, "Invalid date format. Please use 'YYYY-MM-DD'.");
    }

    date = new Date(date).setHours(0, 0, 0, 0);

    const searchOptions = {
      user_id: req.session.user_id,
      "period.start": { $lte: date },
      "period.end": { $gte: date },
    };
    if (req.query.name) {
      searchOptions.name = { $regex: new RegExp(req.query.name, "i") };
    }

    let habits = await Habit.find(searchOptions);

    habits = await Promise.all(
      habits.map(async (habit) => {
        const checkIn = await findOrCreateCheckIn(date, habit);

        return {
          ...habit._doc,
          checkIn,
        };
      }),
    );

    res.status(200).json({
      success: true,
      message: "Habits details retrieved successfully.",
      count: habits.length,
      habits,
    });
  } catch (error) {
    next(error);
  }
};

export default getHabits;
