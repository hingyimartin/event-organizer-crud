import bcrypt from 'bcrypt';
import User from '../models/User.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/tokenHelper.js';

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

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if username or email sent
    if (!username && !email) {
      return res.status(400).json({
        message: 'Username or email required',
      });
    }

    const query = [];
    if (username) query.push({ username });
    if (email) query.push({ email });

    if (query.length === 0) {
      return res.status(400).json({
        message: 'Username or email required',
      });
    }

    const user = await User.findOne({ $or: query }).select('+password');

    // check user
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Username/email or password is not correct' });
    }

    // check if password match
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: 'Username/email or password is not correct',
      });
    }

    // generate access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      accessToken,
      user: userWithoutPassword,
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

export const logout = async (req, res) => {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out' });
};

export const refreshAccessToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: 'Refresh token is missing' });
  }

  try {
    const decoded = verifyRefreshToken(token);
    const accessToken = generateAccessToken({
      _id: decoded.userId,
      role: decoded.role,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({
      message: 'Invalid refresh token',
    });
  }
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  res.status(200).json(user);
};
