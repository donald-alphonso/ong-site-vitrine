import express, { Request, Response } from 'express';

import { createUser, login } from '../controllers/userController';

const router = express.Router();

router.post('/register', ((req: Request, res: Response) => {
  return createUser(req, res);
}) as express.RequestHandler);
router.post('/login', ((req: Request, res: Response) => {
  return login(req, res);
}) as express.RequestHandler);

export default router;
