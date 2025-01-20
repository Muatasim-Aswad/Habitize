import express from "express";

import validateFullHabit from "../middleware/habit/validateFullHabit.js";
import validateUpdatingHabit from "../middleware/habit/validateUpdatingHabit.js";

// Middleware
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import createHabit from "../controllers/habit/createHabit.js";
import getHabit from "../controllers/habit/getHabit.js";
import updateHabit from "../controllers/habit/updateHabit.js";
import deleteHabit from "../controllers/habit/deleteHabit.js";
import getHabits from "../controllers/habit/getHabits.js";
import getHabitsProgress from "../controllers/habit/getHabitsProgress.js";
import checkMonthHabits from "../controllers/habit/checkMonthHabits.js";

const habitRouter = express.Router(); // api/habits

habitRouter.use(authenticate); // Middleware for all the following routes

// All habits routes
habitRouter.get("", getHabits);
habitRouter.get("/progress", getHabitsProgress);
habitRouter.get("/month", checkMonthHabits);

// Habit CRUD routes
habitRouter.post("", validateFullHabit, createHabit);

habitRouter.use("/:habitId", authorize); // Middleware for all the following routes

habitRouter.get("/:habitId", getHabit);
habitRouter.patch("/:habitId", validateUpdatingHabit, updateHabit);
habitRouter.delete("/:habitId", authenticate, authorize, deleteHabit);

export default habitRouter;
