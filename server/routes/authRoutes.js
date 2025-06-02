import express from 'express';

import {
  register,
  login,
  logout,
  getMe,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);
router.post('/logout', logout);

export default router;
