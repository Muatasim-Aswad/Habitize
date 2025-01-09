import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";
import { addUserParentSchema, userJoiSchema } from "../../models/User.js";
import adaptJoiSchema from "../../util/adaptJoiSchema.js";

//the final obj should look like this: user: email, password

const userEmailSchema = adaptJoiSchema(userJoiSchema, {
  forbidFields: ["name", "password"],
});

const validateUserEmail = createValidatorMiddleware(
  addUserParentSchema(userEmailSchema),
);

export default validateUserEmail;
