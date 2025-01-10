import express from "express";

import validateCheckIn from "../middleware/checkIn/validateCheckIn.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import updateCheckIn from "../controllers/checkIn/updateCheckIn.js";

const checkInRouter = express.Router(); // api/check-ins

checkInRouter.use("/:checkInId", authenticate, authorize); // Middleware for all the following routes

// check in CRUD routes
checkInRouter.patch("/:checkInId", validateCheckIn, updateCheckIn);

export default checkInRouter;
