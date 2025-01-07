import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from './routes/auth';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Autorise votre frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Autorise les en-têtes sensibles
  allowedHeaders: ['Authorization', 'Content-Type'],
}));
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI || '', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use('/api/auth', auth);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
