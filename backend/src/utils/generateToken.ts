import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokenAndSetCookies = (userId: any, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "10d",
  });

  console.log("token in generateToken-", token);

  res.cookie("token", token, {
    httpOnly: true,
    // secure: inProduction, // must be false on localhost
    // secure: true, // must be false on localhost
    // sameSite: "none", // safe default - lax on localhost

    //  local server
    // secure: true, // must be false on localhost
    // sameSite: "lax", // safe default - lax on localhost

    secure: true,
    sameSite: "none",

    // secure: process.env.NODE_ENV === "production",
    // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
};
