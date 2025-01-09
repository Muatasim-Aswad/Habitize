import jwt from "jsonwebtoken";
import { SECRET } from "../util/generateJWT.js";
import AppError from "../util/AppError.js";
import Session from "../models/Session.js";

export async function authenticate(req, res, next) {
  try {
    if (!req.headers.authorization)
      throw new AppError(401, "Unauthorized", "No authorization header");

    const [scheme, token] = req.headers.authorization.split(" ");
    if (scheme !== "Bearer" || !token)
      throw new AppError(401, "Unauthorized", "Invalid authorization header");

    const { id, createdAt } = jwt.verify(token, SECRET);
    if (!id || !createdAt)
      throw new AppError(
        401,
        "Unauthorized",
        `missing information: id: ${id}, createdAt: ${createdAt}`,
      );

    const activeSession = await Session.findOne({ user_id: id, createdAt });
    if (!activeSession)
      throw new AppError(401, "Token expired", "User logged out");
    req.session = activeSession;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError(401, "Token expired", error.message));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new AppError(401, "Unauthorized", error.message));
    }

    next(error);
  }
}

export default authenticate;
