import { Router } from "express";
import { RoleController } from "../controllers/role.controller";

const router = Router();


router.get('/list',RoleController.getAllRoles)
router.post('/create',RoleController.createRole)


export default router