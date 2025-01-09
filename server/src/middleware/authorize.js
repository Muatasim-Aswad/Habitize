import AppError from "../util/AppError.js";
import User from "../models/User.js";

export async function authorize(req, res, next) {
  try {
    const id = req.session.user_id.toString();

    if (req.params.userId) {
      const { userId } = req.params;
      if (userId !== id)
        throw new AppError(401, "Unauthorized", `id: ${id} !== ${userId}`);

      const user = await User.findById(id);
      if (!user) throw new AppError(404, "Not found", `user ${id} not found`);

      req.user = user;
    }

    next();
  } catch (error) {
    next(error);
  }
}

export default authorize;
