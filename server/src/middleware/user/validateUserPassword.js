import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";
import { addUserParentSchema, userJoiSchema } from "../../models/User.js";
import adaptJoiSchema from "../../util/adaptJoiSchema.js";

//the final obj should look like this: user: email, password

const userPasswordSchema = adaptJoiSchema(userJoiSchema, {
  forbidFields: ["name", "email"],
});

const validateUserPassword = createValidatorMiddleware(
  addUserParentSchema(userPasswordSchema),
);

export default validateUserPassword;
