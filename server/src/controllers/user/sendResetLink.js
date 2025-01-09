import Session from "../../models/Session.js";
import { User } from "../../models/User.js";
import AppError from "../../util/AppError.js";
import createResetPasswordEmail from "../../util/createResetPasswordEmail.js";
import generateJWT from "../../util/generateJWT.js";
import sendEmail from "../../util/sendEmail.js";

const sendResetLink = async (req, res, next) => {
  try {
    let { email } = req.body.user;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(
        404,
        "Not found",
        `User with email ${email} not found.`,
      );
    }

    const { _id: id, name } = user;
    const { createdAt } = await Session.create({ user_id: id });
    const token = generateJWT({ id, createdAt }, "15m");
    const link = `https://c49-group-a.hackyourfuture.tech/create-password?token=${token}&id=${id}`;

    const message = createResetPasswordEmail(link, name, email);

    await sendEmail(email, "Reset Your Password", message);

    res.status(200).json({
      success: true,
      message: "Reset link sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export default sendResetLink;
