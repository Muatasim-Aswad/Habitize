import createJoiValidator from "./createJoiValidator.js";

const createValidatorMiddleware = (schema) => {
  // Sync Validation (Abort Early, default)
  const validate = createJoiValidator(schema);

  return (req, res, next) => {
    try {
      validate(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default createValidatorMiddleware;
