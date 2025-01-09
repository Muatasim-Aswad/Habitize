import AppError from "../../util/AppError.js";

const logoutUser = async (req, res, next) => {
  try {
    const { session } = req;

    const result = await session.deleteOne();
    if (!result || result.deletedCount === 0) {
      throw new AppError(
        500,
        "Internal Server Error",
        "Failed to logout user.",
      );
    }

    res.status(200).json({
      success: true,
      message: "User logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default logoutUser;
