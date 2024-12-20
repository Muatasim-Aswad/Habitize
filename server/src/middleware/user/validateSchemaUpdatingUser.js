import Joi from "joi";
import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";
import { userJoiSchema } from "../../models/User.js";
import adaptJoiSchema from "../../util/adaptJoiSchema.js";

//the final obj should look like this: user: name, email, password. All optional

const updatingUserSchema = adaptJoiSchema(userJoiSchema, {
  makeOptional: ["name", "email", "password"],
});

const updatingUserParentSchema = Joi.object({
  user: updatingUserSchema.required().messages({
    "object.base": "user must be a valid object.",
    "any.required": "user is required.",
  }),
}).unknown(false);

const validateUpdatingUser = createValidatorMiddleware(
  updatingUserParentSchema,
);

export default validateUpdatingUser;
