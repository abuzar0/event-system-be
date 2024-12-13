import { NextFunction, Request, Response } from "express";
import { JwtMiddleWare } from "./jwt.middleware";
import { JwtPayload } from "../utils/Ijwt";
import { UserService } from "../services/user.service";
import { IOptions } from "../utils/IOption";
import { IRole } from "../utils/IRole";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // Extend the `Request` interface with the `user` property
    }
  }
}
export class AuthorizeMiddleWare {
  static hasPermission = (requiredPermission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = req['user'];
        if (!user) {
          return res.status(401).json({
            message: 'User data not found in the request',
            success: false,
          });
        }
        const options: IOptions = {
          population: [
            {
              path: 'role',
              select: 'permissions type',
            },
          ],
          select: []
        };
        

        const userWithRole = await UserService.getById(user._id, options);

        if (!userWithRole || !userWithRole.role || !('permissions' in userWithRole.role)) {
          return res.status(403).json({
            message: 'User role or permissions not found',
            success: false,
          });
        }

        const permissions  = userWithRole.role.permissions;
        console.log("premissions",permissions)
        if (permissions.includes(requiredPermission)) {
          return next();
        }

        return res.status(403).json({
          message: 'User does not have the required permission',
          success: false,
        });
      } catch (error) {
        console.error('Error in permission middleware:', error);
        return res.status(500).json({
          message: 'Internal server error',
          success: false,
        });
      }
    };
  };
}