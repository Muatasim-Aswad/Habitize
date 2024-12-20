import { User } from "../../models/User.js";
import AppError from "../../util/AppError.js";
import hash12 from "../../util/hash12.js";

const createUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body.fullUser;

    const userExists = await User.exists({ email });
    if (userExists) {
      throw new AppError(
        400,
        `User with email ${email} already exists. Please use a different email.`, //is it secure to give info about another user?
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
