import { Router } from "express";
import { asyncHandler } from "../utils/handler";
import { UserController } from "./user.controller";
import { authenticateToken } from "../middlewares/auth";
import { authorizeRoles } from "../middlewares/role";

const router = Router();
const userController = new UserController();

router.get(
  "",
  authenticateToken,
  authorizeRoles("user"),
  asyncHandler(userController.getProfile),
);
// router.get('', asyncHandler(userController.));

export default router;
