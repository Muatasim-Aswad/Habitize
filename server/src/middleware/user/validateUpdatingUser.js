import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";
import { addUserParentSchema, userJoiSchema } from "../../models/User.js";
import adaptJoiSchema from "../../util/adaptJoiSchema.js";

//the final obj should look like this: user: name, email, password. All optional

const updatingUserSchema = adaptJoiSchema(userJoiSchema, {
  makeOptional: ["name", "email", "password"],
});

const validateUpdatingUser = createValidatorMiddleware(
  addUserParentSchema(updatingUserSchema),
);

export default validateUpdatingUser;
