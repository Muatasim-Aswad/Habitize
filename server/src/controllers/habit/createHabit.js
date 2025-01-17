import Habit from "../../models/Habit.js";
import AppError from "../../util/AppError.js";

const createHabit = async (req, res, next) => {
  try {
    const { user_id } = req.session;
    const { habit } = req.body;

    const habitExists = await Habit.exists({ name: habit.name, user_id });
    if (habitExists)
      throw new AppError(
        400,
        `Habit with name: ${habit.name}, already exists.`,
      );

    habit.user_id = user_id;
    const result = await Habit.create(habit);

    res.status(201).json({
      success: true,
      message: "Habit created successfully.",
      habit: result,
    });
  } catch (error) {
    next(error);
  }
};

export default createHabit;
