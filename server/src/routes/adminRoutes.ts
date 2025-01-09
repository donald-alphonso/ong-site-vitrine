import express from 'express';
import {
  deleteUser,
  getAllUsers,
  promoteUser,
  demoteUser,
  createUser
} from '../controllers/userController';
import { isAdmin, protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/users', protect, isAdmin, getAllUsers);
router.post('/register', protect, isAdmin, createUser as express.RequestHandler);
router.delete('/users/:id', protect, isAdmin, deleteUser);
router.patch('/users/:id/promote', protect, isAdmin, promoteUser);
router.patch('/users/:id/demote', protect, isAdmin, demoteUser);

export default router;
