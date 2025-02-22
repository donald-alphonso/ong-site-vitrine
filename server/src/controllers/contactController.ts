import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { logger } from '../utils/logger';
import  nodemailer  from 'nodemailer';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const getAllContacts = async (req: AuthRequest, res: Response) => {
  try {
    logger.info('User accessed contact list', {
      action: 'VIEW_ALL_CONTACTS',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      }
    });

    const contacts = await Contact.find().sort({ createdAt: -1 });
    logger.info(`Successfully retrieved ${contacts.length} contacts`);
    res.status(200).json(contacts);
  } catch (error) {
    logger.error('Failed to retrieve contacts', error, {
      action: 'VIEW_ALL_CONTACTS_ERROR',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      }
    });
    res.status(500).json({ message: 'Error retrieving contacts', error });
  }
};

export const createContact = async (req: AuthRequest, res: Response) => {
  const { name, email, phone, message } = req.body;
  try {
    logger.info('User creating new contact', {
      action: 'CREATE_CONTACT',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      },
      contactData: {
        name,
        email,
        phone,
        message
      }
    });

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    logger.info('Contact created successfully', {
      action: 'CONTACT_CREATED',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      },
      contact: {
        id: newContact._id,
        email: newContact.email
      }
    });

    res.status(201).json(newContact);
  } catch (error) {
    logger.error('Failed to create contact', error, {
      action: 'CREATE_CONTACT_ERROR',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      },
      contactData: req.body
    });
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

export const sendContactMail = async (req: AuthRequest, res: Response) => {
  logger.info('Attempting to send contact notification email');
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xxxxx',
      pass: 'xxxxx',
    },
  });

  try {
    await transporter.sendMail({
      from: 'xxxxx',
      to: 'xxxxx',
      subject: 'New Contact Form Submission',
      text: 'A new contact form submission has been received.',
    });
    logger.info('Contact notification email sent successfully');
    return true;
  } catch (error) {
    logger.error('Failed to send contact notification email', error);
    return false;
  }
};

export const updateContact = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  
  if (!data) {
    logger.warn('Update attempt with no data provided', { contactId: id });
    res.status(400).json({ message: 'No data provided for update' });
    return;
  }
  
  try {
    logger.info('User attempting to update contact', {
      action: 'UPDATE_CONTACT',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      },
      updateData: {
        contactId: id,
        changes: data
      }
    });
    
    const contact = await Contact.findById(id);
    if (contact) {
      if (data.status) contact.status = data.status;
      if (data.notes) contact.notes = data.notes;
      await contact.save();

      logger.info('Contact updated successfully', {
        action: 'CONTACT_UPDATED',
        actor: {
          userId: req.user?.userId,
          email: req.user?.email,
          role: req.user?.role
        },
        contact: {
          id: contact._id,
          email: contact.email,
          status: contact.status
        }
      });
      
      res.status(200).json({ message: 'Updated successfully', contact });
    } else {
      logger.warn('Attempt to update non-existent contact', { contactId: id });
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    logger.error('Failed to update contact', error, {
      action: 'UPDATE_CONTACT_ERROR',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      },
      contactId: id
    });
    res.status(500).json({ message: 'Error updating contact', error });
  }
};

export const deleteContact = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    logger.info('User attempting to delete contact', {
      action: 'DELETE_CONTACT',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      },
      contactId: id
    });
    
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      logger.warn('Attempt to delete non-existent contact', { contactId: id });
      res.status(404).json({ message: 'Contact not found' });
    }

    logger.info('Contact deleted successfully', {
      action: 'CONTACT_DELETED',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      },
      deletedContact: {
        id: contact?._id,
        email: contact?.email
      }
    });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    logger.error('Failed to delete contact', error, {
      action: 'DELETE_CONTACT_ERROR',
      actor: {
        userId: req.user?.userId,
        email: req.user?.email,
        role: req.user?.role
      },
      contactId: id
    });
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};
