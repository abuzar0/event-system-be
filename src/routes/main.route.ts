import { Router } from "express";
import authRoute from "./auth.route";
import eventRoute from "./event.route";
import roleRoute from "./role.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/event", eventRoute);
router.use("/role", roleRoute);

export default router;
