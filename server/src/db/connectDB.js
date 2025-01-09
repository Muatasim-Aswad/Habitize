import mongoose from "mongoose";
import { logError } from "../util/logging.js";

const connectDB = () => mongoose.connect(process.env.MONGODB_URL);

//write a function that tries to connect for x times with y interval, it logs an error if in every failed trial, but throws it after the last failed trial
const connectDBWithRetry = async (retries = 5, interval = 1000) => {
  let error = null;
  for (let i = 0; i < retries; i++) {
    try {
      await connectDB();
      return;
    } catch (err) {
      error = err;
      logError(err);
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
  throw error;
};

export { connectDB, connectDBWithRetry };
