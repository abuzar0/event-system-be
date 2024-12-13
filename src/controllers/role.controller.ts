import { Request, Response } from "express";
import { RoleService } from './../services/role.service';

export class RoleController {

    static async getAllRoles(req: Request, res: Response) {
        try {
            const roles = await RoleService.getMany({ isActive: true });
            return res.status(200).json({ message: "role lists", data: roles, isSuccess: true })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message, isSuccess: false });
            } else {
                return res
                    .status(500)
                    .json({ message: "An unexpected error occurred", isSuccess: false });
            }
        }
    }

    static async createRole(req: Request, res: Response) {
        try {
            const body = req.body;
            const roles = await RoleService.create(body);
            return res.status(201).json({ message: "role created !", data: roles, isSuccess: true })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message, isSuccess: false });
            } else {
                return res
                    .status(500)
                    .json({ message: "An unexpected error occurred", isSuccess: false });
            }
        }
    }

    static async updateRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const body = req.body;
            const roles = await RoleService.update(id, body);
            return res.status(201).json({ message: "role updated !", data: roles, isSuccess: true })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message, isSuccess: false });
            } else {
                return res
                    .status(500)
                    .json({ message: "An unexpected error occurred", isSuccess: false });
            }
        }
    }
}