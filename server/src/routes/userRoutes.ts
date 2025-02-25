import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware';
import { logUserActions } from '../middleware/userLoggingMiddleware';
import {
  getAllUsers,
  createUser,
  login,
  logout,
  deleteUser,
  promoteUser,
  demoteUser
} from '../controllers/userController';

const router = express.Router();

// Routes publiques
router.post('/login', logUserActions('LOGIN'), ((req, res) => {
  return login(req, res);
}) as express.RequestHandler);
router.post('/register', logUserActions('CREATE_USER'), ((req, res) => {
  return createUser(req, res);
}) as express.RequestHandler);
// Routes protégées
router.use(protect);

router.get('/', logUserActions('VIEW_ALL_USERS'), getAllUsers);
router.post('/logout/:id', logUserActions('LOGOUT'), logout);

// Routes admin
router.use(isAdmin);

router.delete('/:id', logUserActions('DELETE_USER'), deleteUser);
router.put('/promote/:id', logUserActions('PROMOTE_USER'), promoteUser);
router.put('/demote/:id', logUserActions('DEMOTE_USER'), demoteUser);

export default router;
