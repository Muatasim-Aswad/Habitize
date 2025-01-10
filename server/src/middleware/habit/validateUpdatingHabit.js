import { addHabitParentSchema, habitJoiSchema } from "../../models/Habit.js";
import adaptJoiSchema from "../../util/adaptJoiSchema.js";
import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";

const updatingHabitSchema = adaptJoiSchema(habitJoiSchema, {
  makeOptional: ["name", "goal", "period"],
  forbidFields: ["user_id"],
});

const validateUpdatingHabit = createValidatorMiddleware(
  addHabitParentSchema(updatingHabitSchema),
);

export default validateUpdatingHabit;
