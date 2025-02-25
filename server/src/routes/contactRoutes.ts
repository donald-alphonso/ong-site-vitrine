import express from 'express';
import { createContact } from '../controllers/contactController';

const router = express.Router();

router.post('/contact', createContact);

export default router;
