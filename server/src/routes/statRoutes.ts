import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { getContactStats, getUsersStats } from '../controllers/statcontroller';

const router = express.Router();

router.get('/contactStats', protect, getContactStats);
router.get('/userStats', protect, getUsersStats);

export default router;