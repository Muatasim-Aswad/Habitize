import { User } from "../../models/User.js";
import AppError from "../../util/AppError.js";
import hash12 from "../../util/hash12.js";

const createUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body.user;

    const userExists = await User.exists({ email });
    if (userExists) {
      throw new AppError(
        400,
        "Invalid input or Email already in use.",
        `${email} is already in use.`,
      );
    }

    password = await hash12(password);

    const { createdAt } = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: { name, email, createdAt },
    });
  } catch (error) {
    next(error);
  }
};

export default createUser;
