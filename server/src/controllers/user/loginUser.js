import AppError from "../../util/AppError.js";
import generateJWT from "../../util/generateJWT.js";
import bcrypt from "bcrypt";
import User from "../../models/User.js";

const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body.user;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(
        401,
        "Invalid Email or password", // Message for the client
        `User with email ${email} does not exist`, // Message for the backend log
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError(
        401,
        "Invalid email or password",
        `Incorrect password for user with email ${email}`,
      );
    }

    const token = generateJWT({ id: user.id });

    res.status(200).json({
      success: true,
      message: "Sign-in successful",
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
