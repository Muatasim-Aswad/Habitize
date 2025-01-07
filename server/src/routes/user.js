import express from "express";
import createUser from "../controllers/user/createUser.js";
import validateFullUser from "../middleware/user/validateSchemaFullUser.js";
import validateUpdatingUser from "../middleware/user/validateSchemaUpdatingUser.js";
import validateLoggingUser from "../middleware/user/validateSchemaLoggingUser.js";
import loginUser from "../controllers/user/loginUser.js";
import authenticateJWT from "../middleware/authenticateJWT.js";

const userRouter = express.Router();

// Public routes - no authentication needed
userRouter.post("/create", validateFullUser, createUser);
userRouter.post("/login", validateLoggingUser, loginUser);

// Protected routes - authentication required
// Using token-based user identification instead of URL parameters
userRouter.put("/me", authenticateJWT, validateUpdatingUser);
userRouter.delete("/me", authenticateJWT, validateFullUser);

export default userRouter;
