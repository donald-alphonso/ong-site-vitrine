import { Request, Response } from 'express';
import Contact from '../models/Contact';
import User from '../models/User';
import { logger } from '../utils/logger';

export const getContactStats = async (req: Request, res: Response) => {
  try {
    logger.info('Fetching contact statistics');

    const totalContacts = await Contact.countDocuments();
    const pendingCount = await Contact.countDocuments({ status: 'pending' });
    const contactedCount = await Contact.countDocuments({
      status: 'contacted',
    });
    const resolvedCount = await Contact.countDocuments({ status: 'resolved' });

    const stats = {
      totalContacts,
      pendingCount,
      contactedCount,
      resolvedCount,
    };

    logger.info('Contact statistics retrieved successfully', stats);
    res.status(200).json(stats);
  } catch (error) {
    logger.error('Error retrieving contact statistics', error);
    res.status(500).json({ message: 'Error retrieving stats', error });
  }
};

export const getUsersStats = async (req: Request, res: Response) => {
  try {
    logger.info('Fetching user statistics');

    const totalUsers = await User.countDocuments();

    logger.info('User statistics retrieved successfully', { totalUsers });
    res.status(200).json(totalUsers);
  } catch (error) {
    logger.error('Error retrieving user statistics', error);
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};
