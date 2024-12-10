import { Router } from "express";
import { AuthMiddleWare } from "../middleware/auth.middleware";
import { EventController } from "../controllers/event.controller";
import { AuthorizeMiddleWare } from "../middleware/authorize.middleware";

const router = Router();


router.get('/list',AuthMiddleWare.authenticateJWT,EventController.getAll);
router.post('/create',[AuthMiddleWare.authenticateJWT,AuthorizeMiddleWare.hasPermissionUser('user')],EventController.createEvent);
router.post('/join',[AuthMiddleWare.authenticateJWT,AuthorizeMiddleWare.hasPermissionUser('user')],EventController.joinEvent);
router.patch('/approved/:id',[AuthMiddleWare.authenticateJWT,AuthorizeMiddleWare.hasPermissionUser('admin')],EventController.approvedEvent);
router.delete('/:id',[AuthMiddleWare.authenticateJWT,AuthorizeMiddleWare.hasPermissionUser('admin')],EventController.deleteEvent);

export default router