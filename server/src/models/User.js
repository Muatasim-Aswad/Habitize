import mongoose from "mongoose";
import Joi from "joi";

// Example object of the User model

/*
const exampleUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "Password123!",
};
*/

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  },
);

const User = mongoose.model("users", userSchema);

const userJoiSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "Name cannot be empty.", // Triggered when the field is present but empty
    "any.required": "Name is required.", // Triggered when the field is missing
    "string.min": "Name cannot be less than 2 characters.",
  }),
  email: Joi.string().lowercase().email().required().messages({
    "string.empty": "Email cannot be empty.", // Empty field
    "string.email": "Please enter a valid email address.", // Invalid email format
    "string.lowercase": "Email must be in lowercase.",
    "any.required": "Email is required.", // Missing field
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.]).{8,}$"),
    )
    .required()
    .messages({
      "string.empty": "Password cannot be empty.", // Empty field
      "string.min": "Password must be at least 8 characters long.", // Too short
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character: @$!%*?&. .", // Pattern mismatch
      "any.required": "Password is required.", // Missing field
    }),
}).unknown(false);

export default User;
export { User, userJoiSchema };
