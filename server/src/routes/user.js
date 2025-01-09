import express from "express";

// Controllers
import createUser from "../controllers/user/createUser.js";
import getUser from "../controllers/user/getUser.js";
import updateUser from "../controllers/user/updateUser.js";
import deleteUser from "../controllers/user/deleteUser.js";
import loginUser from "../controllers/user/loginUser.js";
import logoutUser from "../controllers/user/logoutUser.js";
import sendResetLink from "../controllers/user/sendResetLink.js";
import logoutUserSilent from "../controllers/user/logoutUserSilent.js";

// Middleware
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import validateFullUser from "../middleware/user/validateFullUser.js";
import validateUpdatingUser from "../middleware/user/validateUpdatingUser.js";
import validateLoggingUser from "../middleware/user/validateLoggingUser.js";
import validateUserEmail from "../middleware/user/validateUserEmail.js";
import validateUserPassword from "../middleware/user/validateUserPassword.js";
import limitRequests from "../middleware/limitRequests.js";

const userRouter = express.Router(); // api/users

// User authentication routes
userRouter.post("/login", validateLoggingUser, loginUser);
userRouter.post("/logout", authenticate, logoutUser);

// User password reset routes
userRouter.post(
  "/password/reset-request",
  limitRequests,
  validateUserEmail,
  sendResetLink,
);
userRouter.patch(
  "/password/reset/:userId",
  authenticate,
  authorize,
  validateUserPassword,
  updateUser,
  logoutUserSilent,
);

// User CRUD routes
userRouter.post("", validateFullUser, createUser);
userRouter.use("/:userId", authenticate, authorize); // Middleware for all routes with userId
userRouter.get("/:userId", getUser);
userRouter.patch("/:userId", validateUpdatingUser, updateUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;
