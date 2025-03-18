import { Router } from 'express';
import {asyncHandler} from "../utils/handler";
import {authenticateToken} from "../middlewares/auth";
import {authorizeRoles} from "../middlewares/role";
import {AdminController} from "./admin.controller";

const router = Router();
const adminController = new AdminController()

router.get('', authenticateToken, authorizeRoles('admin'), asyncHandler(adminController.getAdminProfile));


export default router;
