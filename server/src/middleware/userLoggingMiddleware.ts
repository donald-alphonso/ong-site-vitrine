import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const logUserActions = (actionType: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const oldJson = res.json;
    const oldStatus = res.status;
    let statusCode: number;

    // Capture le status code
    res.status = function(code: number) {
      statusCode = code;
      return oldStatus.apply(res, [code]);
    };

    // Intercepte la réponse pour logger le résultat
    res.json = function(data: any) {
      const isSuccess = statusCode >= 200 && statusCode < 300;
      const logData = {
        action: actionType,
        actor: {
          userId: req.user?.userId,
          email: req.user?.email,
          role: req.user?.role
        },
        targetData: {
          ...req.params,
          ...req.body
        },
        statusCode,
        timestamp: new Date().toISOString()
      };

      switch (actionType) {
        case 'VIEW_ALL_USERS':
          if (isSuccess) {
            logger.info('Users list retrieved successfully', {
              ...logData,
              userCount: Array.isArray(data) ? data.length : 0
            });
          } else {
            logger.error('Failed to retrieve users list', null, logData);
          }
          break;

        case 'CREATE_USER':
          if (isSuccess) {
            logger.info('New user created successfully', {
              ...logData,
              newUser: {
                id: data._id,
                email: data.email,
                role: data.role
              }
            });
          } else {
            logger.error('Failed to create user', null, {
              ...logData,
              attemptedEmail: req.body.email
            });
          }
          break;

        case 'LOGIN':
          if (isSuccess) {
            logger.info('User logged in successfully', {
              ...logData,
              user: {
                id: data.user?.id,
                email: data.user?.email,
                role: data.user?.role
              }
            });
          } else {
            logger.warn('Login failed', {
              ...logData,
              attemptedEmail: req.body.email
            });
          }
          break;

        case 'LOGOUT':
          if (isSuccess) {
            logger.info('User logged out successfully', {
              ...logData,
              userId: req.params.id
            });
          } else {
            logger.error('Logout failed', null, {
              ...logData,
              userId: req.params.id
            });
          }
          break;

        case 'DELETE_USER':
          if (isSuccess) {
            logger.info('User deleted successfully', {
              ...logData,
              deletedUserId: req.params.id
            });
          } else {
            logger.error('Failed to delete user', null, {
              ...logData,
              targetUserId: req.params.id
            });
          }
          break;

        case 'PROMOTE_USER':
          if (isSuccess) {
            logger.info('User promoted successfully', {
              ...logData,
              promotedUser: {
                id: data.user?._id,
                email: data.user?.email,
                newRole: 'admin'
              }
            });
          } else {
            logger.error('Failed to promote user', null, {
              ...logData,
              targetUserId: req.params.id
            });
          }
          break;

        case 'DEMOTE_USER':
          if (isSuccess) {
            logger.info('User demoted successfully', {
              ...logData,
              demotedUser: {
                id: data.user?._id,
                email: data.user?.email,
                newRole: 'user'
              }
            });
          } else {
            logger.error('Failed to demote user', null, {
              ...logData,
              targetUserId: req.params.id
            });
          }
          break;
      }

      return oldJson.apply(res, [data]);
    };

    next();
  };
};
