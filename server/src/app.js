import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);

app.use(errorHandler); //manages any error or unsuccessful request using AppError

export default app;
