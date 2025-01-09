import rateLimit from "express-rate-limit";

const limitRequests = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1,
  message: "Too many requests, please try again in 2 minutes.",
});

export default limitRequests;
