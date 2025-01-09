import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const SECRET = process.env.SECRET;
export const REFRESH_SECRET = process.env.REFRESH_SECRET;

export const generateJWT = (
  payload,
  expiresIn = "1d",
  withRefreshToken = false,
  expiresInRefresh = "7d",
) => {
  const token = jwt.sign(payload, SECRET, { expiresIn });

  if (!withRefreshToken) return token;

  return {
    accessToken: token,
    refreshToken: jwt.sign(payload, REFRESH_SECRET, {
      expiresIn: expiresInRefresh,
    }),
  };
};

export default generateJWT;
