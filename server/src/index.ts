import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import auth from './routes/auth';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI || '', {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
