import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
}

export const addUserContextToLogs = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || ''
      ) as DecodedToken;
      logger.setContext({
        userId: decoded.userId,
        userEmail: decoded.email,
        userRole: decoded.role,
      });
    }
  } catch (error) {
    // Si le token est invalide, on continue sans contexte utilisateur
    logger.setContext({});
  }
  next();
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Capture le début de la requête
  const start = Date.now();

  // Log la requête entrante
  logger.info(`Incoming ${req.method} request`, {
    url: req.url,
    method: req.method,
    params: req.params,
    query: req.query,
    body: req.body,
    headers: {
      'user-agent': req.get('user-agent'),
      'content-type': req.get('content-type'),
      authorization: req.get('authorization') ? '[PRESENT]' : '[ABSENT]',
    },
    ip: req.ip,
  });

  // Intercepte la fin de la requête
  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? 'error' : 'info';

    const logMessage = `${req.method} ${req.url} completed`;
    const context = {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      responseHeaders: res.getHeaders(),
    };

    if (level === 'error') {
      logger.error(logMessage, undefined, context);
    } else {
      logger.info(logMessage, context);
    }
  });

  next();
};
