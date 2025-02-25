import express from 'express';
import {
  getAllNews,
  getNewsArticle,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  getLatestNews
} from '../controllers/newsController';
import { protect, isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.get('/', getAllNews);
router.get('/latest', getLatestNews);
router.get('/:id', getNewsArticle);

// Protected routes (require authentication)
router.post('/', protect, isAdmin, createNewsArticle);
router.put('/:id', protect, isAdmin, updateNewsArticle);
router.delete('/:id', protect, isAdmin, deleteNewsArticle);

export default router;
