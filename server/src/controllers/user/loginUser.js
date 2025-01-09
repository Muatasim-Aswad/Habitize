import AppError from "../../util/AppError.js";
import generateJWT from "../../util/generateJWT.js";
import bcrypt from "bcrypt";
import User from "../../models/User.js";
import Session from "../../models/Session.js";

const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body.user;

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(
        401,
        "Invalid Email or Password", // Message for the client
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

    const { _id: id, name } = user;
    const { createdAt } = await Session.create({ user_id: id });
    const token = generateJWT({ id, createdAt });

    res.status(200).json({
      success: true,
      message: "Sign-in successful",
      user: { id, name, email },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
