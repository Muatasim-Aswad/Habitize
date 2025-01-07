import mongoose from "mongoose";
import Joi from "joi";

// Example of an object that fits the model and schema

/*
const exampleNotification = {
  user_id: "609c4e6b2c3e4f5a1d2b3c4d", // MongoDB ObjectId
  reminder_id: "609c4e6b2c3e4f5a1d2b3c4e", // MongoDB ObjectId
  habit_id: "609c4e6b2c3e4f5a1d2b3c4f", // MongoDB ObjectId
  time: new Date(),
  status: "pending",
};
*/

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // References the User model
      required: true,
    },
    reminder_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reminders", // References the Reminder model
      required: true,
    },
    habit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "habits", // References the Habit model
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "sent", "failed"], // Enum for notification status
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

const Notification = mongoose.model("notifications", notificationSchema);

const notificationJoiSchema = Joi.object({
  user_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates a MongoDB ObjectId
    .required()
    .messages({
      "string.empty": "User ID cannot be empty.",
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId.",
      "any.required": "User ID is required.",
    }),
  reminder_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates a MongoDB ObjectId
    .required()
    .messages({
      "string.empty": "Reminder ID cannot be empty.",
      "string.pattern.base": "Reminder ID must be a valid MongoDB ObjectId.",
      "any.required": "Reminder ID is required.",
    }),
  habit_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates a MongoDB ObjectId
    .required()
    .messages({
      "string.empty": "Habit ID cannot be empty.",
      "string.pattern.base": "Habit ID must be a valid MongoDB ObjectId.",
      "any.required": "Habit ID is required.",
    }),
  time: Joi.date().required().messages({
    "date.base": "Time must be a valid date.",
    "any.required": "Time is required.",
  }),
  status: Joi.string().valid("pending", "sent", "failed").required().messages({
    "any.only": "Status must be one of [pending, sent, failed].",
    "any.required": "Status is required.",
  }),
}).unknown(false);

export default Notification;
export { Notification, notificationJoiSchema };
