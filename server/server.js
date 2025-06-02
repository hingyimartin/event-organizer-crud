import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());
server.use(cookieParser());

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
