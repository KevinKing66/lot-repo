import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../utils/jwt";
import jwt from "jsonwebtoken";
import { AuthMiddlewareRequest } from "../types/global";

export const authMiddleware = (req: AuthMiddlewareRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = JwtUtils.verifyToken(token) as jwt.JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
