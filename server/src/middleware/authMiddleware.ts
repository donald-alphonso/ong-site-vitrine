import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: 'admin' | 'user';
    iat: number;
    exp: number;
  };
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log("token",token);

  if (!token) {
    res.status(403).json({ message: 'Not authorized, no token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = decoded as any;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user || user.role !== 'admin') {
    res.status(403).json({ message: 'Admin access required' });
    return;
  } else {
    next();
  }
};
