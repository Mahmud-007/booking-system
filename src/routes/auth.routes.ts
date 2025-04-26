import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// POST /api/auth/register - Register a new user
router.post('/register', authController.register.bind(authController));

// POST /api/auth/login - Login a user
router.post('/login', authController.login.bind(authController));

export default router;