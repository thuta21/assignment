import Organizer from '../models/Organizer.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // You can use JWT for token-based authentication

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create a new organizer
    const organizer = await Organizer.create({ name, email, password });

    res.status(201).json({ message: 'Organizer registered successfully', organizer: { id: organizer.id, name: organizer.name, email: organizer.email } });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the organizer by email
    const organizer = await Organizer.findOne({ where: { email } });

    if (!organizer) {
      return res.status(404).json({ message: 'Organizer not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, organizer.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: organizer.id, email: organizer.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '12h' }
    );

    // Return both token and organizer details (excluding sensitive fields like password)
    const organizerData = {
      id: organizer.id,
      email: organizer.email,
      name: organizer.name,
      // Add other necessary fields here, but exclude sensitive ones
    };

    res.status(200).json({
      message: 'Login successful',
      token,
      organizer: organizerData, // Include the organizer details in the response
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

export default { register, login };
