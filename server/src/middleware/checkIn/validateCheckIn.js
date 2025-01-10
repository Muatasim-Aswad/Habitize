import {
  checkInJoiSchema,
  addCheckInParentSchema,
} from "../../models/checkIn.js";
import adaptJoiSchema from "../../util/adaptJoiSchema.js";
import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";

const checkInSchema = adaptJoiSchema(checkInJoiSchema, {
  forbidFields: ["habit_id", "start_date", "end_date"],
});

const validateCheckIn = createValidatorMiddleware(
  addCheckInParentSchema(checkInSchema),
);

export default validateCheckIn;
