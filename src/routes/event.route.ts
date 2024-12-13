import { Router } from "express";
import { AuthMiddleWare } from "../middleware/auth.middleware";
import { EventController } from "../controllers/event.controller";
import { AuthorizeMiddleWare } from "../middleware/authorize.middleware";

const router = Router();


router.get('/list', [AuthMiddleWare.authenticateJWT, AuthorizeMiddleWare.hasPermission('view_event')], EventController.getAll);
router.post('/create', [AuthMiddleWare.authenticateJWT, AuthorizeMiddleWare.hasPermission('create_event')], EventController.createEvent);
router.post('/join', [AuthMiddleWare.authenticateJWT, AuthorizeMiddleWare.hasPermission('join_event')], EventController.joinEvent);
router.patch('/approved/:id', [AuthMiddleWare.authenticateJWT, AuthorizeMiddleWare.hasPermission('approved_event')], EventController.approvedEvent);
router.delete('/:id', [AuthMiddleWare.authenticateJWT, AuthorizeMiddleWare.hasPermission('delete_event')], EventController.deleteEvent);

export default router