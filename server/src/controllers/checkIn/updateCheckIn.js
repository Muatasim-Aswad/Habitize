import AppError from "../../util/AppError.js";

const updateCheckIn = async (req, res, next) => {
  try {
    const updates = req.body.checkIn;

    const { checkIn } = req;
    const result = await checkIn.updateOne(updates);
    if (!result || result.nModified === 0) {
      throw new AppError(
        500,
        "Internal Server Error",
        "Failed to update check-in.",
      );
    }

    res.status(200).json({
      success: true,
      message: "check-in updated successfully.",
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default updateCheckIn;
