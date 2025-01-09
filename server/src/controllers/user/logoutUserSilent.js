import Session from "../../models/Session.js";
import AppError from "../../util/AppError.js";

const logoutUserSilent = async (req, res, next) => {
  try {
    const { user_id } = req.session;

    const result = await Session.deleteMany({ user_id });
    if (!result || result.deletedCount === 0) {
      throw new AppError(
        500,
        "Internal Server Error",
        "Failed to logout user.",
      );
    }
  } catch (error) {
    next(error);
  }
};

export default logoutUserSilent;
