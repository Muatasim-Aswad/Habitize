import jwt from "jsonwebtoken";
import { SECRET } from "../util/generateJWT.js";
import AppError from "../util/AppError.js";

export function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        401,
        "Authentication required",
        "No token provided or invalid token format",
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, SECRET);

      if (!decoded.id) {
        throw new AppError(401, "Unauthorized", "Token without ID");
      }

      // Store all decoded token information
      req.user = decoded;
      req.id = decoded.id;

      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        throw new AppError(401, "Invalid token", error.message);
      } else if (error.name === "TokenExpiredError") {
        throw new AppError(401, "Token expired", error.message);
      }
      throw error;
    }
  } catch (error) {
    if (!error.isOperational) {
      return next(new AppError(401, "Unauthorized", error.message));
    }
    next(error);
  }
}

export default authenticateJWT;
