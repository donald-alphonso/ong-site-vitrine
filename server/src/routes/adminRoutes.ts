import express from 'express';
import { getAllUsers } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/users', protect, getAllUsers);

export default router;
