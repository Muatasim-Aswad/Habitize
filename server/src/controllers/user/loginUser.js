import { User } from "../../models/User.js";
import AppError from "../../util/AppError.js";
import bcrypt from "bcrypt";

const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body.user;
    // password = await hash12(password);

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(
        401,
        "Invalid email or password", // Message for the client
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

    res.status(200).json({
      success: true,
      message: "Sign-in successful",
      user: { id: user._id, name: user.name, email: user.email },
    });

    //to do: complete logging logic, if authenticated create a session
  } catch (error) {
    next(error);
  }
};

export default loginUser;
