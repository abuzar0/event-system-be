import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { userRegistrationValidator } from "../utils/fields-validation";
import { AuthMiddleWare } from "../middleware/auth.middleware";

const router = Router();


router.post('/register',userRegistrationValidator,AuthMiddleWare.handleValidationResult,AuthController.register);
router.post('/login',AuthController.login);
router.post('/refresh-token',AuthController.refreshToken);
router.post('/logout',AuthController.logout);

export default router;