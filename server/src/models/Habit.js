import mongoose from "mongoose";
import Joi from "joi";

// Example object for this model

/*
const exampleHabit = {
  user_id: "609c5e9e8c5e5e0015f3e8a1",
  name: "Exercise",
  icon_url: "https://example.com/exercise-icon.png",
  goal: {
    number: 5,
    unit: "times",
    frequency: "daily",
  },
  period: {
    start: new Date("2022-01-01"),
    end: new Date("2022-12-31"),
  },
  categories: ["609c5e9e8c5e5e0015f3e8a2"],
  reminders: [
    {
      time: "08:00",
      message: "Don't forget to exercise!",
    }
  ],
};
*/

const habitSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // References the User model
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    icon_url: {
      type: String,
      required: false, // Optional field for the habit's icon
      trim: true,
    },
    goal: {
      number: {
        type: Number,
        required: true,
        min: 1,
      },
      unit: {
        type: String,
        required: true,
        enum: ["times", "minutes", "hours", "steps", "calories"], // Add units as needed
      },
      frequency: {
        type: String,
        required: true,
        enum: ["daily", "weekly", "monthly", "yearly"], // Add frequencies as needed
      },
    },
    period: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: false, // Optional: Can be open-ended
      },
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories", // References the Category model
      },
    ],
    reminders: [
      {
        time: {
          type: String, // Format HH:mm (e.g., "08:30")
          required: true,
          match: [/^\d{2}:\d{2}$/, "Time must be in the format HH:mm."],
        },
        message: {
          type: String,
          required: false, // Optional reminder message
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

const Habit = mongoose.model("habits", habitSchema);

const habitJoiSchema = Joi.object({
  user_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates a MongoDB ObjectId
    .required()
    .messages({
      "string.empty": "User ID cannot be empty.",
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId.",
      "any.required": "User ID is required.",
    }),
  name: Joi.string().min(2).required().messages({
    "string.empty": "Name cannot be empty.",
    "string.min": "Name cannot be less than 2 characters.",
    "any.required": "Name is required.",
  }),
  icon_url: Joi.string().uri().optional().messages({
    "string.uri": "Icon URL must be a valid URI.",
  }),
  goal: Joi.object({
    number: Joi.number().min(1).required().messages({
      "number.base": "Goal number must be a number.",
      "number.min": "Goal number must be at least 1.",
      "any.required": "Goal number is required.",
    }),
    unit: Joi.string()
      .valid("times", "minutes", "hours", "steps", "calories") // Add units as needed
      .required()
      .messages({
        "any.only":
          "Unit must be one of [times, minutes, hours, steps, calories].",
        "any.required": "Goal unit is required.",
      }),
    frequency: Joi.string()
      .valid("daily", "weekly", "monthly", "yearly") // Add frequencies as needed
      .required()
      .messages({
        "any.only":
          "Frequency must be one of [daily, weekly, monthly, yearly].",
        "any.required": "Goal frequency is required.",
      }),
  }).required(),
  period: Joi.object({
    start: Joi.date().required().messages({
      "date.base": "Start date must be a valid date.",
      "any.required": "Start date is required.",
    }),
    end: Joi.date().optional().messages({
      "date.base": "End date must be a valid date.",
    }),
  }).required(),
  categories: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/) // Validates a MongoDB ObjectId
        .messages({
          "string.pattern.base":
            "Each category ID must be a valid MongoDB ObjectId.",
        }),
    )
    .optional(),
  reminders: Joi.array()
    .items(
      Joi.object({
        time: Joi.string()
          .pattern(/^\d{2}:\d{2}$/) // Validates time format HH:mm
          .required()
          .messages({
            "string.pattern.base": "Time must be in the format HH:mm.",
            "any.required": "Reminder time is required.",
          }),
        message: Joi.string().optional().messages({
          "string.base": "Reminder message must be a string.",
        }),
      }),
    )
    .optional(),
}).unknown(false);

export default Habit;
export { Habit, habitJoiSchema };
