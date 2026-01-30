import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validate';
import { registerSchema } from '../schemas/auth.schemas';
import { loginSchema } from '../schemas/auth.schemas';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);

export { authRoutes };