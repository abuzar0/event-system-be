import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { hashPassword, verifyPassword } from "../utils/password-util";
import { JwtMiddleWare } from "../middleware/jwt.middleware";
import { Types } from "mongoose";
import { IRole } from "../utils/IRole";



function isIRole(role: Types.ObjectId | IRole): role is IRole {
  return (role as IRole).type !== undefined;
}

export class AuthController {
  static register = async (req: Request, res: Response) => {
    try {

      const isExist = await UserService.isExists({ email: req.body?.email })
      if (isExist) return res.status(200).json({ message: "user already exist", isSuccess: true })
      const { password, ...rest } = req.body;
      const encryptPassword = await hashPassword(password);
      const createUser = await UserService.create({
        ...rest,
        password: encryptPassword,
      });
      return res.status(201).json({ message: "register !", data: createUser, isSuccess: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message, isSuccess: false });
      } else {
        return res
          .status(500)
          .json({ message: "An unexpected error occurred", isSuccess: false });
      }
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const options = {
        population: [
          {
            path: 'role',
            select: 'type',
          },
        ],
        select: []
      };
      const { email } = req.body;
      const f_user = await UserService.getMany({ email }, options);
      if (f_user) {
        const user = f_user[0];
        const { password, role, ...rest } = user;
        if (isIRole(role)) {
          console.log(role._id, role.type)
          const isPasswordMatch = await verifyPassword(
            req.body.password,
            password
          );
          if (isPasswordMatch) {
            const accessToken = await JwtMiddleWare.generateToken(
              String(user._id),
              user.email,
              role.type
            );
            const refreshToken = await JwtMiddleWare.generateRefreshToken(
              String(user._id),
              user.email,
              role.type,
              Number(user.version)
            );
            res.cookie('access_token', accessToken, { httpOnly: true });
            res.cookie('refresh_token', refreshToken, { httpOnly: true })
            return res.status(200).json({ message: "login !", data: { _id: user._id, role: role.type } });
          }
        }


        return res.status(401).json({ message: "invalid role" });
      } else {
        return res.status(401).json({ message: "invalid credentials" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message, isSuccess: false });
      } else {
        return res
          .status(500)
          .json({ message: "An unexpected error occurred", isSuccess: false });
      }
    }
  };


  static async refreshToken(req: Request, res: Response) {
    try {
      const ref_token = req.cookies?.refreshToken || req.cookies?.['refresh_token'];
      const isValidToken = await JwtMiddleWare.verifyRefreshToken(ref_token);
      const accessToken = await JwtMiddleWare.generateToken(
        isValidToken._id,
        isValidToken.email,
        isValidToken.role
      );
      const refreshToken = await JwtMiddleWare.generateRefreshToken(
        isValidToken._id,
        isValidToken.email,
        isValidToken.role,
        isValidToken.version
      );
      res.cookie('access_token', accessToken, { httpOnly: true });
      res.cookie('refresh_Token', refreshToken, { httpOnly: true })
      return res.status(200).json({ message: "token refresh  !" });


    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: "An unexpected error occurred" });
      }
    }
  }
}
