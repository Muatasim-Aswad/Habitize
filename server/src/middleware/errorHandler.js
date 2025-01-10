import { logError } from "../util/logging.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = err.statusCode
    ? err.clientMessage || err.message
    : "Internal Server Error";

  logError(err);

  res.status(statusCode).json({ success: false, message });
  next();
};

export default errorHandler;
