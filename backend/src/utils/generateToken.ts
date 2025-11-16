import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokenAndSetCookies = (userId: any, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "10d",
  });

  console.log("token in generateToken-", token);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // must be false on localhost
    sameSite: "lax", // safe default
    path: "/",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
};
