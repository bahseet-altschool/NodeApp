import { Router } from 'express';
import { AuthController } from './auth.controller';
import {loginSchema, registerSchema} from '../validations/auth.validation';
import {validateRequest} from "../middlewares/request";
import {asyncHandler} from "../utils/handler";

const router = Router();
const authController = new AuthController();

router.post('/signup', validateRequest(registerSchema), asyncHandler(authController.signup));
router.post('/login', validateRequest(loginSchema), asyncHandler(authController.login));

export default router;
