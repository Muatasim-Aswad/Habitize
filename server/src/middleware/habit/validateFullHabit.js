import { addHabitParentSchema, habitJoiSchema } from "../../models/Habit.js";
import adaptJoiSchema from "../../util/adaptJoiSchema.js";
import createValidatorMiddleware from "../../util/createValidatorMiddleware.js";

const habitSchema = adaptJoiSchema(habitJoiSchema, {
  forbidFields: ["user_id"],
});

const validateFullHabit = createValidatorMiddleware(
  addHabitParentSchema(habitSchema),
);

export default validateFullHabit;
