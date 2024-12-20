import express from "express";
import createUser from "../controllers/user/createUser.js";
import validateFullUser from "../middleware/user/validateSchemaFullUser.js";
import validateUpdatingUser from "../middleware/user/validateSchemaUpdatingUser.js";
import validateLoggingUser from "../middleware/user/validateSchemaLoggingUser.js";
import loginUser from "../controllers/user/loginUser.js";

const userRouter = express.Router();

userRouter.post("/create", validateFullUser, createUser);
userRouter.post("/login", validateLoggingUser, loginUser);
userRouter.delete("/delete", validateFullUser); //to be protected, /:id/delete
userRouter.post("/update", validateUpdatingUser); //to be protected, /:id/update

export default userRouter;
