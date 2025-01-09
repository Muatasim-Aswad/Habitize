import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";
import { addUserParentSchema, userJoiSchema } from "../../models/User.js";

//the final obj should look like this: user: name, email, password

const validateFullUser = createValidatorMiddleware(
  addUserParentSchema(userJoiSchema),
);

export default validateFullUser;
