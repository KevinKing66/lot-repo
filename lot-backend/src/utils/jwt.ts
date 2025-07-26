import jwt from "jsonwebtoken";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export class JwtUtils {
  static generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "72h" });
  }

  static verifyToken(token: string): jwt.JwtPayload | string {
    return jwt.verify(token, JWT_SECRET);
  }
}
