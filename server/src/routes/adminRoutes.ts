import express from 'express';
import { deleteUser, getAllUsers, promoteUser } from '../controllers/userController';
import { isAdmin, protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/users', protect, isAdmin, getAllUsers);
router.delete('/users/:id', protect, isAdmin, deleteUser);
router.put('/users/:id/promote', protect, isAdmin, promoteUser);

export default router;
