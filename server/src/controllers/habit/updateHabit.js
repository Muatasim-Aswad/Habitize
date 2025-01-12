import AppError from "../../util/AppError.js";

const updateHabit = async (req, res, next) => {
  try {
    const updates = req.body.habit;

    const { habit } = req;
    const result = await habit.updateOne(updates);
    if (!result || result.nModified === 0) {
      throw new AppError(
        500,
        "Internal Server Error",
        "Failed to update habit.",
      );
    }

    res.status(200).json({
      success: true,
      message: "Habit updated successfully.",
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default updateHabit;
