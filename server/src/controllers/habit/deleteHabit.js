import AppError from "../../util/AppError.js";

const deleteHabit = async (req, res, next) => {
  try {
    const { habit } = req;

    const result = await habit.deleteOne();
    if (!result || result.deletedCount === 0) {
      throw new AppError(
        500,
        "Internal Server Error",
        "Failed to delete habit.",
      );
    }

    res.status(200).json({
      success: true,
      message: "Habit deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteHabit;
