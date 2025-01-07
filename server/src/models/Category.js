import mongoose from "mongoose";
import Joi from "joi";

// Example object that fits the model and schema
/*
{
  name: "Morning Habits",
  user_id: "609d8e8a4e8e4d001f2e3b9a"
}
*/

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
    },
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

const Category = mongoose.model("categories", categorySchema);

const categoryJoiSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.empty": "Name cannot be empty.", // Triggered when the field is present but empty
    "string.min": "Name cannot be less than 2 characters.", // Minimum length
    "any.required": "Name is required.", // Triggered when the field is missing
  }),
  user_id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/) // Validates a MongoDB ObjectId
    .required()
    .messages({
      "string.empty": "User ID cannot be empty.", // Triggered when the field is present but empty
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId.", // Invalid format
      "any.required": "User ID is required.", // Triggered when the field is missing
    }),
}).unknown(false);

export default Category;
export { Category, categoryJoiSchema };
