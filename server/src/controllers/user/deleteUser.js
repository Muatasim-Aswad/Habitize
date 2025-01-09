import AppError from "../../util/AppError.js";

const deleteUser = async (req, res, next) => {
  try {
    const { user } = req;

    const result = await user.deleteOne();
    if (!result || result.deletedCount === 0) {
      throw new AppError(
        500,
        "Internal Server Error",
        "Failed to delete user.",
      );
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
