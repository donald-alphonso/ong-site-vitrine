import express from 'express';
import {
  getAllMissions,
  getMission,
  createMission,
  updateMission,
  deleteMission,
} from '../controllers/missionController';
import { protect } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getAllMissions);
router.get('/:id', getMission);

// Protected routes (require authentication)
router.post('/', createMission);
router.put('/:id', protect, isAdmin, updateMission);
router.delete('/:id', protect, isAdmin, deleteMission);

export default router;
