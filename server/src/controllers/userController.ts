import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'votre_jwt_secret',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({message: 'User deleted sucessfully'});
  } catch (error) {
    res.status(500).json({message: 'Error deleting user', error});
  }
};

export const promoteUser = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, {role: 'admin'}, {new: true});
    res.status(200).json({message: 'User promoted sucessfully', user});
  } catch (error) {
    res.status(500).json({message: 'Error promoting user', error});
  }
}
