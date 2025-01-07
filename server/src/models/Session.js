import mongoose from "mongoose";
import Joi from "joi";

// Example of an object that fits the model and schema
// const exampleSession = {
//   user_id: "609c4e2a8f8e4e001f9e2e0a",
// };

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // References the User model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

const Session = mongoose.model("sessions", sessionSchema);

const sessionJoiSchema = Joi.object({
  user_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates a MongoDB ObjectId
    .required()
    .messages({
      "string.empty": "User ID cannot be empty.",
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId.",
      "any.required": "User ID is required.",
    }),
}).unknown(false);

export default Session;
export { Session, sessionJoiSchema };
