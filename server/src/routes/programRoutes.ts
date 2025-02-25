import express from 'express';
import {
  getAllPrograms,
  getProgram,
  createProgram,
  updateProgram,
  deleteProgram
} from '../controllers/programController';
import { isAdmin, protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getAllPrograms);
router.get('/:id', getProgram);

// Protected routes (require authentication)
router.post('/', protect, isAdmin, createProgram);
router.put('/:id', protect, isAdmin, updateProgram);
router.delete('/:id', protect, isAdmin, deleteProgram);

export default router;
