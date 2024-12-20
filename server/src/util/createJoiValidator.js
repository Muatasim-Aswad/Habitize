import AppError from "./AppError.js";

const createJoiValidator = (
  schema,
  customOptions = {},
  options = {
    abortEarly: false,
    convert: false,
    errorClientMessage: false,
    errorStatusCode: 400,
  },
) => {
  options = { ...options, ...customOptions };

  return (obj) => {
    const { error, value } = schema.validate(obj, options);

    if (error) {
      const httpStatusCode = options.errorStatusCode;
      const clientMessage = options.errorClientMessage
        ? "Provided object does not match the required."
        : null;

      const message = [
        ...new Set(
          error.details.map((err) =>
            err.message.includes("is not allowed")
              ? "The provided object contains fields that are not allowed."
              : err.message,
          ),
        ),
      ].join(" ");

      throw new AppError(httpStatusCode, clientMessage, message);
    }

    return value;
  };
};

export default createJoiValidator;
