import jwt from "jsonwebtoken";
import crypto from "crypto";

export const SECRET =
  process.env.SECRET || crypto.randomBytes(64).toString("hex");
export const REFRESH_SECRET =
  process.env.REFRESH_SECRET || crypto.randomBytes(64).toString("hex");

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
