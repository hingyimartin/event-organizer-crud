import express from 'express';

import {
  register,
  login,
  logout,
  getMe,
  refreshAccessToken,
} from '../controllers/authController.js';

import { authenticateAccessToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateAccessToken, getMe);
router.post('/logout', logout);
router.post('/refresh', refreshAccessToken);

export default router;
