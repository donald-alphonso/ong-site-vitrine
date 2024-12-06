import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, isAdmin, getAllUsers);

export default router;
