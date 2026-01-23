import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../../../middlewares/authMiddleware.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/dashboard', UserController.getDashboard);
router.get('/settings', UserController.getSettings);
router.put('/settings', UserController.updateSettings);

export { router as userRoutes };
