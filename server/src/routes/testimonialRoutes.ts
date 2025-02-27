import express from 'express';
import {
  getAllTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { isAdmin, protect } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonial);

// Protected routes (require authentication)
router.post('/', protect, isAdmin, createTestimonial);
router.put('/:id', protect, isAdmin, updateTestimonial);
router.delete('/:id', protect, isAdmin, deleteTestimonial);

export default router;
