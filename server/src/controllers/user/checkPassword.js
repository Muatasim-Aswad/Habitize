import AppError from "../../util/AppError.js";
import bcrypt from "bcrypt";

const checkPassword = async (req, res, next) => {
  try {
    let { password } = req.body.user;

    const { user } = req;

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError(400, "Bad Request", "Password is incorrect");
    }

    res.status(200).json({
      success: true,
      message: "Password is correct",
    });
  } catch (error) {
    next(error);
  }
};

export default checkPassword;
