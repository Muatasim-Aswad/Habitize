import AppError from "../util/AppError.js";
import User from "../models/User.js";
import Habit from "../models/Habit.js";
import CheckIn from "../models/CheckIn.js";

export async function authorize(req, res, next) {
  try {
    const id = req.session.user_id.toString();

    if (req.params.userId) {
      const { userId } = req.params;
      if (userId !== id)
        throw new AppError(401, "Unauthorized", `id: ${id} !== ${userId}`);

      const user = await User.findById(id);
      if (!user) throw new AppError(404, "Not found", `user ${id} not found`);

      req.user = user;
    }

    if (req.params.habitId) {
      const { habitId } = req.params;
      if (habitId.length !== 24)
        throw new AppError(
          400,
          "Bad Request",
          `habitId: ${habitId} is not a valid mongo object id`,
        );

      const habit = await Habit.findById(habitId);
      if (!habit)
        throw new AppError(404, "Not found", `habit ${habitId} not found`);

      if (habit.user_id.toString() !== id)
        throw new AppError(
          401,
          "Unauthorized",
          `habit ${habitId} does not belong to user ${id}`,
        );

      req.habit = habit;
    }

    if (req.params.checkInId) {
      const { checkInId } = req.params;
      if (checkInId.length !== 24)
        throw new AppError(
          400,
          "Bad Request",
          `checkInId: ${checkInId} is not a valid mongo object id`,
        );

      const checkIn = await CheckIn.findById(checkInId);
      if (!checkIn)
        throw new AppError(404, "Not found", `checkIn ${checkInId} not found`);

      const habit = await Habit.findById(checkIn.habit_id);

      if (habit.user_id.toString() !== id)
        throw new AppError(
          401,
          "Unauthorized",
          `checkIn ${checkInId} does not belong to user ${id}`,
        );

      req.checkIn = checkIn;
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default authorize;
