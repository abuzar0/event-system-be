import jwt from "jsonwebtoken";
import { JwtPayload, JwtRefreshPayload } from "../utils/Ijwt";

const JWT_SECRET = process.env.JWT_SECRET || "for-save";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "50m"; // Token expiry time
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "form-ref-save";


export class JwtMiddleWare {
  static generateToken = (userId: string, email: string, role: string): string => {
    const payload: JwtPayload = { _id: userId, email, role };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  };

  static verifyToken = (token: string): Promise<JwtPayload> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded as JwtPayload); // Type assertion for JwtPayload
      });
    });
  };

  static generateRefreshToken = (userId: string, email: string, role: string, version: number): string => {
    const payload: JwtRefreshPayload = { _id: userId, version, email, role };
    return jwt.sign(payload, JWT_REFRESH_SECRET);
  };

  static verifyRefreshToken = (token: string): Promise<JwtRefreshPayload> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_REFRESH_SECRET, (err: any, decoded: any) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded as JwtRefreshPayload);
      });
    });
  };
}
