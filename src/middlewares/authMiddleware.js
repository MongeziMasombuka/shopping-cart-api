import { jwtVerify } from "jose";
import dotenv from "dotenv";
dotenv.config();
import prisma from "../models/prismaClient.js";
import { JWT_SECRET } from "../utils/getJwtSecret.js";

export const protect = async (req, res, next) => {
  try {
    // const authHeader = req.headers.authorization;
    // console.log("Token: ", req.cookies.refreshToken);

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //   res.status(401).json("Not authorized, no token");
    // }

    // const token = authHeader.split(" ")[1];
    const token = req.cookies.refreshToken;
    const { payload } = await jwtVerify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      res.status(401).json("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    next(new Error("Not authorized, token failed"));
  }
};
