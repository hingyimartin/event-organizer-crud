import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        message: 'Email already in use',
      });
    }

    // check username
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({
        message: 'Username already in use',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });
    if (!user) {
      res.status(500).json({ message: 'Error creating user' });
    }
    res.status(201).json({
      message: 'User created successfuly',
    });
  } catch (error) {
    res.status(500).json({
      message: `${
        process.env.NODE_ENV === 'development'
          ? error
          : 'An unexpected error happened'
      }`,
    });
  }
};

export const login = (req, res) => {
  res.status(200).json({ message: 'ok' });
};

export const logout = (req, res) => {
  res.status(200).json({ message: 'ok' });
};

export const getMe = (req, res) => {
  res.status(200).json({ message: 'ok' });
};
