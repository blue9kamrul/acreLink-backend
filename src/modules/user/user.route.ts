import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/:userId', UserController.getUserProfile);
router.patch('/:userId/role', UserController.updateUserRole);

export const UserRoutes = router;