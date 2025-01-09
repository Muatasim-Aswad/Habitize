import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";
import { addUserParentSchema, userJoiSchema } from "../../models/User.js";
import adaptJoiSchema from "../../util/adaptJoiSchema.js";

//the final obj should look like this: user: email, password

const loggingUserSchema = adaptJoiSchema(userJoiSchema, {
  forbidFields: ["name"],
});

const validateLoggingUser = createValidatorMiddleware(
  addUserParentSchema(loggingUserSchema),
);

export default validateLoggingUser;
