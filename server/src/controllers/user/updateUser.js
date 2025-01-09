import AppError from "../../util/AppError.js";
import hash12 from "../../util/hash12.js";

const updateUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body.user;

    let updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = await hash12(password);

    const { user } = req;
    const result = await user.updateOne(updatedFields);
    if (!result || result.nModified === 0) {
      throw new AppError(
        500,
        "Internal Server Error",
        "Failed to update user.",
      );
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: { name, email, id: req.user.id },
    });

    next();
  } catch (error) {
    next(error);
  }
};

export default updateUser;
