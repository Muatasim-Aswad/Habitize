import mongoose from "mongoose";
import Joi from "joi";

// Example object that fits the model and schema

/*
const exampleCheckIn = {
  habit_id: "609d9e0e6e8e5a001f2e3d4c",
  start_date: new Date("2022-01-01"),
  end_date: new Date("2022-01-07"),
  times_done: 5,
};
*/

const checkInSchema = new mongoose.Schema(
  {
    habit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "habits", // References the Habit model
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    times_done: {
      type: Number,
      required: true,
      min: 0, // Can't be negative
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

const CheckIn =
  mongoose.models.checkins || mongoose.model("checkins", checkInSchema);

const checkInJoiSchema = Joi.object({
  habit_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates a MongoDB ObjectId
    .required()
    .messages({
      "string.empty": "Habit ID cannot be empty.",
      "string.pattern.base": "Habit ID must be a valid MongoDB ObjectId.",
      "any.required": "Habit ID field is required.",
    }),
  start_date: Joi.date().required().messages({
    "date.base": "Start date must be a valid date.",
    "any.required": "Start date field is required.",
  }),
  end_date: Joi.date()
    .required()
    .greater(Joi.ref("start_date")) // End date must be after start date
    .messages({
      "date.base": "End date must be a valid date.",
      "date.greater": "End date must be after the start date.",
      "any.required": "End date field is required.",
    }),
  times_done: Joi.number().min(0).required().messages({
    "number.base": "Times done must be a number.",
    "number.min": "Times done cannot be negative.",
    "any.required": "Times done field is required.",
  }),
}).unknown(false);

const addCheckInParentSchema = (checkInSpecialSchema) =>
  Joi.object({
    checkIn: checkInSpecialSchema.required().messages({
      "object.base": "checkIn must be a valid object.",
      "any.required": "checkIn field is required.",
    }),
  }).unknown(false);

export { CheckIn as default, checkInJoiSchema, addCheckInParentSchema };
