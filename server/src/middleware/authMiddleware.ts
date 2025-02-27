import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    email: string;
  };
}

interface DecodedToken {
  userId: string;
  role: string;
  email: string;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    logger.warn('Authentication attempt without token');
    res.status(403).json({ message: 'Not authorized, no token' });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ''
    ) as DecodedToken;

    req.user = decoded;

    // Ajouter l'email aux logs via le logger
    logger.info('Request authenticated', {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      path: req.path,
      method: req.method,
    });

    next();
  } catch (error) {
    logger.error('Token authentication failed', error);
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
    logger.warn('Unauthorized admin access attempt', {
      userId: user?.userId,
      email: user?.email,
      role: user?.role,
      path: req.path,
      method: req.method,
    });
    res.status(403).json({ message: 'Admin access required' });
    return;
  }

  logger.info('Admin access granted', {
    userId: user.userId,
    email: user.email,
    path: req.path,
    method: req.method,
  });

  next();
};
