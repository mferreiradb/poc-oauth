import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();

router.post('/sign-in', AuthController.signIn);
router.post('/sign-up', AuthController.signUp);

export { router as authRoutes };
