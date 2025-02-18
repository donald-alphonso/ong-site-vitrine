import express, { Request, Response } from 'express';

import { login, logout } from '../controllers/userController';

const router = express.Router();

router.post('/login', ((req: Request, res: Response) => {
  return login(req, res);
}) as express.RequestHandler);

router.patch('/logout/:id', ((req: Request, res: Response) => {
  return logout(req, res);
}) as express.RequestHandler);

export default router;
