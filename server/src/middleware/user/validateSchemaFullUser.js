import Joi from "joi";
import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";
import { userJoiSchema } from "../../models/User.js";

//the final obj should look like this: fullUser: name, email, password

const fullUserParentSchema = Joi.object({
  fullUser: userJoiSchema.required().messages({
    "object.base": "fullUser must be a valid object.",
    "any.required": "fullUser Obj is required. e.g. {fullUser: {..}}.",
  }),
}).unknown(false);

const validateFullUser = createValidatorMiddleware(fullUserParentSchema);

export default validateFullUser;
