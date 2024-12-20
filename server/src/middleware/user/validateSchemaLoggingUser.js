import Joi from "joi";
import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";
import { userJoiSchema } from "../../models/User.js";
import adaptJoiSchema from "../../util/adaptJoiSchema.js";

//the final obj should look like this: user: email, password

const loggingUserSchema = adaptJoiSchema(userJoiSchema, {
  forbidFields: ["name"],
});

const loggingUserParentSchema = Joi.object({
  user: loggingUserSchema.required().messages({
    "object.base": "user must be a valid object.",
    "any.required": "user is required.",
  }),
}).unknown(false);

const validateLoggingUser = createValidatorMiddleware(loggingUserParentSchema);

export default validateLoggingUser;
