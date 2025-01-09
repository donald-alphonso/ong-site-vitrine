import express, { Request, Response } from 'express';

import { login } from '../controllers/userController';

const router = express.Router();

router.post('/login', ((req: Request, res: Response) => {
  return login(req, res);
}) as express.RequestHandler);

export default router;
