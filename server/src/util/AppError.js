class AppError extends Error {
  constructor(statusCode, clientMessage, message) {
    if (!message) {
      message = clientMessage;
    }

    super(message);

    if (statusCode) this.statusCode = statusCode;

    if (clientMessage) this.clientMessage = clientMessage;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
