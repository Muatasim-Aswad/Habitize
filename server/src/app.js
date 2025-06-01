import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import errorHandler from "./middleware/errorHandler.js";
import habitRouter from "./routes/habit.js";
import checkInRouter from "./routes/checkIn.js";

const app = express();

app.set("trust proxy", 1); // to pass heroku s proxy in the limiter
app.use(express.json());
app.use(cors());

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get("/warmup", (req, res) => {
  res.status(200).end();
});

app.use("/api/users", userRouter);
app.use("/api/habits", habitRouter);
app.use("/api/check-ins", checkInRouter);

app.all("api/*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    method: req.method,
    path: req.originalUrl,
  });
});

app.use(errorHandler); //manages any error or unsuccessful request using AppError

export default app;
