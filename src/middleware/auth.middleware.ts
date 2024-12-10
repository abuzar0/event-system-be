import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { JwtMiddleWare } from "./jwt.middleware";
import { JwtPayload } from "../utils/Ijwt";

export class AuthMiddleWare {
  static handleValidationResult = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

  static authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.access_token; // token

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing',success:false });
    }
    try {
        const decoded = await JwtMiddleWare.verifyToken(token) as JwtPayload;
        // Attach user info to request
        (req as any).user = decoded;
        next();
    } catch (error) {
        // console.error('Token verification failed:', error);
       return res.status(403).json({ message: 'Invalid or expired token',success:false });
    }
};
}
