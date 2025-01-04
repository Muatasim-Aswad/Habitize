import jwt from "jsonwebtoken";
import { SECRET } from "../util/generateJWT.js";
import AppError from "../util/AppError.js";

export function authenticateJWT(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError(400, "Missing information", "No Token");

    const { id } = jwt.verify(token, SECRET);
    if (!id) throw new AppError(401, "Unauthorized", "Token without ID");

    req.id = id;
    next();
  } catch (error) {
    if (!error.isOperational)
      return next(new AppError(401, "Unauthorized", error.message));

    next(error);
  }
}

export default authenticateJWT;
