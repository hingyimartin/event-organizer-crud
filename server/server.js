import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

const server = express();

server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
server.use(express.json());
server.use(cookieParser());

// Routes
server.use('/api/auth', authRoutes);

// Server
server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port: ${process.env.SERVER_PORT}`);
});

// Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
