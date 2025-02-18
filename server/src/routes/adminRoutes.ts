import express from 'express';
import {
  deleteUser,
  getAllUsers,
  promoteUser,
  demoteUser,
  createUser,
} from '../controllers/userController';
import {
  getAllContacts,
  deleteContact,
  updateContact,
} from '../controllers/contactController';
import { isAdmin, protect } from '../middleware/authMiddleware';

const router = express.Router();

// User
router.get('/users', protect, isAdmin, getAllUsers);
router.post(
  '/register',
  protect,
  isAdmin,
  createUser as express.RequestHandler
);
router.delete('/users/:id', protect, isAdmin, deleteUser);
router.patch('/users/:id/promote', protect, isAdmin, promoteUser);
router.patch('/users/:id/demote', protect, isAdmin, demoteUser);

// Contact
router.get('/contacts', protect, isAdmin, getAllContacts);
router.patch('/contacts/:id/update', protect, isAdmin, updateContact);
router.delete('/contacts/:id', protect, isAdmin, deleteContact);

export default router;
