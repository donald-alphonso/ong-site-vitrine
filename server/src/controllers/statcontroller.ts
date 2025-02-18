import { Request, Response } from 'express';
import Contact from '../models/Contact';
import User from '../models/User';

export const getContactStats = async (req: Request, res: Response) => {
    try {
        const totalContacts = await Contact.countDocuments();
        const pendingCount = await Contact.countDocuments({ status: 'pending' });
        const contactedCount = await Contact.countDocuments({ status: 'contacted' });
        const resolvedCount = await Contact.countDocuments({ status: 'resolved' });

        res.status(200).json({
            totalContacts,
            pendingCount,
            contactedCount,
            resolvedCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving stats', error });
    }
}

export const getUsersStats = async (req: Request, res: Response) => {
    try {
        const totalUsers = await User.countDocuments();
        res.status(200).json(totalUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
}