import { Request, Response } from 'express';
import Contact from '../models/Contact';
import nodemailer from 'nodemailer';

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error });
  }
};

export const createContact = async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  try {
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

export const sendContactMail = async () => {
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
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted sucessfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  if (!data) {
    res.status(400).json({ message: 'No data provided for update' });
    return;
  }
  try {
    const contact = await Contact.findById(id);
    if (contact) {
      if (data.status) contact.status = data.status;
      if (data.notes) contact.notes = data.notes;
      await contact.save();

      res.status(200).json({ message: 'Updated sucessfully', contact });
    } else {
      res.status(404).json({ messasge: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error });
  }
};
