import { NextFunction, Request, Response } from "express";
import { JwtMiddleWare } from "./jwt.middleware";
import { JwtPayload } from "../utils/Ijwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Extend the `Request` interface with the `user` property
    }
  }
}
export class AuthorizeMiddleWare {
  static hasPermissionUser = (requiredPermission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const user = req['user'];
      // console.log("user===>", user)
      if (!user) {
        return res.status(401).json({ message: 'User data not found in request', success: false });
      }

      if (user.role != requiredPermission) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions', success: false });
      }

      next();
    };
  };


}