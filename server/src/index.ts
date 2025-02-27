import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import missionRoutes from './routes/missionRoutes';
import programRoutes from './routes/programRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import newsRoutes from './routes/newsRoutes';
import contactRoutes from './routes/contactRoutes';
import statRoutes from './routes/statRoutes';
import auth from './routes/auth';
import adminRoutes from './routes/adminRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGO_URI || '', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/missions', missionRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/news', newsRoutes);
app.use('/api', contactRoutes);
app.use('/api', statRoutes);
app.use('/api/auth', auth);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
